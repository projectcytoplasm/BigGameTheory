/**
 * Big Game Theory — Master Chicken Genetics Mutations Database v2.1
 * Specialized Heritage & Gamefowl Breeds:
 * - Blue Rosecomb Bantams
 * - Pure Surinam Black & Blues
 * - Porcelain D'Uccle Bantams
 * - Aseels (Coming Soon!)
 */

export const CHICKEN_GENETICS_DATABASE = [

  // ════════════════════════════════════════════════
  // SECTION 1: BASE PLUMAGE PIGMENTATION
  // ════════════════════════════════════════════════

  {
    locusId: 'E',
    locusName: 'Extension Locus (Base Plumage Color)',
    geneSymbol: 'E / e+',
    chromosome: 'Autosomal (Chr 1)',
    category: 'Base Pigmentation',
    inheritanceMode: 'Codominant / Allelic Series',
    description: 'Master controller of eumelanin (black/brown) vs phaeomelanin (red/gold) distribution. The dominant allele series determines the foundational color of the bird before any pattern or dilution genes act.',
    breedExamples: ['Pure Surinam Black (E/E)', 'Rosecomb Bantam (E/E)', 'Ameraucana (e+/e+)', 'Marans (ER/ER)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'E', name: 'Extended Black', dominanceRank: 1, description: 'Solid black plumage across entire body. Epistatic to most pattern genes.' },
      { symbol: 'E^R', name: 'Birchen / Crowing', dominanceRank: 2, description: 'Black body with gold or silver neck hackles. Basis of Black Copper Marans coloring.' },
      { symbol: 'e^+', name: 'Wild Type (Duckwing)', dominanceRank: 3, description: 'Red Junglefowl pattern: gold/red back, black breast & tail in males; brown-streaked females.' },
      { symbol: 'e^b', name: 'Brown', dominanceRank: 4, description: 'Dark mahogany brown base. Foundation for Rhode Island Red, Wyandottes, Barred Rocks.' },
      { symbol: 'e^{bc}', name: 'Buttercup', dominanceRank: 5, description: 'Two-toned striped Buttercup pattern.' },
      { symbol: 'e^y', name: 'Recessive Wheaten', dominanceRank: 6, description: 'Cream/salmon females; males show buff-gold with red hackles.' },
      { symbol: 'e^s', name: 'Speckled Sussex', dominanceRank: 7, description: 'Rich mahogany brown base producing speckled or parti-colored plumage.' }
    ],
    defaultSire: ['E', 'e^+'],
    defaultDam: ['E', 'e^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 2: COLOR DILUTERS & MODIFIERS
  // ════════════════════════════════════════════════

  {
    locusId: 'Bl',
    locusName: 'Blue Locus',
    geneSymbol: 'Bl / bl+',
    chromosome: 'Autosomal (Chr 7)',
    category: 'Color Modifiers',
    inheritanceMode: 'Incomplete Dominant',
    description: 'Dilutes eumelanin (black) pigment granules. Does NOT affect phaeomelanin (red/gold). A single dose gives Blue; double dose gives Splash. Crucial gene in Blue Rosecomb Bantams and Surinam Blues.',
    breedExamples: ['Blue Rosecomb Bantam (Bl/bl+)', 'Surinam Blue (Bl/bl+)', 'Splash Rosecomb (Bl/Bl)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Bl', name: 'Blue (Dilution allele)', dominanceRank: 1, description: 'Dilutes black eumelanin granules.' },
      { symbol: 'bl^+', name: 'Wild Type (Full Black)', dominanceRank: 2, description: 'Normal undiluted black pigment.' }
    ],
    phenotypeMap: {
      'Bl/Bl': { name: 'Splash (White with blue/black splashes)', color: '#C8D6E5', textColor: '#333' },
      'Bl/bl^+': { name: 'Blue (Slate/Steel Blue)', color: '#4A5568', textColor: '#fff' },
      'bl^+/bl^+': { name: 'Black (Solid)', color: '#1A202C', textColor: '#fff' }
    },
    defaultSire: ['Bl', 'bl^+'],
    defaultDam: ['Bl', 'bl^+']
  },

  {
    locusId: 'lav',
    locusName: 'Lavender (Self-Blue)',
    geneSymbol: 'lav',
    chromosome: 'Autosomal (Chr 3)',
    category: 'Color Modifiers',
    inheritanceMode: 'Autosomal Recessive',
    description: 'Dilutes BOTH black (to pale dove-grey) AND red/gold (to washed buff/straw). Interacts with Mottling (mo) to create the signature Porcelain phenotype of Porcelain D\'Uccle Bantams.',
    breedExamples: ['Porcelain D\'Uccle Bantam (lav/lav mo/mo)', 'Lavender Orpington', 'Self-Blue Old English'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Lav^+', name: 'Wild Type (Full Pigment)', dominanceRank: 1, description: 'No lavender dilution.' },
      { symbol: 'lav', name: 'Lavender', dominanceRank: 2, description: 'Dilutes all pigments uniformly when homozygous lav/lav.' }
    ],
    defaultSire: ['Lav^+', 'lav'],
    defaultDam: ['Lav^+', 'lav']
  },

  {
    locusId: 'I',
    locusName: 'Dominant White (Inhibitor)',
    geneSymbol: 'I / i+',
    chromosome: 'Autosomal (Chr 33)',
    category: 'Color Modifiers',
    inheritanceMode: 'Autosomal Dominant (Incomplete)',
    description: 'Inhibits eumelanin (black pigment) deposition in feathers. When homozygous (I/I), creates fully white plumage in black-based birds. Heterozygotes may show faint black flecks or leakage, especially in males.',
    breedExamples: ['White Leghorn (I/I)', 'White Plymouth Rock (I/I)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'I', name: 'Dominant White', dominanceRank: 1, description: 'Suppresses black pigment deposition. I/I = pure white; I/i+ = white with possible black flecks.' },
      { symbol: 'i^+', name: 'Wild Type (Pigmented)', dominanceRank: 2, description: 'Full pigment expression.' }
    ],
    defaultSire: ['I', 'i^+'],
    defaultDam: ['I', 'i^+']
  },

  {
    locusId: 'c',
    locusName: 'Recessive White (Tyrosinase Inhibition)',
    geneSymbol: 'C+ / c',
    chromosome: 'Autosomal',
    category: 'Color Modifiers',
    inheritanceMode: 'Autosomal Recessive',
    description: 'Prevents tyrosinase-mediated melanin synthesis entirely. Homozygous c/c birds are phenotypically white regardless of all other color genes — a true epistatic white.',
    breedExamples: ['Some White Silkie strains (c/c)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'C^+', name: 'Wild Type (Melanin Synthesis Active)', dominanceRank: 1, description: 'Normal melanin production.' },
      { symbol: 'c', name: 'Recessive White', dominanceRank: 2, description: 'Epistatic white suppression of all pigment when c/c.' }
    ],
    defaultSire: ['C^+', 'c'],
    defaultDam: ['C^+', 'c']
  },

  {
    locusId: 'mo',
    locusName: 'Mottling',
    geneSymbol: 'mo',
    chromosome: 'Autosomal',
    category: 'Patterns & Tipping',
    inheritanceMode: 'Autosomal Recessive',
    description: 'Causes white V-shaped terminal tipping on each feather. Essential gene in Porcelain D\'Uccle Bantams (mo/mo lav/lav) and Mille Fleur patterns.',
    breedExamples: ['Porcelain D\'Uccle Bantam (mo/mo)', 'Mille Fleur D\'Uccle', 'Ancona', 'Swedish Flower Hen (mo/mo)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Mo^+', name: 'Wild Type (Unmottled)', dominanceRank: 1, description: 'Solid feather pigmentation.' },
      { symbol: 'mo', name: 'Mottled', dominanceRank: 2, description: 'White feather tipping when homozygous mo/mo. Increases each molt.' }
    ],
    defaultSire: ['Mo^+', 'mo'],
    defaultDam: ['Mo^+', 'mo']
  },

  {
    locusId: 'db',
    locusName: 'Dark Brown (Brown Egg Darkener)',
    geneSymbol: 'Db / db',
    chromosome: 'Autosomal',
    category: 'Egg Shell Traits',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Intensifies the brown porphyrin pigment coating on egg shells. Present in high-quantity in Marans, Welsummers, and Barnevelders to produce very dark chocolate-brown eggs.',
    breedExamples: ['Black Copper Marans', 'Welsummer', 'Barnevelder'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Db', name: 'Dark Brown Egg Intensifier', dominanceRank: 1, description: 'Deep dark chocolate porphyrin coating on shell.' },
      { symbol: 'db^+', name: 'Wild Type (Light/Medium Brown)', dominanceRank: 2, description: 'Standard brown or cream shell.' }
    ],
    defaultSire: ['Db', 'db^+'],
    defaultDam: ['Db', 'db^+']
  },

  {
    locusId: 'ig',
    locusName: 'Inhibitor of Gold (Cream Dilution)',
    geneSymbol: 'ig',
    chromosome: 'Autosomal',
    category: 'Color Modifiers',
    inheritanceMode: 'Autosomal Recessive',
    description: 'Dilutes gold and red phaeomelanin to pale cream or lemon-yellow. Distinct from Silver (S) which is sex-linked.',
    breedExamples: ['Cream Legbar (ig/ig)', 'Cream Crested Legbar'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Ig^+', name: 'Wild Type (Full Gold/Red)', dominanceRank: 1, description: 'Normal intense red/gold phaeomelanin expression.' },
      { symbol: 'ig', name: 'Cream Dilution', dominanceRank: 2, description: 'Dilutes gold/red to pale cream or lemon when ig/ig.' }
    ],
    defaultSire: ['Ig^+', 'ig'],
    defaultDam: ['Ig^+', 'ig']
  },

  {
    locusId: 'Sp',
    locusName: 'Spangling',
    geneSymbol: 'Sp',
    chromosome: 'Autosomal',
    category: 'Patterns & Tipping',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Produces a round iridescent black or dark spangle tip at the end of each feather.',
    breedExamples: ['Hamburg (Spangled)', 'Speckled Sussex'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Sp', name: 'Spangled', dominanceRank: 1, description: 'Round dark terminal feather spot.' },
      { symbol: 'sp^+', name: 'Wild Type (Unspangled)', dominanceRank: 2, description: 'No spangling.' }
    ],
    defaultSire: ['Sp', 'sp^+'],
    defaultDam: ['Sp', 'sp^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 3: SEX-LINKED LOCI (Z CHROMOSOME)
  // ════════════════════════════════════════════════

  {
    locusId: 'B',
    locusName: 'Sex-Linked Barring',
    geneSymbol: 'B (Z-linked)',
    chromosome: 'Sex-Linked (Z Chromosome)',
    category: 'Pattern & Sex-Linked',
    inheritanceMode: 'Sex-Linked Dominant',
    description: 'Produces alternating light and dark horizontal bars across feathers. Males (ZZ) with two copies are lighter barred; females (ZW) with one copy are darker barred.',
    breedExamples: ['Barred Plymouth Rock', 'Dominique', 'Cuckoo Marans', 'Cream Legbar'],
    isSexLinked: true,
    alleles: [
      { symbol: 'B', name: 'Barred', dominanceRank: 1, description: 'Alternating white/dark horizontal feather bars.' },
      { symbol: 'b^+', name: 'Non-Barred (Wild Type)', dominanceRank: 2, description: 'Solid or non-barred feather patterning.' }
    ],
    defaultSire: ['B', 'b^+'],
    defaultDam: ['b^+', 'W']
  },

  {
    locusId: 'S',
    locusName: 'Silver vs Gold',
    geneSymbol: 'S / s+ (Z-linked)',
    chromosome: 'Sex-Linked (Z Chromosome)',
    category: 'Pigment & Sex-Linked',
    inheritanceMode: 'Sex-Linked Dominant',
    description: 'Controls the color of the phaeomelanin (red/gold) background pigment. Silver (S) replaces warm gold/red with cool white/silver tones.',
    breedExamples: ['Silver Laced Wyandotte (S)', 'Gold Laced Wyandotte (s+)', 'Light Sussex (S)'],
    isSexLinked: true,
    alleles: [
      { symbol: 'S', name: 'Silver', dominanceRank: 1, description: 'Replaces red/gold phaeomelanin with white/silver.' },
      { symbol: 's^+', name: 'Gold (Wild Type)', dominanceRank: 2, description: 'Allows gold/red/yellow background pigment.' }
    ],
    defaultSire: ['S', 's^+'],
    defaultDam: ['s^+', 'W']
  },

  {
    locusId: 'ch',
    locusName: 'Chocolate (Sex-Linked Brown)',
    geneSymbol: 'ch (Z-linked)',
    chromosome: 'Sex-Linked (Z Chromosome)',
    category: 'Color Modifiers & Sex-Linked',
    inheritanceMode: 'Sex-Linked Recessive',
    description: 'Converts eumelanin (black pigment) to warm dark chocolate brown by altering melanin granule shape from round to elongated.',
    breedExamples: ['Chocolate Rhode Island Red', 'Chocolate Orpington'],
    isSexLinked: true,
    alleles: [
      { symbol: 'Ch^+', name: 'Wild Type (Black Eumelanin)', dominanceRank: 1, description: 'Normal round black melanin granules.' },
      { symbol: 'ch', name: 'Chocolate Brown', dominanceRank: 2, description: 'Elongated granules produce warm chocolate/liver brown.' }
    ],
    defaultSire: ['Ch^+', 'ch'],
    defaultDam: ['ch', 'W']
  },

  {
    locusId: 'id',
    locusName: 'Inhibitor of Dermal Melanin (Shank Color)',
    geneSymbol: 'Id / id+ (Z-linked)',
    chromosome: 'Sex-Linked (Z Chromosome)',
    category: 'Dermal & Sex-Linked',
    inheritanceMode: 'Sex-Linked Dominant',
    description: 'Controls whether melanin is deposited in the dermal layer of the skin and shanks. Id (dominant) clears dermal melanin, producing yellow, white, or pink shanks.',
    breedExamples: ['Ameraucana (id+/id+)', 'Leghorn (Id)', 'Rosecomb Bantam'],
    isSexLinked: true,
    alleles: [
      { symbol: 'Id', name: 'Dermal Melanin Inhibitor', dominanceRank: 1, description: 'Clears dermal melanin → Yellow, white, or pink shanks.' },
      { symbol: 'id^+', name: 'Wild Type (Dark Dermal Melanin)', dominanceRank: 2, description: 'Allows dark melanin → Slate, black, or blue shanks.' }
    ],
    defaultSire: ['Id', 'id^+'],
    defaultDam: ['id^+', 'W']
  },

  // ════════════════════════════════════════════════
  // SECTION 4: PATTERN RESTRICTORS & ENHANCERS
  // ════════════════════════════════════════════════

  {
    locusId: 'Co',
    locusName: 'Columbian Restrictor',
    geneSymbol: 'Co',
    chromosome: 'Autosomal',
    category: 'Patterns',
    inheritanceMode: 'Incomplete Dominant',
    description: 'Restricts eumelanin expression from the body feathers to only the neck hackles, tail, and primary wing feathers.',
    breedExamples: ['Light Sussex', 'Columbian Wyandotte'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Co', name: 'Columbian Restriction', dominanceRank: 1, description: 'Restricts black pigment to neck hackles, tail, and wing primaries.' },
      { symbol: 'co^+', name: 'Wild Type (Unrestricted Pigment)', dominanceRank: 2, description: 'Normal full-body pigment distribution.' }
    ],
    defaultSire: ['Co', 'co^+'],
    defaultDam: ['Co', 'co^+']
  },

  {
    locusId: 'Pg',
    locusName: 'Patterning Gene (Lacing)',
    geneSymbol: 'Pg',
    chromosome: 'Autosomal',
    category: 'Patterns',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Organizes black pigment into concentric bands around feather margins, creating penciling and lacing patterns.',
    breedExamples: ['Wyandotte (laced)', 'Barnevelder'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Pg', name: 'Patterning', dominanceRank: 1, description: 'Organizes black pigment into concentric feather rings or lacing.' },
      { symbol: 'pg^+', name: 'Wild Type (Unpatterned)', dominanceRank: 2, description: 'Normal unpatterned pigment distribution.' }
    ],
    defaultSire: ['Pg', 'pg^+'],
    defaultDam: ['Pg', 'pg^+']
  },

  {
    locusId: 'Ml',
    locusName: 'Melanotic (Black Enhancer)',
    geneSymbol: 'Ml',
    chromosome: 'Autosomal',
    category: 'Patterns',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Intensifies and defines the black border around feathers. Essential for producing clean, crisp lacing margins.',
    breedExamples: ['Single-laced Wyandotte', 'Laced Polish'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Ml', name: 'Melanotic (Sharp Black Border)', dominanceRank: 1, description: 'Concentrates and sharpens black feather edging.' },
      { symbol: 'ml^+', name: 'Wild Type (Normal Intensity)', dominanceRank: 2, description: 'Normal pigment intensity without concentrating effect.' }
    ],
    defaultSire: ['Ml', 'ml^+'],
    defaultDam: ['Ml', 'ml^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 5: COMB TYPES
  // ════════════════════════════════════════════════

  {
    locusId: 'P',
    locusName: 'Pea Comb',
    geneSymbol: 'P',
    chromosome: 'Autosomal (Chr 1)',
    category: 'Comb & Head',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Three low parallel ridges of papillae instead of the typical single serrated blade. Characteristic comb of Aseel gamefowl and Ameraucanas. Highly frostbite resistant.',
    breedExamples: ['Aseel (P/P)', 'Ameraucana (P/P)', 'Brahma (P/-)', 'Araucana (P/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'P', name: 'Pea Comb', dominanceRank: 1, description: 'Three ridged pea-shaped comb. Cold-hardy, frostbite resistant.' },
      { symbol: 'p^+', name: 'Wild Type (Single Comb)', dominanceRank: 2, description: 'Single serrated blade comb when combined with r+/r+.' }
    ],
    defaultSire: ['P', 'p^+'],
    defaultDam: ['P', 'p^+']
  },

  {
    locusId: 'R',
    locusName: 'Rose Comb',
    geneSymbol: 'R',
    chromosome: 'Autosomal (Chr 27)',
    category: 'Comb & Head',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Wide, flat comb covered with small rounded papillae, ending in a spike (leader) at the rear. Defining head structure of Blue Rosecomb Bantams (R/R).',
    breedExamples: ['Blue Rosecomb Bantam (R/R)', 'Wyandotte (R/R)', 'Dominique (R/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'R', name: 'Rose Comb', dominanceRank: 1, description: 'Flat papillae-covered comb with rear leader spike.' },
      { symbol: 'r^+', name: 'Wild Type (Single Comb allele)', dominanceRank: 2, description: 'Default single-comb allele.' }
    ],
    defaultSire: ['R', 'r^+'],
    defaultDam: ['R', 'r^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 6: FACIAL FEATHERING & MORPHOLOGY
  // ════════════════════════════════════════════════

  {
    locusId: 'Mb',
    locusName: 'Muffs and Beard',
    geneSymbol: 'Mb',
    chromosome: 'Autosomal',
    category: 'Feather & Morphology',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Extended feathering on the cheeks (muffs) and under the chin (beard). Defining facial feature of Porcelain D\'Uccle Bantams and Ameraucanas.',
    breedExamples: ['Porcelain D\'Uccle Bantam (Mb/-)', 'Ameraucana (Mb/-)', 'Faverolles (Mb/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Mb', name: 'Muffled & Bearded', dominanceRank: 1, description: 'Extended cheek muffs and chin beard feathering.' },
      { symbol: 'mb^+', name: 'Wild Type (Clean Face)', dominanceRank: 2, description: 'Normal smooth clean face without muffs.' }
    ],
    defaultSire: ['Mb', 'mb^+'],
    defaultDam: ['Mb', 'mb^+']
  },

  {
    locusId: 'Pti',
    locusName: 'Feathered Shanks (Ptilopody)',
    geneSymbol: 'Pti',
    chromosome: 'Autosomal (Multiple QTL)',
    category: 'Leg Morphology',
    inheritanceMode: 'Autosomal Dominant (Multigenic)',
    description: 'Causes dense feathering to develop on outer shanks and feet. Signature leg feathering of Porcelain D\'Uccle Bantams (Pti/Pti).',
    breedExamples: ['Porcelain D\'Uccle Bantam (Pti/Pti)', 'Brahma (Pti/Pti)', 'Cochin (Pti/Pti)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Pti', name: 'Feathered Shanks & Toes', dominanceRank: 1, description: 'Feather follicles on outer leg surfaces and toes.' },
      { symbol: 'pti^+', name: 'Clean Legs (Wild Type)', dominanceRank: 2, description: 'Smooth unfeathered shanks and toes.' }
    ],
    defaultSire: ['Pti', 'pti^+'],
    defaultDam: ['Pti', 'pti^+']
  },

  {
    locusId: 'Fm',
    locusName: 'Fibromelanosis (Black Skin & Organs)',
    geneSymbol: 'Fm',
    chromosome: 'Autosomal (Chr 20 Duplication)',
    category: 'Dermal & Hyperpigmentation',
    inheritanceMode: 'Autosomal Dominant (Additive)',
    description: 'A complex genomic duplication causing hyperpigmentation of skin, comb, wattles, beak, and internal organs. Found in Pure Surinam Black & Blue strains and Ayam Cemani.',
    breedExamples: ['Pure Surinam Black (Fm/Fm)', 'Surinam Blue (Fm/fm+ or Fm/Fm)', 'Ayam Cemani (Fm/Fm)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Fm', name: 'Fibromelanic (Black Internal Tissue)', dominanceRank: 1, description: 'Hyperpigmented black skin, wattles, comb, bones, and organs.' },
      { symbol: 'fm^+', name: 'Wild Type (Normal Flesh)', dominanceRank: 2, description: 'Normal pink/yellow skin and tissue coloration.' }
    ],
    defaultSire: ['Fm', 'fm^+'],
    defaultDam: ['Fm', 'fm^+']
  },

  {
    locusId: 'O',
    locusName: 'Oocyan (Blue Egg Shell)',
    geneSymbol: 'O',
    chromosome: 'Autosomal (Chr 1)',
    category: 'Egg Shell Traits',
    inheritanceMode: 'Autosomal Dominant',
    description: 'SLCO1B3 biliverdin pigment deposition producing blue/green eggshells.',
    breedExamples: ['Ameraucana (O/O)', 'Araucana (O/O)', 'Cream Legbar (O/O)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'O', name: 'Blue Egg Shell (Oocyan)', dominanceRank: 1, description: 'Biliverdin deposited THROUGH entire shell.' },
      { symbol: 'o^+', name: 'Wild Type (White/Cream Shell)', dominanceRank: 2, description: 'No biliverdin pigment layer in shell.' }
    ],
    defaultSire: ['O', 'o^+'],
    defaultDam: ['O', 'o^+']
  }
];

// ════════════════════════════════════════════════
// BREED PHENOTYPE TEMPLATES (User Specialization)
// ════════════════════════════════════════════════

export const POPULAR_POULTRY_BREEDS = [
  {
    id: 'blue-rosecomb',
    name: 'Blue Rosecomb Bantam',
    category: 'Specialty Heritage Bantam',
    icon: '🌹',
    colorHex: '#4A5568',
    traits: ['Rose Comb', 'Slate Blue Plumage', 'Bantam Size', 'Clean Legs'],
    genotype: { R: ['R', 'R'], Bl: ['Bl', 'bl^+'], E: ['E', 'E'] }
  },
  {
    id: 'surinam-black-blue',
    name: 'Pure Surinam (Black & Blue)',
    category: 'South American Game Strain',
    icon: '🖤',
    colorHex: '#111116',
    traits: ['Black Skin & Organs (Fibro)', 'Solid Black/Blue Plumage', 'Gamefowl Stance'],
    genotype: { Fm: ['Fm', 'Fm'], E: ['E', 'E'], Bl: ['Bl', 'bl^+'] }
  },
  {
    id: 'porcelain-duccle',
    name: 'Porcelain D\'Uccle Bantam',
    category: 'Belgian Feathered Foot Bantam',
    icon: '🕊️',
    colorHex: '#C8D6E5',
    traits: ['Porcelain (Lav+Mottled)', 'Feathered Feet', 'Muffs & Beard'],
    genotype: { lav: ['lav', 'lav'], mo: ['mo', 'mo'], Pti: ['Pti', 'Pti'], Mb: ['Mb', 'Mb'] }
  },
  {
    id: 'aseel-game',
    name: 'Aseel (Oriental Gamefowl)',
    category: 'Upcoming Preservation Line',
    icon: '🥊',
    colorHex: '#8C4D1D',
    traits: ['Pea Comb', 'Heavy Brow & Bone Density', 'Ancient Oriental Game Line'],
    genotype: { P: ['P', 'P'], E: ['e^+', 'e^+'] }
  },
  {
    id: 'black-rosecomb',
    name: 'Black Rosecomb Bantam',
    category: 'Specialty Heritage Bantam',
    icon: '🖤',
    colorHex: '#1A202C',
    traits: ['Rose Comb', 'Iridescent Black Plumage', 'White Earlobes'],
    genotype: { R: ['R', 'R'], Bl: ['bl^+', 'bl^+'], E: ['E', 'E'] }
  },
  {
    id: 'surinam-black-pure',
    name: 'Pure Surinam Solid Black',
    category: 'South American Game Strain',
    icon: '🦅',
    colorHex: '#0D0D11',
    traits: ['Fibromelanic Dark Skin', 'Solid Black Feathering', 'High Vigor Stance'],
    genotype: { Fm: ['Fm', 'Fm'], E: ['E', 'E'], Bl: ['bl^+', 'bl^+'] }
  },
  {
    id: 'mille-fleur-duccle',
    name: 'Mille Fleur D\'Uccle Bantam',
    category: 'Belgian Feathered Foot Bantam',
    icon: '🌺',
    colorHex: '#D47A2A',
    traits: ['Mille Fleur (Gold+Mottled)', 'Feathered Feet', 'Muffs & Beard'],
    genotype: { lav: ['Lav^+', 'Lav^+'], mo: ['mo', 'mo'], Pti: ['Pti', 'Pti'], Mb: ['Mb', 'Mb'] }
  },
  {
    id: 'ameraucana',
    name: 'Ameraucana (Blue Egg)',
    category: 'Heritage Blue Layer',
    icon: '🥚',
    colorHex: '#4A9BD4',
    traits: ['Sky Blue Eggs', 'Pea Comb', 'Muffs & Beard'],
    genotype: { O: ['O', 'O'], P: ['P', 'P'], Mb: ['Mb', 'Mb'] }
  }
];

// ════════════════════════════════════════════════
// PRESET BREEDING CROSSES (Specialized Crosses)
// ════════════════════════════════════════════════

export const PRESET_BREEDING_CROSSES = [
  {
    id: 'blue-rosecomb-splash',
    name: '1. Blue Rosecomb Bantam × Blue Rosecomb Bantam',
    emoji: '🌹',
    description: 'Blue Rosecomb Sire (Bl/bl+) × Blue Rosecomb Dam (Bl/bl+). Classic 1:2:1 color ratio.',
    loci: ['Bl', 'R'],
    sireGenotype: { Bl: ['Bl', 'bl^+'], R: ['R', 'R'] },
    damGenotype: { Bl: ['Bl', 'bl^+'], R: ['R', 'R'] },
    notes: '25% Splash (Bl/Bl), 50% Slate Blue (Bl/bl+), 25% Pure Black (bl+/bl+). All inherit 100% Rose Comb!'
  },
  {
    id: 'surinam-fibro-cross',
    name: '2. Pure Surinam Black (Fm/Fm) × Surinam Blue (Fm/fm+)',
    emoji: '🦅',
    description: 'Pure Surinam Fibro Black Sire (Fm/Fm, bl+/bl+) × Surinam Blue Hen (Fm/fm+, Bl/bl+).',
    loci: ['Fm', 'Bl'],
    sireGenotype: { Fm: ['Fm', 'Fm'], Bl: ['bl^+', 'bl^+'] },
    damGenotype: { Fm: ['Fm', 'fm^+'], Bl: ['Bl', 'bl^+'] },
    notes: '100% Fibromelanic offspring (50% Fm/Fm deep black skin, 50% Fm/fm+ black skin) with 50% Blue / 50% Black plumage.'
  },
  {
    id: 'porcelain-duccle-cross',
    name: '3. Porcelain D\'Uccle (lav/lav, mo/mo) Pure Line',
    emoji: '🕊️',
    description: 'Porcelain Sire (lav/lav, mo/mo, Pti/Pti) × Porcelain Dam (lav/lav, mo/mo, Pti/Pti).',
    loci: ['lav', 'mo', 'Pti'],
    sireGenotype: { lav: ['lav', 'lav'], mo: ['mo', 'mo'], Pti: ['Pti', 'Pti'] },
    damGenotype: { lav: ['lav', 'lav'], mo: ['mo', 'mo'], Pti: ['Pti', 'Pti'] },
    notes: '100% True Breeding Porcelain D\'Uccle (soft lavender-grey with white mottled tipping & feathered feet).'
  },
  {
    id: 'aseel-rosecomb-hybrid',
    name: '4. Aseel (Pea Comb) × Rosecomb (Rose Comb) Hybrid',
    emoji: '🥊',
    description: 'Aseel Rooster (P/P, r+/r+) × Blue Rosecomb Hen (p+/p+, R/R).',
    loci: ['P', 'R'],
    sireGenotype: { P: ['P', 'P'], R: ['r^+', 'r^+'] },
    damGenotype: { P: ['p^+', 'p^+'], R: ['R', 'R'] },
    notes: '100% F1 Walnut Comb (P/p+ R/r+) — creates low-profile cold-hardy walnut comb with muscular game frame!'
  }
];
