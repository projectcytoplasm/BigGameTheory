/**
 * Big Game Theory — Punnett Square Calculation Engine v2.2
 * Correct Mendelian, Incomplete Dominant, and ZW/ZZ Sex-Linked poultry genetics.
 * Common user-friendly phenotype naming.
 */

import { CHICKEN_GENETICS_DATABASE } from './geneticsData.js';

function cartesianProduct(arrays) {
  return arrays.reduce(
    (acc, arr) => acc.flatMap(prev => arr.map(item => [...prev, item])),
    [[]]
  );
}

export function getLocusById(id) {
  return CHICKEN_GENETICS_DATABASE.find(l => l.locusId === id);
}

export function normalizeGenotype(locusId, genotypeArray) {
  const locus = getLocusById(locusId);
  if (!genotypeArray || !Array.isArray(genotypeArray) || genotypeArray.length < 2) {
    if (!locus) return ['?', '?'];
    return [...locus.defaultSire];
  }
  return genotypeArray;
}

export function getGametes(locusId, genotypeArray, isFemale) {
  const locus = getLocusById(locusId);
  const [a1, a2] = normalizeGenotype(locusId, genotypeArray);

  if (locus && locus.isSexLinked && isFemale) {
    return [a1, 'W'];
  }
  return [a1, a2];
}

// ─── User-Friendly Common Phenotype Names ──────────────────────────────
export function getLocusPhenotype(locusData, allele1, allele2, sex) {
  const { locusId, locusName, alleles, inheritanceMode, phenotypeMap, isSexLinked } = locusData;

  const a1 = allele1 === 'W' ? null : allele1;
  const a2 = allele2 === 'W' ? null : allele2;

  // Custom friendly mapping per locus
  if (locusId === 'Fm') {
    if (a1 === 'Fm' && a2 === 'Fm') return 'Pure Fibromelanic (Deep Black Skin & Organs)';
    if (a1 === 'Fm' || a2 === 'Fm') return 'Black Skin & Wattles (Fibromelanosis Carrier)';
    return 'Normal Pink Skin & Organs';
  }

  if (locusId === 'Bl') {
    if (a1 === 'Bl' && a2 === 'Bl') return 'Splash Plumage (White with Blue Specks)';
    if (a1 === 'Bl' || a2 === 'Bl') return 'Slate Blue Plumage';
    return 'Solid Black Plumage';
  }

  if (locusId === 'B') {
    if (sex === 'F') {
      return (a1 === 'B' || a2 === 'B') ? 'Single-Barred Feathers (Dark Cuckoo)' : 'Non-Barred Solid';
    }
    if (a1 === 'B' && a2 === 'B') return 'Double-Barred Feathers (Light Zebra Barring)';
    if (a1 === 'B' || a2 === 'B') return 'Single-Barred Feathers (Dark Barring)';
    return 'Non-Barred Solid';
  }

  if (locusId === 'O') {
    if (a1 === 'O' || a2 === 'O') return 'Blue / Green Egg Shell (Oocyan)';
    return 'White / Brown Shell';
  }

  if (locusId === 'Pti') {
    if (a1 === 'Pti' && a2 === 'Pti') return 'Heavily Feathered Legs & Toes';
    if (a1 === 'Pti' || a2 === 'Pti') return 'Feathered Legs & Shanks';
    return 'Clean Clean Shanks';
  }

  if (locusId === 'P') {
    if (a1 === 'P' || a2 === 'P') return 'Pea Comb (Frostbite Resistant)';
    return 'Single Serrated Comb';
  }

  if (locusId === 'R') {
    if (a1 === 'R' || a2 === 'R') return 'Rose Comb (Flat Papillae)';
    return 'Single Blade Comb';
  }

  if (locusId === 'Cr') {
    if (a1 === 'Cr' || a2 === 'Cr') return 'Crested Feather Topknot';
    return 'Smooth Head (No Crest)';
  }

  if (locusId === 'Mb') {
    if (a1 === 'Mb' || a2 === 'Mb') return 'Muffs & Chin Beard';
    return 'Clean Face';
  }

  if (locusId === 'F') {
    if (a1 === 'F' && a2 === 'F') return '⚠️ Extreme Frizzle (Brittle Feathers)';
    if (a1 === 'F' || a2 === 'F') return 'Frizzled Curled Feathers';
    return 'Normal Smooth Feathers';
  }

  if (locusId === 'h') {
    if (a1 === 'h' && a2 === 'h') return 'Silkie Fluffy Hair Feathers';
    return 'Normal Smooth Feathers';
  }

  if (locusId === 'Na') {
    if (a1 === 'Na' && a2 === 'Na') return 'Fully Bare Neck (Naked Neck)';
    if (a1 === 'Na' || a2 === 'Na') return 'Naked Neck (Partial Bowtie)';
    return 'Fully Feathered Neck';
  }

  if (locusId === 'S') {
    if (sex === 'F') {
      return (a1 === 'S' || a2 === 'S') ? 'Silver Plumage Background' : 'Gold / Red Background';
    }
    if (a1 === 'S' || a2 === 'S') return 'Silver Plumage Background';
    return 'Gold / Red Background';
  }

  // Fallback map override
  if (phenotypeMap) {
    const k1 = `${a1}/${a2}`, k2 = `${a2}/${a1}`;
    if (phenotypeMap[k1]) return phenotypeMap[k1].name;
    if (phenotypeMap[k2]) return phenotypeMap[k2].name;
  }

  // General fallback
  const getAlleleObj = sym => alleles.find(a => a.symbol === sym);
  const al1 = getAlleleObj(a1), al2 = getAlleleObj(a2);

  if (!al1 || !al2) return locusName;
  if (a1 === a2) return al1.name;

  const dominant = al1.dominanceRank <= al2.dominanceRank ? al1 : al2;
  return dominant.name;
}

// ─── Main Cross Calculator ─────────────────────────────────────────────
export function calculateCross(selectedLoci, sireGenotype, damGenotype) {
  if (!selectedLoci || !selectedLoci.length) {
    return { outcomes: [], totalCombinations: 0 };
  }

  const activeLoci = selectedLoci.slice(0, 4);

  const sireGameteSets = activeLoci.map(id => getGametes(id, sireGenotype[id], false));
  const damGameteSets  = activeLoci.map(id => getGametes(id, damGenotype[id], true));

  const sireCombos = cartesianProduct(sireGameteSets);
  const damCombos  = cartesianProduct(damGameteSets);

  const rawCombinations = [];
  const hasSexLinkedLocus = activeLoci.some(id => getLocusById(id)?.isSexLinked);

  for (const sc of sireCombos) {
    for (const dc of damCombos) {
      let isFemaleFromW = false;
      for (let i = 0; i < activeLoci.length; i++) {
        if (dc[i] === 'W') { isFemaleFromW = true; break; }
      }

      const sexesToEvaluate = hasSexLinkedLocus
        ? [isFemaleFromW ? 'F' : 'M']
        : ['F', 'M'];

      for (const sex of sexesToEvaluate) {
        const offspring = { _sex: sex, loci: {} };

        for (let i = 0; i < activeLoci.length; i++) {
          const locusId = activeLoci[i];
          const locus = getLocusById(locusId);
          let a1 = sc[i], a2 = dc[i];

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

// ─── Build Punnett Grid Data ───────────────────────────────────────────
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
