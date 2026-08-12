/**
 * Big Game Theory — Punnett Square Calculation Engine v2.0
 * Handles: Mendelian, Incomplete Dominant, Sex-Linked (ZW/ZZ),
 * multi-locus cross (up to 4 loci), phenotype labeling.
 */

import { CHICKEN_GENETICS_DATABASE } from './geneticsData.js';

// ─── Helper: Cartesian product of arrays ───────────────────────────────
function cartesianProduct(arrays) {
  return arrays.reduce(
    (acc, arr) => acc.flatMap(prev => arr.map(item => [...prev, item])),
    [[]]
  );
}

// ─── Get locus object by ID ────────────────────────────────────────────
export function getLocusById(id) {
  return CHICKEN_GENETICS_DATABASE.find(l => l.locusId === id);
}

// ─── Gametes for one locus ─────────────────────────────────────────────
// Returns array of allele strings this parent can pass to offspring.
// For sex-linked loci, females (ZW) pass 1 allele or 'W'.
export function getGametes(allele1, allele2, isSexLinked, isFemale) {
  if (isSexLinked && isFemale) {
    // Dam passes either her Z allele OR the W chromosome
    return [allele1, 'W'];
  }
  return [allele1, allele2];
}

// ─── Determine phenotype from a genotype combo ─────────────────────────
export function getPhenotype(locusData, allele1, allele2, sex) {
  const { locusId, alleles, inheritanceMode, phenotypeMap, isSexLinked } = locusData;

  // Handle W chromosome (female sex-linked)
  const a1 = allele1 === 'W' ? null : allele1;
  const a2 = allele2 === 'W' ? null : allele2;

  // For sex-linked, hemizygous females
  if (isSexLinked && sex === 'F' && (allele2 === 'W' || allele1 === 'W')) {
    const hemi = a1 || a2;
    const hemAllele = alleles.find(a => a.symbol === hemi);
    return hemAllele ? `${hemAllele.name} (hemizygous)` : hemi;
  }

  // phenotypeMap override (for Blue locus etc.)
  if (phenotypeMap) {
    const key = `${a1}/${a2}`;
    const keyRev = `${a2}/${a1}`;
    if (phenotypeMap[key]) return phenotypeMap[key].name;
    if (phenotypeMap[keyRev]) return phenotypeMap[keyRev].name;
  }

  // Allele objects
  const getAllele = sym => alleles.find(a => a.symbol === sym);
  const al1 = getAllele(a1);
  const al2 = getAllele(a2);
  if (!al1 || !al2) return `${a1}/${a2}`;

  const dom1 = al1.dominanceRank;
  const dom2 = al2.dominanceRank;

  if (a1 === a2) {
    return `Homozygous ${al1.name}`;
  }

  if (inheritanceMode.includes('Incomplete')) {
    if (dom1 < dom2) {
      return `Heterozygous — ${al1.name} / ${al2.name} (Intermediate)`;
    }
    return `Heterozygous — ${al2.name} / ${al1.name} (Intermediate)`;
  }

  // Fully dominant
  const dominant = dom1 <= dom2 ? al1 : al2;
  const recessive = dom1 <= dom2 ? al2 : al1;
  return `${dominant.name} (carries ${recessive.name})`;
}

