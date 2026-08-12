/**
 * Big Game Theory — Punnett Square Calculation Engine v2.1
 * Correct Mendelian, Incomplete Dominant, and ZW/ZZ Sex-Linked poultry genetics.
 */

import { CHICKEN_GENETICS_DATABASE } from './geneticsData.js';

// ─── Helper: Cartesian product ─────────────────────────────────────────
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

// ─── Fill missing locus alleles with wild-type defaults ───────────────
export function normalizeGenotype(locusId, genotypeArray) {
  const locus = getLocusById(locusId);
  if (!genotypeArray || !Array.isArray(genotypeArray) || genotypeArray.length < 2) {
    if (!locus) return ['?', '?'];
    return [...locus.defaultSire];
  }
  return genotypeArray;
}

// ─── Get gametes for a parent ──────────────────────────────────────────
export function getGametes(locusId, genotypeArray, isFemale) {
  const locus = getLocusById(locusId);
  const [a1, a2] = normalizeGenotype(locusId, genotypeArray);

  if (locus && locus.isSexLinked && isFemale) {
    // Dam has 1 Z-allele and 1 W-chromosome
    return [a1, 'W'];
  }
  return [a1, a2];
}

// ─── Determine phenotype text for single locus ─────────────────────────
export function getLocusPhenotype(locusData, allele1, allele2, sex) {
  const { locusId, alleles, inheritanceMode, phenotypeMap, isSexLinked } = locusData;

  const a1 = allele1 === 'W' ? null : allele1;
  const a2 = allele2 === 'W' ? null : allele2;

  // Female hemizygous (Z/W)
  if (isSexLinked && sex === 'F' && (allele1 === 'W' || allele2 === 'W')) {
    const activeSymbol = a1 || a2;
    const alObj = alleles.find(a => a.symbol === activeSymbol);
    return alObj ? `${alObj.name} (1x Z)` : activeSymbol;
  }

  // Override phenotype maps (e.g. Blue locus: Bl/Bl=Splash, Bl/bl+=Blue, bl+/bl+=Black)
  if (phenotypeMap) {
    const key1 = `${a1}/${a2}`;
    const key2 = `${a2}/${a1}`;
    if (phenotypeMap[key1]) return phenotypeMap[key1].name;
    if (phenotypeMap[key2]) return phenotypeMap[key2].name;
  }

  const getAlleleObj = sym => alleles.find(a => a.symbol === sym);
  const al1 = getAlleleObj(a1);
  const al2 = getAlleleObj(a2);

  if (!al1 || !al2) return `${a1}/${a2}`;

  if (a1 === a2) {
    return al1.name;
  }

  if (inheritanceMode.includes('Incomplete')) {
    const dominant = al1.dominanceRank <= al2.dominanceRank ? al1 : al2;
    const recessive = al1.dominanceRank <= al2.dominanceRank ? al2 : al1;
    return `Heterozygous ${dominant.name} / ${recessive.name}`;
  }

  const dominant = al1.dominanceRank <= al2.dominanceRank ? al1 : al2;
  return dominant.name;
}

