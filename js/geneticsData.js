/**
 * Big Game Theory — Master Chicken Genetics Mutations Database v2.0
 * Comprehensive dataset: 40+ known poultry loci, breed templates, and preset crosses.
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
    breedExamples: ['Ayam Cemani (E/E)', 'Ameraucana (e+/e+)', 'Wyandotte (eb/eb)', 'Marans (ER/ER)'],
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
    description: 'Dilutes eumelanin (black) pigment granules. Does NOT affect phaeomelanin (red/gold). A single dose gives Blue; double dose gives Splash. One of the most commercially important poultry color genes.',
    breedExamples: ['Blue Andalusian (Bl/bl+)', 'Blue Wyandotte (Bl/bl+)', 'Splash (Bl/Bl)'],
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
    description: 'Dilutes BOTH black (to pale dove-grey) AND red/gold (to washed buff/straw). Unlike Blue which only affects eumelanin, Lavender dilutes all pigments uniformly. Produces the iconic "self-blue" dove-grey appearance.',
    breedExamples: ['Self-Blue Old English', 'Lavender Orpington', 'Lavender Ameraucana'],
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
    description: 'Inhibits eumelanin (black pigment) deposition in feathers. When homozygous (I/I), creates fully white plumage in black-based birds. Heterozygotes may show faint black flecks or leakage, especially in males. Key gene in White Leghorns.',
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
    description: 'Prevents tyrosinase-mediated melanin synthesis entirely. Homozygous c/c birds are phenotypically white regardless of all other color genes — a true epistatic white. Different mechanism from Dominant White (I).',
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
    description: 'Causes white V-shaped terminal tipping on each feather. Each successive molt increases the proportion of white tipping. Some breeds appear more heavily mottled with age.',
    breedExamples: ['Ancona', 'Mottled Houdan', 'Mottled Java', 'Swedish Flower Hen (mo/mo)'],
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
    description: 'Intensifies the brown porphyrin pigment coating on egg shells. Present in high-quantity in Marans, Welsummers, and Barnevelders to produce very dark chocolate-brown eggs. Additive with other brown egg genetics.',
    breedExamples: ['Black Copper Marans', 'Welsummer', 'Barnevelder', 'Penedesenca'],
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
    description: 'Dilutes gold and red phaeomelanin to pale cream or lemon-yellow. Distinct from Silver (S) which is sex-linked. Homozygous ig/ig produces the characteristic cream tones of Cream Legbars.',
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
    description: 'Produces a round iridescent black or dark spangle tip at the end of each feather — the foundational pattern of spangled breeds. Interacts with the ground color to create spangled, V-spangle, or double-laced appearances.',
    breedExamples: ['Hamburg (Spangled)', 'Speckled Sussex', 'Swedish Flower Hen'],
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
    description: 'Produces alternating light and dark horizontal bars across feathers by inhibiting pigment in periodic bands during feather growth. Males (ZZ) with two copies are lighter/brighter barred; females (ZW) with one copy are darker barred. This is the foundation of auto-sexing breed programs.',
    breedExamples: ['Barred Plymouth Rock (ZB ZB/ZB W)', 'Dominique', 'Cuckoo Marans', 'Cream Legbar'],
    isSexLinked: true,
    alleles: [
      { symbol: 'B', name: 'Barred', dominanceRank: 1, description: 'Alternating white/dark horizontal feather bars. ZB ZB males are lighter; ZB W females are darker barred.' },
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
    description: 'Controls the color of the phaeomelanin (red/gold) background pigment. Silver (S) replaces warm gold/red with cool white/silver tones. Critical gene for creating sex-link hybrid chick color sexing programs.',
    breedExamples: ['Silver Laced Wyandotte (S)', 'Gold Laced Wyandotte (s+)', 'Light Sussex (S)', 'Gold Campine (s+)'],
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
    description: 'Converts eumelanin (black pigment) to warm dark chocolate brown by altering melanin granule shape from round to elongated. Females are always chocolate if they carry the ch allele on their single Z chromosome.',
    breedExamples: ['Chocolate Rhode Island Red (ch)', 'Chocolate Orpington'],
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
    description: 'Controls whether melanin is deposited in the dermal layer of the skin and shanks. Id (dominant) clears dermal melanin, producing yellow, white, or pink shanks when combined with yellow skin (W). Loss of Id (id+) allows dark dermal melanin to produce slate, green, blue, or black shanks.',
    breedExamples: ['Ameraucana (id+/id+ → slate shanks)', 'Leghorn (Id → yellow shanks)', 'Araucana'],
    isSexLinked: true,
    alleles: [
      { symbol: 'Id', name: 'Dermal Melanin Inhibitor (Yellow/White Shanks)', dominanceRank: 1, description: 'Clears dermal melanin → Yellow, white, or pink shanks.' },
      { symbol: 'id^+', name: 'Wild Type (Dark Dermal Melanin)', dominanceRank: 2, description: 'Allows dark melanin → Slate, black, blue, or willow-green shanks.' }
    ],
    defaultSire: ['Id', 'id^+'],
    defaultDam: ['id^+', 'W']
  },

  {
    locusId: 'dw',
    locusName: 'Sex-Linked Dwarfism',
    geneSymbol: 'dw (Z-linked)',
    chromosome: 'Sex-Linked (Z Chromosome)',
    category: 'Body Size & Sex-Linked',
    inheritanceMode: 'Sex-Linked Recessive',
    description: 'Reduces body size by ~30% through disruption of growth hormone receptor signaling. Used commercially to create bantam-sized laying hens with equivalent egg production. Females with dw on their single Z are always dwarf.',
    breedExamples: ['Commercial Dwarf Broiler Breeder Dams', 'Miniaturized layer strains'],
    isSexLinked: true,
    alleles: [
      { symbol: 'Dw^+', name: 'Wild Type (Normal Size)', dominanceRank: 1, description: 'Normal body size and growth rate.' },
      { symbol: 'dw', name: 'Sex-Linked Dwarf', dominanceRank: 2, description: 'Reduces body size ~30%. Females (dw/W) are always dwarf.' }
    ],
    defaultSire: ['Dw^+', 'dw'],
    defaultDam: ['dw', 'W']
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
    description: 'Restricts eumelanin expression from the body feathers to only the neck hackles, tail, and primary wing feathers. Creates the classic "Columbian" pattern of a light body with dark tail and hackles. A key component of Light Sussex and Columbian Wyandotte coloring.',
    breedExamples: ['Light Sussex (Co/Co)', 'Columbian Wyandotte', 'Delaware'],
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
    description: 'Organizes black pigment into concentric bands around feather margins, creating penciling and lacing patterns. Works synergistically with Columbian (Co) and Melanotic (Ml) to produce double or single lacing.',
    breedExamples: ['Wyandotte (laced)', 'Barnevelder (double-laced)', 'Penciled Hamburg'],
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
    description: 'Intensifies and defines the black border around feathers. Essential for producing clean, crisp lacing margins in laced breeds. Without Ml, lacing appears blurry or incomplete.',
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
    description: 'Three low parallel ridges of papillae instead of the typical single serrated blade. Tightly linked to the Oocyan (O) blue egg gene on Chr 1. Pea comb significantly reduces frostbite risk in cold climates.',
    breedExamples: ['Ameraucana (P/P)', 'Brahma (P/-)', 'Buckeye (P/-)', 'Araucana (P/-)'],
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
    description: 'Wide, flat comb covered with small rounded papillae, ending in a spike (leader) at the rear. Interaction: R + P = Walnut comb; R + p+/p+ = Rose; r+/r+ + P = Pea; r+/r+ + p+/p+ = Single.',
    breedExamples: ['Wyandotte (R/R)', 'Dominique (R/-)', 'Hamburg (R/-)', 'Redcap (R/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'R', name: 'Rose Comb', dominanceRank: 1, description: 'Flat papillae-covered comb with rear leader spike.' },
      { symbol: 'r^+', name: 'Wild Type (Single Comb allele)', dominanceRank: 2, description: 'Default single-comb allele.' }
    ],
    defaultSire: ['R', 'r^+'],
    defaultDam: ['R', 'r^+']
  },

  {
    locusId: 'V',
    locusName: 'V-Comb (Duplex / Horn Comb)',
    geneSymbol: 'V',
    chromosome: 'Autosomal (Chr 2)',
    category: 'Comb & Head',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Bifurcates the comb into two distinct upright horn-like projections, forming a V or U shape. Required for the distinctive horned crest breeds. Associated with the neural tube morphology linked to crest development.',
    breedExamples: ['La Flèche (V/V)', 'Polish (V/v+)', 'Sultan (V/-)', 'Crevecoeur (V/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'V', name: 'V-Comb (Horned)', dominanceRank: 1, description: 'Two upright horn-like comb projections forming a V.' },
      { symbol: 'v^+', name: 'Wild Type (Single Comb)', dominanceRank: 2, description: 'Normal single comb ridge.' }
    ],
    defaultSire: ['V', 'v^+'],
    defaultDam: ['V', 'v^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 6: HEAD & FACIAL FEATHERING
  // ════════════════════════════════════════════════

  {
    locusId: 'Cr',
    locusName: 'Crest (Topknot)',
    geneSymbol: 'Cr',
    chromosome: 'Autosomal (Chr 22)',
    category: 'Feather & Morphology',
    inheritanceMode: 'Autosomal Dominant (Incomplete)',
    description: 'Causes an outgrowth of the frontal nasal bone (the protuberance) that directs head feathers upward and outward into a topknot crest. Homozygous Cr/Cr can cause neurological issues in some strains due to cranial protuberance size.',
    breedExamples: ['Polish (Cr/Cr)', 'Appenzeller Spitzhauben (Cr/-)', 'Houdan (Cr/-)', 'Cream Legbar (Cr/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Cr', name: 'Crested Topknot', dominanceRank: 1, description: 'Upward-projecting head feather crest from nasal frontal protuberance.' },
      { symbol: 'cr^+', name: 'Wild Type (Smooth Head)', dominanceRank: 2, description: 'Normal smooth head with no crest.' }
    ],
    defaultSire: ['Cr', 'cr^+'],
    defaultDam: ['Cr', 'cr^+']
  },

  {
    locusId: 'Mb',
    locusName: 'Muffs and Beard',
    geneSymbol: 'Mb',
    chromosome: 'Autosomal',
    category: 'Feather & Morphology',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Extended feathering on the cheeks (muffs) and under the chin (beard). Often associated with reduced or absent earlobes and wattles. A key visual identifier of the Ameraucana breed.',
    breedExamples: ['Ameraucana (Mb/-)', 'Faverolles (Mb/-)', 'Easter Egger (Mb/-)', 'Araucana (Mb/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Mb', name: 'Muffled & Bearded', dominanceRank: 1, description: 'Extended cheek muffs and chin beard feathering.' },
      { symbol: 'mb^+', name: 'Wild Type (Clean Face)', dominanceRank: 2, description: 'Normal smooth clean face without muffs.' }
    ],
    defaultSire: ['Mb', 'mb^+'],
    defaultDam: ['Mb', 'mb^+']
  },

  {
    locusId: 'Et',
    locusName: 'Ear Tufts (Araucana)',
    geneSymbol: 'Et',
    chromosome: 'Autosomal',
    category: 'Feather & Morphology',
    inheritanceMode: 'Autosomal Dominant (Semi-Lethal Homozygous)',
    description: 'Produces elongated decorative feather tufts projecting from the auricular region near the ear. CRITICAL: Homozygous Et/Et is semi-lethal — approximately 80% of Et/Et embryos die in the shell. Responsible breeders only breed Et/+ to minimize dead-in-shell losses.',
    breedExamples: ['Araucana (Et/et+)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Et', name: 'Ear Tufts', dominanceRank: 1, description: '⚠️ SEMI-LETHAL HOMOZYGOUS. Auricular ear feather tufts. Breed only as Et/et+ to avoid 80% embryo mortality.' },
      { symbol: 'et^+', name: 'Wild Type (No Tufts)', dominanceRank: 2, description: 'No ear tufting. Safer homozygous form.' }
    ],
    defaultSire: ['Et', 'et^+'],
    defaultDam: ['Et', 'et^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 7: FEATHER STRUCTURE MUTATIONS
  // ════════════════════════════════════════════════

  {
    locusId: 'F',
    locusName: 'Frizzle Feather',
    geneSymbol: 'F',
    chromosome: 'Autosomal (Chr 33)',
    category: 'Feather Morphology',
    inheritanceMode: 'Incomplete Dominant',
    description: 'Mutations in keratin-related gene cause feather shafts to curl outward and backward away from the body. Single dose (F/f+) = attractive frizzled appearance. Double dose (F/F) = severe frizzling with brittle, easily broken feathers — avoid breeding two frizzles together.',
    breedExamples: ['Frizzle breeds', 'Sizzle (Frizzle Silkie cross)', 'Frizzle Cochin'],
    isSexLinked: false,
    alleles: [
      { symbol: 'F', name: 'Frizzled (Curled Outward)', dominanceRank: 1, description: 'F/f+ = ideal frizzle; ⚠️ F/F = extreme brittle frizzle — avoid homozygous!' },
      { symbol: 'f^+', name: 'Wild Type (Flat Smooth Feather)', dominanceRank: 2, description: 'Normal flat, smooth feather structure.' }
    ],
    defaultSire: ['F', 'f^+'],
    defaultDam: ['F', 'f^+']
  },

  {
    locusId: 'h',
    locusName: 'Hookless Feathers (Silkie)',
    geneSymbol: 'h',
    chromosome: 'Autosomal (Chr 3)',
    category: 'Feather Morphology',
    inheritanceMode: 'Autosomal Recessive',
    description: 'Loss of barbicels and hooklets on feather barbs eliminates the interlocking vane structure of normal feathers. The result is a hair-like, fluffy, fur-like plumage texture that is the defining characteristic of Silkie chickens.',
    breedExamples: ['Silkie (h/h)', 'Sizzle (h/h F/f+)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'H^+', name: 'Wild Type (Normal Hooked Feathers)', dominanceRank: 1, description: 'Normal interlocked feather vane structure.' },
      { symbol: 'h', name: 'Silkie Hookless (Hair-Like Feathers)', dominanceRank: 2, description: 'Fluffy silk-like feathers when homozygous h/h. No interlocked vanes.' }
    ],
    defaultSire: ['H^+', 'h'],
    defaultDam: ['H^+', 'h']
  },

  {
    locusId: 'Na',
    locusName: 'Naked Neck (Turken)',
    geneSymbol: 'Na',
    chromosome: 'Autosomal (Chr 3)',
    category: 'Feather Morphology',
    inheritanceMode: 'Incomplete Dominant',
    description: 'Inhibits feather follicle development in the neck and ventral body regions through BMP12 overexpression. Na/na+ = partial naked neck with small bowtie of feathers. Na/Na = completely bare neck and reduced ventral feathering. Imparts significant heat tolerance.',
    breedExamples: ['Transylvanian Naked Neck (Na/Na or Na/na+)', 'Turken'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Na', name: 'Naked Neck', dominanceRank: 1, description: 'Featherless neck. Na/Na = fully bare neck; Na/na+ = partial (bowtie feathers remain).' },
      { symbol: 'na^+', name: 'Wild Type (Fully Feathered Neck)', dominanceRank: 2, description: 'Normal full neck feathering.' }
    ],
    defaultSire: ['Na', 'na^+'],
    defaultDam: ['Na', 'na^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 8: LEG & BODY MORPHOLOGY
  // ════════════════════════════════════════════════

  {
    locusId: 'Pti',
    locusName: 'Feathered Shanks (Ptilopody)',
    geneSymbol: 'Pti',
    chromosome: 'Autosomal (Multiple QTL)',
    category: 'Leg Morphology',
    inheritanceMode: 'Autosomal Dominant (Multigenic)',
    description: 'Causes feather follicles to develop on the outer surface of leg shanks and toes. Controlled by regulatory variants near PITX1 and TBX5. Heterozygotes (Pti/pti+) typically show moderate feathering; homozygotes show dense vulture hocking in some breeds.',
    breedExamples: ['Brahma (Pti/Pti)', 'Cochin (Pti/Pti)', 'Faverolles (Pti/-)', 'Silkie (Pti/-)', 'Black Copper Marans (Pti/pti+)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Pti', name: 'Feathered Shanks & Toes', dominanceRank: 1, description: 'Feather follicles on outer leg surfaces and toes. Density varies with dosage.' },
      { symbol: 'pti^+', name: 'Clean Legs (Wild Type)', dominanceRank: 2, description: 'Smooth unfeathered shanks and toes.' }
    ],
    defaultSire: ['Pti', 'pti^+'],
    defaultDam: ['Pti', 'pti^+']
  },

  {
    locusId: 'Po',
    locusName: 'Polydactyly (Five Toes)',
    geneSymbol: 'Po',
    chromosome: 'Autosomal (Chr 13)',
    category: 'Leg Morphology',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Causes development of an extra (fifth) hind toe. Results from a regulatory mutation affecting Sonic Hedgehog (SHH) signaling in the limb bud. Can appear on one or both feet. The APA standard requires 5 toes in Silkies, Dorkings, Faverolles, and Houdans.',
    breedExamples: ['Silkie (Po/-)', 'Dorking (Po/-)', 'Faverolles (Po/-)', 'Houdan (Po/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Po', name: 'Polydactyly (Five Toes)', dominanceRank: 1, description: 'Extra fifth rear toe. APA required in Silkie, Dorking, Faverolles, Houdan.' },
      { symbol: 'po^+', name: 'Wild Type (Four Toes)', dominanceRank: 2, description: 'Normal four-toed foot.' }
    ],
    defaultSire: ['Po', 'po^+'],
    defaultDam: ['Po', 'po^+']
  },

  {
    locusId: 'Rp',
    locusName: 'Rumplessness',
    geneSymbol: 'Rp',
    chromosome: 'Autosomal (Chr 2)',
    category: 'Body Morphology',
    inheritanceMode: 'Autosomal Dominant (Variable Expression)',
    description: 'Absence of the pygostyle (tail bone) and associated tail feathers. Required for the true Araucana breed standard. Variable expression — some birds retain a partial pygostyle. Linked to the brachyury region. Combined with Ear Tufts (Et) defines the Araucana phenotype.',
    breedExamples: ['Araucana (Rp/-)', 'Rumpless Game'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Rp', name: 'Rumpless (No Tail)', dominanceRank: 1, description: 'Absent pygostyle and tail feathers. Required for Araucana breed standard.' },
      { symbol: 'rp^+', name: 'Wild Type (Normal Tail)', dominanceRank: 2, description: 'Normal pygostyle and tail feather set.' }
    ],
    defaultSire: ['Rp', 'rp^+'],
    defaultDam: ['Rp', 'rp^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 9: SKIN PIGMENTATION TRAITS
  // ════════════════════════════════════════════════

  {
    locusId: 'Fm',
    locusName: 'Fibromelanosis (Black Skin & Organs)',
    geneSymbol: 'Fm',
    chromosome: 'Autosomal (Chr 20 Duplication)',
    category: 'Dermal & Hyperpigmentation',
    inheritanceMode: 'Autosomal Dominant (Additive)',
    description: 'A complex genomic duplication event on chromosome 20 (involving EDN3 regulatory regions) causes ectopic activation of melanocyte differentiation in fibroblasts throughout the body. Results in hyperpigmentation of skin, comb, wattles, beak, bones, tendons, periosteum, and internal organs. Believed to originate in Southeast Asia.',
    breedExamples: ['Ayam Cemani (Fm/Fm - deepest black)', 'Silkie (Fm/fm+ or Fm/Fm)', 'Svarta Höna (Fm/-)', 'Kadaknath (Fm/-)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'Fm', name: 'Fibromelanic (Black Internal Tissue)', dominanceRank: 1, description: 'Hyperpigmented black skin, wattles, comb, bones, and organs. Fm/Fm = deepest black.' },
      { symbol: 'fm^+', name: 'Wild Type (Normal Flesh)', dominanceRank: 2, description: 'Normal pink/yellow skin and tissue coloration.' }
    ],
    defaultSire: ['Fm', 'fm^+'],
    defaultDam: ['Fm', 'fm^+']
  },

  {
    locusId: 'W',
    locusName: 'Yellow Skin vs White Skin',
    geneSymbol: 'W / w+',
    chromosome: 'Autosomal (Chr 8)',
    category: 'Skin Pigmentation',
    inheritanceMode: 'Autosomal Dominant',
    description: 'Controls whether carotenoid pigments are deposited in the epidermis. W (dominant) blocks carotenoid deposition → white/pink skin. w+ (recessive) allows carotenoid uptake → yellow skin. Interacts with Id (shank gene) for final shank color determination.',
    breedExamples: ['White Skin: Silkie (W/W), Dorking', 'Yellow Skin: Leghorn (w+/w+), Rhode Island Red'],
    isSexLinked: false,
    alleles: [
      { symbol: 'W', name: 'White/Pink Skin (Carotenoid Inhibition)', dominanceRank: 1, description: 'Blocks dietary carotenoid deposition → white, pink, or bluish skin.' },
      { symbol: 'w^+', name: 'Yellow Skin (Wild Type)', dominanceRank: 2, description: 'Allows carotenoid uptake → yellow or orange-tinted skin.' }
    ],
    defaultSire: ['W', 'w^+'],
    defaultDam: ['W', 'w^+']
  },

  // ════════════════════════════════════════════════
  // SECTION 10: EGG SHELL TRAITS
  // ════════════════════════════════════════════════

  {
    locusId: 'O',
    locusName: 'Oocyan (Blue Egg Shell)',
    geneSymbol: 'O',
    chromosome: 'Autosomal (Chr 1)',
    category: 'Egg Shell Traits',
    inheritanceMode: 'Autosomal Dominant',
    description: 'A retroviral insertion (EAV-HP) in the SLCO1B3 gene promoter causes biliverdin (green bile pigment) to be deposited throughout the entire eggshell wall thickness during shell calcification. The blue pigment permeates all layers — unlike brown pigment which only coats the outer surface. When blue (O) combines with brown (porphyrin) overlay: blue + heavy brown = Olive; blue + light brown = sage/moss; blue + no brown = sky blue.',
    breedExamples: ['Ameraucana (O/O → sky blue)', 'Araucana (O/O → turquoise)', 'Cream Legbar (O/O → blue)', 'Easter Egger (O/o+ → blue/green)'],
    isSexLinked: false,
    alleles: [
      { symbol: 'O', name: 'Blue Egg Shell (Oocyan)', dominanceRank: 1, description: 'Biliverdin deposited THROUGH entire shell. Blue + brown coat = Olive egg!' },
      { symbol: 'o^+', name: 'Wild Type (White/Cream Shell)', dominanceRank: 2, description: 'No biliverdin pigment layer in shell.' }
    ],
    defaultSire: ['O', 'o^+'],
    defaultDam: ['O', 'o^+']
  }
];

// ════════════════════════════════════════════════
// BREED PHENOTYPE TEMPLATES
// ════════════════════════════════════════════════

export const POPULAR_POULTRY_BREEDS = [
  {
    id: 'ameraucana',
    name: 'Ameraucana',
    category: 'Heritage Blue Egg Layer',
    icon: '🥚',
    colorHex: '#4A9BD4',
    traits: ['Blue Egg Layer', 'Pea Comb', 'Muffs & Beard', 'Clean Face'],
    genotype: { O: ['O', 'O'], P: ['P', 'P'], Mb: ['Mb', 'Mb'] }
  },
  {
    id: 'black-copper-marans',
    name: 'Black Copper Marans',
    category: 'Dark Egg Layer',
    icon: '🤎',
    colorHex: '#3D1A08',
    traits: ['Dark Chocolate Egg', 'Birchen Pattern', 'Feathered Legs'],
    genotype: { E: ['E^R', 'E^R'], O: ['o^+', 'o^+'], Pti: ['Pti', 'pti^+'], Db: ['Db', 'Db'] }
  },
  {
    id: 'barred-rock',
    name: 'Barred Plymouth Rock',
    category: 'Dual Purpose Heritage',
    icon: '🏁',
    colorHex: '#555',
    traits: ['Barred Feathers', 'Single Comb', 'Brown Egg Layer'],
    genotype: { B: ['B', 'B'], E: ['E', 'E'] }
  },
  {
    id: 'ayam-cemani',
    name: 'Ayam Cemani',
    category: 'Rare Fibromelanic Heritage',
    icon: '🖤',
    colorHex: '#1A1A1A',
    traits: ['Black Skin & Organs', 'Extended Black Plumage', 'Black Bones'],
    genotype: { Fm: ['Fm', 'Fm'], E: ['E', 'E'] }
  },
  {
    id: 'cream-legbar',
    name: 'Cream Legbar',
    category: 'Auto-Sexing Heritage',
    icon: '👑',
    colorHex: '#B8D4E8',
    traits: ['Sky Blue Egg', 'Auto-Sexing Chicks', 'Crested', 'Cream Dilution'],
    genotype: { O: ['O', 'O'], B: ['B', 'B'], S: ['S', 'S'], Cr: ['Cr', 'Cr'], ig: ['ig', 'ig'] }
  },
  {
    id: 'silver-wyandotte',
    name: 'Silver Laced Wyandotte',
    category: 'Heritage Laced',
    icon: '🛡️',
    colorHex: '#8CA0B0',
    traits: ['Silver Lacing', 'Rose Comb', 'Brown Egg'],
    genotype: { R: ['R', 'R'], Pg: ['Pg', 'Pg'], Co: ['Co', 'Co'], Ml: ['Ml', 'Ml'], S: ['S', 'S'] }
  },
  {
    id: 'gold-wyandotte',
    name: 'Gold Laced Wyandotte',
    category: 'Heritage Laced',
    icon: '✨',
    colorHex: '#C9851C',
    traits: ['Gold Lacing', 'Rose Comb', 'Brown Egg'],
    genotype: { R: ['R', 'R'], Pg: ['Pg', 'Pg'], Co: ['Co', 'Co'], Ml: ['Ml', 'Ml'], S: ['s^+', 's^+'] }
  },
  {
    id: 'silkie',
    name: 'Silkie (Black Skin)',
    category: 'Bantam Feather Mutation',
    icon: '☁️',
    colorHex: '#F5F5F0',
    traits: ['Hair-Like Feathers', 'Black Skin (Fibro)', 'Feathered Feet', 'Five Toes'],
    genotype: { h: ['h', 'h'], Fm: ['Fm', 'Fm'], c: ['c', 'c'], Pti: ['Pti', 'Pti'], Po: ['Po', 'Po'] }
  },
  {
    id: 'araucana',
    name: 'Araucana',
    category: 'Rumpless Blue Egg Heritage',
    icon: '🏔️',
    colorHex: '#6EAA7F',
    traits: ['Sky Blue Egg', 'Rumpless (No Tail)', 'Ear Tufts (⚠️ Semi-Lethal Hom)', 'Pea Comb'],
    genotype: { O: ['O', 'O'], Rp: ['Rp', 'rp^+'], Et: ['Et', 'et^+'], P: ['P', 'P'] }
  },
  {
    id: 'olive-egger',
    name: 'Olive Egger F1',
    category: 'Hybrid Egg Layer',
    icon: '🫒',
    colorHex: '#6B7A3A',
    traits: ['Olive Green Egg', 'Mixed Heritage'],
    genotype: { O: ['O', 'o^+'], P: ['P', 'p^+'] }
  },
  {
    id: 'frizzle',
    name: 'Frizzle Bantam',
    category: 'Feather Mutation',
    icon: '🌀',
    colorHex: '#D4924A',
    traits: ['Curled Frizzle Feathers', 'Various Colors'],
    genotype: { F: ['F', 'f^+'] }
  },
  {
    id: 'naked-neck',
    name: 'Naked Neck (Turken)',
    category: 'Feather Reduction Mutation',
    icon: '🦃',
    colorHex: '#C97B4B',
    traits: ['Bare Neck', 'Heat Tolerant', 'Reduced Feathering'],
    genotype: { Na: ['Na', 'na^+'] }
  }
];

// ════════════════════════════════════════════════
// PRESET BREEDING CROSSES (12 Real-World Crosses)
// ════════════════════════════════════════════════

export const PRESET_BREEDING_CROSSES = [
  {
    id: 'olive-egger-f1',
    name: '1. Olive Egger F1 Hybrid Cross',
    emoji: '🫒',
    description: 'Blue Egg Ameraucana Rooster (O/O) × Dark Brown Egg Black Copper Marans Hen (o+/o+).',
    loci: ['O', 'Pti'],
    sireGenotype: { O: ['O', 'O'], Pti: ['pti^+', 'pti^+'] },
    damGenotype: { O: ['o^+', 'o^+'], Pti: ['Pti', 'pti^+'] },
    notes: '100% of F1 offspring carry O/o+ — all hens lay Olive Green eggs!'
  },
  {
    id: 'olive-egger-f2',
    name: '2. Olive Egger F2 Dark Moss Backcross',
    emoji: '🫚',
    description: 'Backcrossing F1 Olive Egger Hen (O/o+) to pure Black Copper Marans Rooster (o+/o+).',
    loci: ['O'],
    sireGenotype: { O: ['o^+', 'o^+'] },
    damGenotype: { O: ['O', 'o^+'] },
    notes: '50% Deep Olive Layers (O/o+), 50% Dark Chocolate Brown Layers (o+/o+).'
  },
  {
    id: 'black-sex-link',
    name: '3. Commercial Black Sex-Link',
    emoji: '♀🖤',
    description: 'Non-Barred Rhode Island Red Male (b+/b+, s+/s+) × Barred Plymouth Rock Female (B/W).',
    loci: ['B', 'S'],
    sireGenotype: { B: ['b^+', 'b^+'], S: ['s^+', 's^+'] },
    damGenotype: { B: ['B', 'W'], S: ['s^+', 'W'] },
    notes: 'Male chicks barred (white head dot); female chicks solid black. 100% auto-sexable at hatch!'
  },
  {
    id: 'cream-legbar',
    name: '4. Cream Legbar Auto-Sexing Cross',
    emoji: '🧬',
    description: 'Pure Cream Legbar cross. Double-barred Silver Crested Rooster × Barred Silver Crested Hen.',
    loci: ['B', 'O', 'Cr'],
    sireGenotype: { B: ['B', 'B'], O: ['O', 'O'], Cr: ['Cr', 'Cr'] },
    damGenotype: { B: ['B', 'W'], O: ['O', 'O'], Cr: ['Cr', 'Cr'] },
    notes: 'Males: pale creamy down, white head spot. Females: dark chipmunk stripes. All lay Blue eggs!'
  },
  {
    id: 'silver-gold-sexlink',
    name: '5. Red/Gold Sex-Link Cross',
    emoji: '🔴',
    description: 'Gold Laced Wyandotte Rooster (s+/s+) × Silver Laced Wyandotte Hen (S/W).',
    loci: ['S', 'R'],
    sireGenotype: { S: ['s^+', 's^+'], R: ['R', 'R'] },
    damGenotype: { S: ['S', 'W'], R: ['R', 'R'] },
    notes: 'Males: Silver hackles (inherit S from dam). Females: Gold (inherit s+ from sire).'
  },
  {
    id: 'ayam-cemani-cross',
    name: '6. Ayam Cemani Fibromelanosis F1',
    emoji: '🖤',
    description: 'Pure Fibromelanic Rooster (Fm/Fm) × Non-Fibro Hen (fm+/fm+).',
    loci: ['Fm', 'E'],
    sireGenotype: { Fm: ['Fm', 'Fm'], E: ['E', 'E'] },
    damGenotype: { Fm: ['fm^+', 'fm^+'], E: ['e^+', 'e^+'] },
    notes: '100% of F1 carry Fm/fm+ — all have black skin/wattles/comb. Deeper fibro from Fm/Fm sire.'
  },
  {
    id: 'sizzle-cross',
    name: '7. Sizzle Cross (Silkie × Frizzle)',
    emoji: '🌀',
    description: 'Frizzle Rooster (F/f+, H+/H+) × Silkie Hen (f+/f+, h/h).',
    loci: ['F', 'h'],
    sireGenotype: { F: ['F', 'f^+'], h: ['H^+', 'H^+'] },
    damGenotype: { F: ['f^+', 'f^+'], h: ['h', 'h'] },
    notes: '50% Sizzle (F/f+ h/H+) with frizzled silkie-esque feathers; 50% straight-feathered Silkie crosses.'
  },
  {
    id: 'swedish-flower-mottled',
    name: '8. Swedish Flower Hen Mottling Cross',
    emoji: '🌸',
    description: 'Two heterozygous Mottled carriers (Mo+/mo × Mo+/mo).',
    loci: ['mo'],
    sireGenotype: { mo: ['Mo^+', 'mo'] },
    damGenotype: { mo: ['Mo^+', 'mo'] },
    notes: '25% homozygous Mottled (mo/mo), 50% carrier (Mo+/mo), 25% non-mottled. Mottling increases each molt!'
  },
  {
    id: 'blue-splash-wyandotte',
    name: '9. Blue / Black / Splash Wyandotte Cross',
    emoji: '💦',
    description: 'Two heterozygous Blue Wyandottes (Bl/bl+) crossed.',
    loci: ['Bl', 'R'],
    sireGenotype: { Bl: ['Bl', 'bl^+'], R: ['R', 'R'] },
    damGenotype: { Bl: ['Bl', 'bl^+'], R: ['R', 'R'] },
    notes: '25% Splash (Bl/Bl), 50% Blue (Bl/bl+), 25% Black (bl+/bl+). Classic 1:2:1 incomplete dominance.'
  },
  {
    id: 'walnut-comb',
    name: '10. Rose × Pea Comb (Walnut Comb Creation)',
    emoji: '🌰',
    description: 'Rose Comb Wyandotte (R/R, p+/p+) × Pea Comb Ameraucana (r+/r+, P/P).',
    loci: ['R', 'P'],
    sireGenotype: { R: ['R', 'R'], P: ['p^+', 'p^+'] },
    damGenotype: { R: ['r^+', 'r^+'], P: ['P', 'P'] },
    notes: '100% Walnut Comb F1 (R/r+, P/p+). F2 cross yields all 4 comb types in 9:3:3:1 ratio!'
  },
  {
    id: 'fibro-blue-egg',
    name: '11. Fibro Easter Egger (Black Skin + Blue Egg)',
    emoji: '🧬',
    description: 'Ayam Cemani Rooster (Fm/Fm, o+/o+) × Ameraucana Hen (fm+/fm+, O/O).',
    loci: ['Fm', 'O'],
    sireGenotype: { Fm: ['Fm', 'Fm'], O: ['o^+', 'o^+'] },
    damGenotype: { Fm: ['fm^+', 'fm^+'], O: ['O', 'O'] },
    notes: '100% of F1 have Fm/fm+ (black skin) AND O/o+ (blue egg layer). Rare and striking combo!'
  },
  {
    id: 'araucana-araucana',
    name: '12. Araucana Responsible Tufted Cross',
    emoji: '⚠️',
    description: 'Non-Tufted Rumpless Araucana (Rp/rp+, et+/et+) × Tufted Rumpless Araucana (Rp/rp+, Et/et+).',
    loci: ['Rp', 'Et'],
    sireGenotype: { Rp: ['Rp', 'rp^+'], Et: ['et^+', 'et^+'] },
    damGenotype: { Rp: ['Rp', 'rp^+'], Et: ['Et', 'et^+'] },
    notes: '⚠️ NEVER breed Et/Et × Et/Et — ~80% embryo mortality! Always breed tufted to non-tufted to avoid dead-in-shell losses.'
  }
];