// ─── Main: Cross two parents at multiple loci ──────────────────────────
export function calculateCross(selectedLoci, sireGenotype, damGenotype) {
  if (!selectedLoci.length) return { outcomes: [], totalCombinations: 0 };

  // For each locus, compute gamete arrays
  const sireGametes = selectedLoci.map(locusId => {
    const locus = getLocusById(locusId);
    const [s1, s2] = sireGenotype[locusId] || ['?', '?'];
    return getGametes(s1, s2, locus.isSexLinked, false);
  });

  const damGametes = selectedLoci.map(locusId => {
    const locus = getLocusById(locusId);
    const [d1, d2] = damGenotype[locusId] || ['?', '?'];
    return getGametes(d1, d2, locus.isSexLinked, true);
  });

  // Build all sire gamete combos × dam gamete combos
  const sireAllCombos = cartesianProduct(sireGametes);
  const damAllCombos  = cartesianProduct(damGametes);

  const rawCombinations = [];

  for (const sc of sireAllCombos) {
    for (const dc of damAllCombos) {
      const offspring = {};

      // Determine sex
      let sex = 'M'; // ZZ
      for (let i = 0; i < selectedLoci.length; i++) {
        if (dc[i] === 'W') { sex = 'F'; break; }
      }

      for (let i = 0; i < selectedLoci.length; i++) {
        const locusId = selectedLoci[i];
        const locus = getLocusById(locusId);
        let a1 = sc[i];
        let a2 = dc[i];

        // Sort alleles by dominance rank (lower rank = more dominant)
        if (a1 !== 'W' && a2 !== 'W') {
          const alleleObjs = locus.alleles;
          const rank = sym => {
            const o = alleleObjs.find(a => a.symbol === sym);
            return o ? o.dominanceRank : 99;
          };
          if (rank(a2) < rank(a1)) { [a1, a2] = [a2, a1]; }
        }

        const geno = a2 === 'W' ? `${a1}/W` : `${a1}/${a2}`;
        const pheno = getPhenotype(locus, a1, a2, sex);
        offspring[locusId] = { geno, pheno };
      }

      offspring._sex = sex;
      rawCombinations.push(offspring);
    }
  }

  // Aggregate outcomes by genotype signature
  const outcomeMap = {};
  for (const combo of rawCombinations) {
    const sig = Object.entries(combo)
      .filter(([k]) => k !== '_sex')
      .map(([k, v]) => `${k}:${v.geno}`)
      .join('|') + `|sex:${combo._sex}`;

    if (!outcomeMap[sig]) {
      outcomeMap[sig] = { ...combo, count: 0 };
    }
    outcomeMap[sig].count++;
  }

  const total = rawCombinations.length;
  const outcomes = Object.values(outcomeMap).map(o => ({
    ...o,
    pct: ((o.count / total) * 100).toFixed(1)
  }));

  outcomes.sort((a, b) => b.count - a.count);

  return { outcomes, totalCombinations: total };
}

// ─── Build Punnett Table Data ──────────────────────────────────────────
// For multi-locus crosses, build the table from sire combos vs dam combos
export function buildPunnettTable(selectedLoci, sireGenotype, damGenotype) {
  const sireGametes = selectedLoci.map(locusId => {
    const locus = getLocusById(locusId);
    const [s1, s2] = sireGenotype[locusId] || ['?', '?'];
    return getGametes(s1, s2, locus.isSexLinked, false);
  });

  const damGametes = selectedLoci.map(locusId => {
    const locus = getLocusById(locusId);
    const [d1, d2] = damGenotype[locusId] || ['?', '?'];
    return getGametes(d1, d2, locus.isSexLinked, true);
  });

  const sireHeaders = cartesianProduct(sireGametes).map(c => c.join(' · '));
  const damHeaders  = cartesianProduct(damGametes).map(c => c.join(' · '));

  const sireAllCombos = cartesianProduct(sireGametes);
  const damAllCombos  = cartesianProduct(damGametes);

  const rows = damAllCombos.map((dc, di) => {
    const cells = sireAllCombos.map((sc) => {
      let sex = 'M';
      for (const a of dc) if (a === 'W') { sex = 'F'; break; }

      const pairs = selectedLoci.map((locusId, i) => {
        const locus = getLocusById(locusId);
        let a1 = sc[i], a2 = dc[i];
        if (a1 !== 'W' && a2 !== 'W') {
          const rank = sym => {
            const o = locus.alleles.find(a => a.symbol === sym);
            return o ? o.dominanceRank : 99;
          };
          if (rank(a2) < rank(a1)) [a1, a2] = [a2, a1];
        }
        const geno = a2 === 'W' ? `${a1}/W` : `${a1}/${a2}`;
        const pheno = getPhenotype(locus, a1, a2, sex);
        return { geno, pheno, locusId };
      });

      return { pairs, sex };
    });

    return { header: damHeaders[di], cells };
  });

  return { sireHeaders, rows };
}

// ─── Egg Shell Color Label ─────────────────────────────────────────────
export function predictEggColor(genotype) {
  const oAlleles = genotype['O'] || [];
  const dbAlleles = genotype['db'] || [];

  const hasO = oAlleles.includes('O');
  const hasDb = dbAlleles.includes('Db');

  if (!hasO && !hasDb) return { color: '#F8F0E3', label: 'White / Cream' };
  if (!hasO && hasDb) return { color: '#B5651D', label: 'Dark Brown' };
  if (hasO && !hasDb)  return { color: '#ADD8E6', label: 'Blue' };
  if (hasO && hasDb)   return { color: '#6B7A3A', label: 'Olive Green' };
  return { color: '#F8F0E3', label: 'White / Cream' };
}