// ─── Main Punnett Cross Calculator ─────────────────────────────────────
export function calculateCross(selectedLoci, sireGenotype, damGenotype) {
  if (!selectedLoci || !selectedLoci.length) {
    return { outcomes: [], totalCombinations: 0 };
  }

  // Ensure loci count is within performance bounds (max 4)
  const activeLoci = selectedLoci.slice(0, 4);

  // Generate gametes per locus
  const sireGameteSets = activeLoci.map(locusId =>
    getGametes(locusId, sireGenotype[locusId], false)
  );

  const damGameteSets = activeLoci.map(locusId =>
    getGametes(locusId, damGenotype[locusId], true)
  );

  const sireCombos = cartesianProduct(sireGameteSets);
  const damCombos  = cartesianProduct(damGameteSets);

  const rawCombinations = [];

  const hasSexLinkedLocus = activeLoci.some(id => getLocusById(id)?.isSexLinked);

  for (const sc of sireCombos) {
    for (const dc of damCombos) {
      
      // Determine sex from W chromosome presence
      let isFemaleFromW = false;
      for (let i = 0; i < activeLoci.length; i++) {
        if (dc[i] === 'W') {
          isFemaleFromW = true;
          break;
        }
      }

      // If sex-linked locus present, sex is defined by W
      // If only autosomal loci present, generate BOTH male and female options for 50/50 split
      const sexesToEvaluate = hasSexLinkedLocus
        ? [isFemaleFromW ? 'F' : 'M']
        : ['F', 'M'];

      for (const sex of sexesToEvaluate) {
        const offspring = { _sex: sex, loci: {} };

        for (let i = 0; i < activeLoci.length; i++) {
          const locusId = activeLoci[i];
          const locus = getLocusById(locusId);
          let a1 = sc[i];
          let a2 = dc[i];

          // If autosomal or male sex-linked, order alleles by dominance
          if (a1 !== 'W' && a2 !== 'W') {
            const rank = sym => {
              const obj = locus.alleles.find(a => a.symbol === sym);
              return obj ? obj.dominanceRank : 99;
            };
            if (rank(a2) < rank(a1)) [a1, a2] = [a2, a1];
          }

          const geno = (a2 === 'W' || (locus.isSexLinked && sex === 'F')) ? `${a1}/W` : `${a1}/${a2}`;
          const pheno = getLocusPhenotype(locus, a1, a2, sex);

          offspring.loci[locusId] = { geno, pheno };
        }

        rawCombinations.push(offspring);
      }
    }
  }

  // Aggregate by phenotype signature
  const outcomeMap = {};

  for (const combo of rawCombinations) {
    const lociSig = Object.entries(combo.loci)
      .map(([id, d]) => `${id}:${d.geno}`)
      .join('|');
    const fullSig = `${lociSig}|sex:${combo._sex}`;

    if (!outcomeMap[fullSig]) {
      outcomeMap[fullSig] = {
        sex: combo._sex,
        loci: combo.loci,
        count: 0
      };
    }
    outcomeMap[fullSig].count++;
  }

  const total = rawCombinations.length;
  const outcomes = Object.values(outcomeMap).map(item => ({
    ...item,
    pct: ((item.count / total) * 100).toFixed(1)
  }));

  outcomes.sort((a, b) => b.count - a.count);

  return { outcomes, totalCombinations: total, activeLoci };
}

// ─── Build Punnett Grid ────────────────────────────────────────────────
export function buildPunnettTable(selectedLoci, sireGenotype, damGenotype) {
  const activeLoci = selectedLoci.slice(0, 4);

  const sireGameteSets = activeLoci.map(id => getGametes(id, sireGenotype[id], false));
  const damGameteSets  = activeLoci.map(id => getGametes(id, damGenotype[id], true));

  const sireCombos = cartesianProduct(sireGameteSets);
  const damCombos  = cartesianProduct(damGameteSets);

  const sireHeaders = sireCombos.map(c => c.join(' · '));
  const damHeaders  = damCombos.map(c => c.join(' · '));

  const rows = damCombos.map((dc, di) => {
    const cells = sireCombos.map(sc => {
      let isFemale = false;
      for (const allele of dc) {
        if (allele === 'W') { isFemale = true; break; }
      }
      const sex = isFemale ? 'F' : 'M';

      const pairs = activeLoci.map((locusId, i) => {
        const locus = getLocusById(locusId);
        let a1 = sc[i], a2 = dc[i];
        if (a1 !== 'W' && a2 !== 'W') {
          const rank = sym => {
            const obj = locus.alleles.find(a => a.symbol === sym);
            return obj ? obj.dominanceRank : 99;
          };
          if (rank(a2) < rank(a1)) [a1, a2] = [a2, a1];
        }
        const geno = a2 === 'W' ? `${a1}/W` : `${a1}/${a2}`;
        const pheno = getLocusPhenotype(locus, a1, a2, sex);
        return { locusId, geno, pheno };
      });

      return { pairs, sex };
    });

    return { header: damHeaders[di], cells };
  });

  return { sireHeaders, rows };
}

// ─── Predict Egg Color ─────────────────────────────────────────────────
export function predictEggColor(genotypesMap) {
  const oData = genotypesMap['O'];
  const dbData = genotypesMap['db'];

  const hasBlueGene = oData && (oData.geno.includes('O'));
  const hasDarkBrownGene = dbData && (dbData.geno.includes('Db'));

  if (hasBlueGene && hasDarkBrownGene) {
    return { color: '#6B7A3A', label: 'Olive Green' };
  }
  if (hasBlueGene) {
    return { color: '#ADD8E6', label: 'Sky Blue' };
  }
  if (hasDarkBrownGene) {
    return { color: '#B5651D', label: 'Dark Chocolate Brown' };
  }
  return { color: '#F8F0E3', label: 'White / Cream' };
}
