/**
 * Big Game Theory — Avian Genetics Matrix & Breeder Calculator
 * Dual-mode controller: Visual Breed/Trait Picker & Advanced Punnett Matrix.
 */

import { CHICKEN_GENETICS_DATABASE, POPULAR_POULTRY_BREEDS, PRESET_BREEDING_CROSSES } from './geneticsData.js';
import { calculateCross, buildPunnettTable, predictEggColor, getLocusById } from './punnettEngine.js';

let currentMode = 'simple'; // 'simple' (Visual mode) or 'advanced'
let currentSelectedLoci = ['O', 'Pti']; // Default Olive Egger loci
let sireGenotypeState = { O: ['O', 'O'], Pti: ['pti^+', 'pti^+'] };
let damGenotypeState = { O: ['o^+', 'o^+'], Pti: ['Pti', 'pti^+'] };
let activeCategoryFilter = 'ALL';

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModeSwitcher();
  renderBreedPickerGrid();
  renderLocusSelector();
  renderParentSelectors();
  renderMutationsDatabase();
  renderPresetCrosses();
  runCalculator();

  document.getElementById('run-calc-btn')?.addEventListener('click', runCalculator);
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('gene-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'gene-modal') closeModal();
  });
});

/* ─── TAB ROUTER ──────────────────────────────────────────────────────── */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');
    });
  });
}

/* ─── MODE SWITCHER (VISUAL MODE VS ADVANCED MODE) ────────────────────── */
function initModeSwitcher() {
  const modeBtns = document.querySelectorAll('.mode-btn');
  const advancedSection = document.getElementById('advanced-matrix-section');
  const simpleSection = document.getElementById('simple-outcomes-section');
  const modeHint = document.getElementById('mode-hint');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentMode = btn.dataset.mode;
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (currentMode === 'simple') {
        if (simpleSection) simpleSection.style.display = 'block';
        if (advancedSection) advancedSection.style.display = 'none';
        if (modeHint) modeHint.textContent = 'Visual mode — preview offspring phenotypes';
      } else {
        if (simpleSection) simpleSection.style.display = 'block';
        if (advancedSection) advancedSection.style.display = 'block';
        if (modeHint) modeHint.textContent = 'Advanced mode — full allele Punnett matrix & ratios';
      }
    });
  });
}

/* ─── BREED PICKER GRID ────────────────────────────────────────────────── */
function renderBreedPickerGrid() {
  const sireBreedContainer = document.getElementById('sire-breed-picker');
  const damBreedContainer = document.getElementById('dam-breed-picker');
  if (!sireBreedContainer || !damBreedContainer) return;

  sireBreedContainer.innerHTML = '';
  damBreedContainer.innerHTML = '';

  POPULAR_POULTRY_BREEDS.forEach(breed => {
    // Sire Button
    const sireBtn = document.createElement('button');
    sireBtn.className = 'breed-btn';
    sireBtn.innerHTML = `<span class="breed-btn-icon">${breed.icon}</span> <span>${breed.name}</span>`;
    sireBtn.addEventListener('click', () => {
      applyBreedToParent('sire', breed);
      highlightSelectedBreed('sire', sireBtn);
    });
    sireBreedContainer.appendChild(sireBtn);

    // Dam Button
    const damBtn = document.createElement('button');
    damBtn.className = 'breed-btn';
    damBtn.innerHTML = `<span class="breed-btn-icon">${breed.icon}</span> <span>${breed.name}</span>`;
    damBtn.addEventListener('click', () => {
      applyBreedToParent('dam', breed);
      highlightSelectedBreed('dam', damBtn);
    });
    damBreedContainer.appendChild(damBtn);
  });
}

function applyBreedToParent(parent, breed) {
  const breedLoci = Object.keys(breed.genotype);
  breedLoci.forEach(locusId => {
    if (!currentSelectedLoci.includes(locusId)) {
      currentSelectedLoci.push(locusId);
    }
  });

  if (parent === 'sire') {
    sireGenotypeState = JSON.parse(JSON.stringify(breed.genotype));
    const nameEl = document.getElementById('sire-breed-name');
    if (nameEl) nameEl.textContent = `${breed.icon} ${breed.name} (${breed.category})`;
  } else {
    damGenotypeState = JSON.parse(JSON.stringify(breed.genotype));
    const nameEl = document.getElementById('dam-breed-name');
    if (nameEl) nameEl.textContent = `${breed.icon} ${breed.name} (${breed.category})`;
  }

  renderLocusSelector();
  renderParentSelectors();
  runCalculator();
}

function highlightSelectedBreed(parent, activeBtn) {
  const container = document.getElementById(`${parent}-breed-picker`);
  container?.querySelectorAll('.breed-btn').forEach(b => b.classList.remove('selected'));
  activeBtn.classList.add('selected');
}

/* ─── LOCUS SELECTOR & ALLELE SELECTORS ───────────────────────────────── */
function renderLocusSelector() {
  const container = document.getElementById('locus-selector-list');
  if (!container) return;

  container.innerHTML = '';

  CHICKEN_GENETICS_DATABASE.forEach(locus => {
    const item = document.createElement('label');
    item.className = 'locus-checkbox-item';
    const isChecked = currentSelectedLoci.includes(locus.locusId);

    item.innerHTML = `
      <input type="checkbox" value="${locus.locusId}" ${isChecked ? 'checked' : ''}>
      <div class="locus-info">
        <span class="locus-symbol">${locus.locusId} ${locus.isSexLinked ? '(Z-Chromosome)' : ''}</span>
        <span class="locus-name">${locus.locusName}</span>
      </div>
    `;

    item.querySelector('input')?.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (currentSelectedLoci.length >= 4) {
          alert('Maximum 4 simultaneous loci allowed for clear Punnett calculation.');
          e.target.checked = false;
          return;
        }
        currentSelectedLoci.push(locus.locusId);
        sireGenotypeState[locus.locusId] = [...locus.defaultSire];
        damGenotypeState[locus.locusId] = [...locus.defaultDam];
      } else {
        if (currentSelectedLoci.length <= 1) {
          alert('At least 1 locus must remain selected.');
          e.target.checked = true;
          return;
        }
        currentSelectedLoci = currentSelectedLoci.filter(id => id !== locus.locusId);
        delete sireGenotypeState[locus.locusId];
        delete damGenotypeState[locus.locusId];
      }
      renderParentSelectors();
      runCalculator();
    });

    container.appendChild(item);
  });
}

function renderParentSelectors() {
  const sireContainer = document.getElementById('sire-allele-container');
  const damContainer = document.getElementById('dam-allele-container');
  if (!sireContainer || !damContainer) return;

  sireContainer.innerHTML = '';
  damContainer.innerHTML = '';

  currentSelectedLoci.forEach(locusId => {
    const locus = getLocusById(locusId);
    if (!locus) return;

    // Sire Row
    const sireRow = document.createElement('div');
    sireRow.className = 'locus-pair-row';
    sireRow.innerHTML = `
      <span class="locus-pair-label">${locus.locusId}:</span>
      <div style="display: flex; gap: 0.3rem;">
        ${createAlleleSelectHtml(locus, sireGenotypeState[locusId]?.[0], `sire-${locusId}-0`, false)}
        ${createAlleleSelectHtml(locus, sireGenotypeState[locusId]?.[1], `sire-${locusId}-1`, false)}
      </div>
    `;
    sireContainer.appendChild(sireRow);

    // Dam Row
    const damRow = document.createElement('div');
    damRow.className = 'locus-pair-row';
    damRow.innerHTML = `
      <span class="locus-pair-label">${locus.locusId}:</span>
      <div style="display: flex; gap: 0.3rem;">
        ${createAlleleSelectHtml(locus, damGenotypeState[locusId]?.[0], `dam-${locusId}-0`, false)}
        ${createAlleleSelectHtml(locus, damGenotypeState[locusId]?.[1], `dam-${locusId}-1`, locus.isSexLinked)}
      </div>
    `;
    damContainer.appendChild(damRow);
  });

  currentSelectedLoci.forEach(locusId => {
    ['0', '1'].forEach(idx => {
      document.getElementById(`sire-${locusId}-${idx}`)?.addEventListener('change', (e) => {
        if (!sireGenotypeState[locusId]) sireGenotypeState[locusId] = [];
        sireGenotypeState[locusId][parseInt(idx)] = e.target.value;
        runCalculator();
      });
      document.getElementById(`dam-${locusId}-${idx}`)?.addEventListener('change', (e) => {
        if (!damGenotypeState[locusId]) damGenotypeState[locusId] = [];
        damGenotypeState[locusId][parseInt(idx)] = e.target.value;
        runCalculator();
      });
    });
  });
}

function createAlleleSelectHtml(locus, selectedVal, id, isDamSexChromosome) {
  let optionsHtml = '';
  if (isDamSexChromosome) {
    optionsHtml += `<option value="W" selected>W (Female Chr)</option>`;
  } else {
    locus.alleles.forEach(a => {
      const isSel = a.symbol === selectedVal ? 'selected' : '';
      optionsHtml += `<option value="${a.symbol}" ${isSel}>${a.symbol} (${a.name})</option>`;
    });
  }
  return `<select class="allele-select" id="${id}">${optionsHtml}</select>`;
}

/* ─── RUN CALCULATOR & RENDER RESULTS ──────────────────────────────────── */
function runCalculator() {
  const result = calculateCross(currentSelectedLoci, sireGenotypeState, damGenotypeState);
  renderVisualSimpleOutcomes(result);

  const punnettData = buildPunnettTable(currentSelectedLoci, sireGenotypeState, damGenotypeState);
  renderPunnettGrid(punnettData);
  renderSummaryRatios(result);
}

/* VISUAL SIMPLE OUTCOME CARDS */
function renderVisualSimpleOutcomes(result) {
  const container = document.getElementById('simple-outcomes-container');
  const countEl = document.getElementById('outcomes-count');
  if (!container) return;

  if (countEl) countEl.textContent = `${result.outcomes.length} Phenotypes (${result.totalCombinations} Combinations)`;

  if (!result.outcomes.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🥚</div><p>Select loci or parent breeds to compute offspring.</p></div>`;
    return;
  }

  container.innerHTML = result.outcomes.map(item => {
    const isFemale = item._sex === 'F';
    const sexLabel = isFemale ? '♀️ Hen (ZW)' : '♂️ Rooster (ZZ)';
    const sexClass = isFemale ? 'female' : 'male';

    // Genotype Map for Egg shell color calculation
    const genoMap = {};
    Object.entries(item).forEach(([k, v]) => {
      if (k !== '_sex' && k !== 'count' && k !== 'pct' && v.geno) {
        genoMap[k] = v.geno.split('/');
      }
    });
    const eggInfo = predictEggColor(genoMap);

    const traitTags = Object.entries(item)
      .filter(([k]) => k !== '_sex' && k !== 'count' && k !== 'pct')
      .map(([locusId, data]) => {
        const locus = getLocusById(locusId);
        const isLethal = locusId === 'Et' && data.geno === 'Et/Et';
        const tagClass = isLethal ? 'tag warn' : (locus?.isSexLinked ? 'tag sex' : 'tag');
        const icon = isLethal ? '⚠️' : '🧬';
        return `<span class="${tagClass}" title="${data.geno}">${icon} ${locusId}: ${data.pheno}</span>`;
      }).join('');

    return `
      <div class="outcome-card ${sexClass}">
        <span class="outcome-pct">${item.pct}%</span>
        <h4 class="outcome-title">${isFemale ? 'Female' : 'Male'} Offspring</h4>
        <div class="outcome-sex ${sexClass === 'female' ? 'f' : 'm'}">${sexLabel}</div>
        <div class="outcome-tags">
          <span class="tag" style="background:rgba(212,175,55,0.15); color:var(--c-gold); border-color:var(--c-gold);">🪺 ${eggInfo.label} Egg</span>
          ${traitTags}
        </div>
      </div>
    `;
  }).join('');
}

function renderPunnettGrid(punnettData) {
  const gridContainer = document.getElementById('punnett-grid-container');
  if (!gridContainer) return;

  let tableHtml = `<table class="punnett-table"><thead><tr><th>Dam ↓ \\ Sire →</th>`;
  punnettData.sireHeaders.forEach(h => {
    tableHtml += `<th>Sperm (${h})</th>`;
  });
  tableHtml += `</tr></thead><tbody>`;

  punnettData.rows.forEach(row => {
    tableHtml += `<tr><th>Egg (${row.header})</th>`;
    row.cells.forEach(cell => {
      const sexClass = cell.sex === 'F' ? 'f' : 'm';
      const sexLabel = cell.sex === 'F' ? '♀ Hen' : '♂ Rooster';
      const genos = cell.pairs.map(p => p.geno).join(' ; ');
      const phenos = cell.pairs.map(p => `${p.locusId}: ${p.pheno}`).join('<br>');

      tableHtml += `
        <td>
          <div class="cell-geno">${genos}</div>
          <div class="cell-pheno">${phenos}</div>
          <span class="cell-sex ${sexClass}">${sexLabel}</span>
        </td>
      `;
    });
    tableHtml += `</tr>`;
  });

  tableHtml += `</tbody></table>`;
  gridContainer.innerHTML = tableHtml;
}

function renderSummaryRatios(result) {
  const genotypeList = document.getElementById('genotype-ratios-list');
  if (!genotypeList) return;

  genotypeList.innerHTML = result.outcomes.map(item => {
    const genos = Object.entries(item)
      .filter(([k]) => k !== '_sex' && k !== 'count' && k !== 'pct')
      .map(([k, v]) => `${k}:${v.geno}`)
      .join(' | ');
    const sexTag = item._sex === 'F' ? '♀' : '♂';

    return `
      <div class="ratio-item">
        <div class="ratio-row">
          <span>${sexTag} ${genos}</span>
          <span>${item.pct}% (${item.count}/${result.totalCombinations})</span>
        </div>
        <div class="ratio-bar">
          <div class="ratio-fill" style="width: ${item.pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

/* ─── MUTATIONS DATABASE SHEET ─────────────────────────────────────────── */
function renderMutationsDatabase() {
  const container = document.getElementById('mutations-grid');
  const searchInput = document.getElementById('mutations-search');
  const filtersContainer = document.getElementById('category-filters');
  if (!container) return;

  // Build category filter pills
  const categories = ['ALL', ...new Set(CHICKEN_GENETICS_DATABASE.map(m => m.category))];
  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map(cat => `
      <button class="filter-pill ${cat === 'ALL' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
    `).join('');

    filtersContainer.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategoryFilter = btn.dataset.cat;
        displayItems(searchInput?.value || '');
      });
    });
  }

  function displayItems(query = '') {
    container.innerHTML = '';
    const filtered = CHICKEN_GENETICS_DATABASE.filter(m => {
      const matchesCat = activeCategoryFilter === 'ALL' || m.category === activeCategoryFilter;
      const q = query.toLowerCase();
      const matchesQuery = !query ||
        m.locusName.toLowerCase().includes(q) ||
        m.locusId.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.breedExamples && m.breedExamples.some(b => b.toLowerCase().includes(q)));
      return matchesCat && matchesQuery;
    });

    filtered.forEach(m => {
      const card = document.createElement('div');
      const isLethal = m.description.includes('LETHAL') || m.description.includes('semi-lethal') || m.alleles.some(a => a.description.includes('LETHAL'));
      card.className = `mutation-card ${isLethal ? 'warn-lethal' : ''}`;

      const breedsHtml = m.breedExamples ? `
        <div class="mutation-breeds">
          <div class="mutation-breeds-label">Notable Breed Examples</div>
          <div class="breed-tag-list">
            ${m.breedExamples.map(b => `<span class="breed-tag">${b}</span>`).join('')}
          </div>
        </div>
      ` : '';

      const allelesHtml = m.alleles.map(a => `
        <div class="allele-row">
          <span class="allele-sym">${a.symbol}</span>
          <span class="allele-txt"><strong class="allele-name">${a.name}:</strong> ${a.description}</span>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="mutation-card-header">
          <h3 class="mutation-card-title">${m.locusName}</h3>
          <span class="mutation-locus-tag">${m.locusId}</span>
        </div>
        <div class="mutation-meta">
          <span class="meta-pill">${m.chromosome}</span>
          <span class="meta-pill mode">${m.inheritanceMode}</span>
          ${m.isSexLinked ? '<span class="meta-pill sexlinked">Z-Linked</span>' : ''}
        </div>
        <p class="mutation-desc">${m.description}</p>
        ${breedsHtml}
        <div class="alleles-panel">
          ${allelesHtml}
        </div>
        ${isLethal ? '<div class="warn-banner">⚠️ Warning: Contains semi-lethal allele combinations. Exercise care when breeding.</div>' : ''}
      `;

      card.addEventListener('click', () => openModal(m));
      container.appendChild(card);
    });
  }

  displayItems();
  searchInput?.addEventListener('input', (e) => displayItems(e.target.value));
}

/* ─── PRESET CROSSES ───────────────────────────────────────────────────── */
function renderPresetCrosses() {
  const container = document.getElementById('presets-grid');
  if (!container) return;

  container.innerHTML = PRESET_BREEDING_CROSSES.map(preset => `
    <div class="preset-card">
      <div>
        <div class="preset-emoji">${preset.emoji || '🧬'}</div>
        <h3 class="preset-name">${preset.name}</h3>
        <p class="preset-desc">${preset.description}</p>
        <div class="preset-note">
          💡 <strong>Expected Outcome:</strong> ${preset.notes}
        </div>
      </div>
      <button class="preset-load-btn" data-id="${preset.id}">Load Breeding Cross into Studio</button>
    </div>
  `).join('');

  container.querySelectorAll('.preset-load-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.dataset.id;
      const preset = PRESET_BREEDING_CROSSES.find(p => p.id === presetId);
      if (!preset) return;

      currentSelectedLoci = [...preset.loci];
      sireGenotypeState = JSON.parse(JSON.stringify(preset.sireGenotype));
      damGenotypeState = JSON.parse(JSON.stringify(preset.damGenotype));

      // Switch to studio tab
      document.querySelector('[data-tab="studio"]')?.click();
      renderLocusSelector();
      renderParentSelectors();
      runCalculator();

      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  });
}

/* ─── GENE PREVIEW MODAL ───────────────────────────────────────────────── */
function openModal(gene) {
  const modal = document.getElementById('gene-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  let swatchHtml = '';
  if (gene.locusId === 'Bl') {
    swatchHtml = `<div class="pheno-swatch" style="background: linear-gradient(90deg, #1A202C 33%, #4A5568 33% 66%, #C8D6E5 66%); color:#fff; text-shadow:0 1px 3px #000;">Black (bl+/bl+) | Slate Blue (Bl/bl+) | Splash (Bl/Bl)</div>`;
  } else if (gene.locusId === 'Fm') {
    swatchHtml = `<div class="pheno-swatch" style="background: #111116; color:var(--c-gold); border-color:var(--c-gold);">Ayam Cemani / Fibromelanosis (Hyper-pigmented Black Skin & Organs)</div>`;
  } else if (gene.locusId === 'O') {
    swatchHtml = `<div class="pheno-swatch" style="background: #A0C8E0; color:#1A365D;">Sky Blue / Turquoise Egg Shell (SLCO1B3 Biliverdin Pigment)</div>`;
  } else {
    swatchHtml = `<div class="pheno-swatch" style="background: var(--c-surface-2); color:var(--c-gold);">${gene.locusName} (${gene.locusId})</div>`;
  }

  modalContent.innerHTML = `
    ${swatchHtml}
    <h2 style="font-family:var(--font-h); color:var(--c-gold); margin-bottom:0.4rem;">${gene.locusName} (${gene.locusId})</h2>
    <div style="font-size:0.85rem; color:var(--c-amber); margin-bottom:1rem; font-weight:600;">${gene.chromosome} • ${gene.inheritanceMode} • ${gene.category}</div>
    <p style="font-size:0.95rem; color:var(--c-parch); line-height:1.6; margin-bottom:1.25rem;">${gene.description}</p>

    <h4 style="font-family:var(--font-h); color:var(--c-parch); margin-bottom:0.5rem;">Allele Series</h4>
    <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.25rem;">
      ${gene.alleles.map(a => `
        <div style="background:rgba(13,17,23,0.6); padding:0.6rem 0.8rem; border-radius:var(--r-md); border:1px solid var(--c-border);">
          <span style="color:var(--c-gold); font-weight:700; font-size:0.9rem;">${a.symbol} (${a.name}):</span>
          <span style="color:var(--c-muted); font-size:0.85rem;"> ${a.description}</span>
        </div>
      `).join('')}
    </div>

    ${gene.breedExamples ? `
      <h4 style="font-family:var(--font-h); color:var(--c-parch); margin-bottom:0.5rem;">Breed Examples</h4>
      <p style="font-size:0.88rem; color:var(--c-teal-l);">${gene.breedExamples.join(' • ')}</p>
    ` : ''}
  `;

  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('gene-modal');
  if (modal) modal.style.display = 'none';
}
