const API_URL = 'https://rickandmortyapi.com/api/character';
const FAVORITES_KEY = 'rick-morty-favorites';

const state = {
  characters: [],
  currentPage: 1,
  totalPages: 1,
  showFavorites: false,
  favorites: loadFavorites()
};

const elements = {
  grid: document.querySelector('#characters-grid'),
  status: document.querySelector('#status-message'),
  count: document.querySelector('#results-count'),
  search: document.querySelector('#search-input'),
  statusFilter: document.querySelector('#status-filter'),
  speciesFilter: document.querySelector('#species-filter'),
  favoritesToggle: document.querySelector('#favorites-toggle'),
  clearFilters: document.querySelector('#clear-filters'),
  pagination: document.querySelector('#pagination')
};

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch (error) {
    console.warn('No se pudieron leer los favoritos:', error);
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
}

function setMessage(message = '', isError = false) {
  elements.status.textContent = message;
  elements.status.classList.toggle('error', isError);
}

async function fetchCharacters(page = 1) {
  const params = new URLSearchParams({ page });
  const name = elements.search.value.trim();
  const status = elements.statusFilter.value;
  const species = elements.speciesFilter.value;
  if (name) params.set('name', name);
  if (status) params.set('status', status);
  if (species) params.set('species', species);

  setMessage('Cargando personajes...');
  elements.grid.innerHTML = '';

  try {
    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) throw new Error(response.status === 404 ? 'No se encontraron resultados.' : 'La API devolvió un error.');
    const data = await response.json();
    state.characters = data.results;
    state.currentPage = page;
    state.totalPages = data.info.pages;
    renderCharacters();
    renderPagination();
    setMessage('');
  } catch (error) {
    state.characters = [];
    state.totalPages = 1;
    elements.pagination.innerHTML = '';
    const message = error instanceof TypeError ? 'Problema de red. Comprueba tu conexión e inténtalo de nuevo.' : error.message;
    setMessage(message, true);
    renderCharacters();
  }
}

function renderCharacters() {
  const visibleCharacters = state.showFavorites
    ? state.characters.filter((character) => state.favorites.includes(character.id))
    : state.characters;

  elements.count.textContent = `${visibleCharacters.length} personaje${visibleCharacters.length === 1 ? '' : 's'} mostrado${visibleCharacters.length === 1 ? '' : 's'}`;

  if (!visibleCharacters.length) {
    elements.grid.innerHTML = `<div class="empty-state">${state.showFavorites ? 'Todavía no tienes favoritos en esta página.' : 'No hay personajes que coincidan con tu búsqueda.'}</div>`;
    return;
  }

  elements.grid.innerHTML = visibleCharacters.map(createCharacterCard).join('');
  elements.grid.querySelectorAll('[data-favorite-id]').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(Number(button.dataset.favoriteId)));
  });
}

function createCharacterCard(character) {
  const isFavorite = state.favorites.includes(character.id);
  const status = character.status.toLowerCase();
  return `<article class="character-card">
    <div class="character-image-wrap">
      <img class="character-image" src="${character.image}" alt="${character.name}" loading="lazy">
      <button class="favorite-button ${isFavorite ? 'is-favorite' : ''}" type="button" data-favorite-id="${character.id}" aria-label="${isFavorite ? 'Quitar' : 'Añadir'} ${character.name} ${isFavorite ? 'de' : 'a'} favoritos" aria-pressed="${isFavorite}">${isFavorite ? '★' : '☆'}</button>
    </div>
    <div class="card-body">
      <h3>${character.name}</h3>
      <p class="card-meta"><span class="status-dot ${status}"></span>${character.status} · ${character.species}</p>
      <p class="card-meta">Última ubicación: ${character.location.name}</p>
    </div>
  </article>`;
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((favoriteId) => favoriteId !== id)
    : [...state.favorites, id];
  saveFavorites();
  renderCharacters();
}

function renderPagination() {
  elements.pagination.innerHTML = `
    <button class="button button-ghost" type="button" data-page="${state.currentPage - 1}" ${state.currentPage === 1 ? 'disabled' : ''}>Anterior</button>
    <button class="button button-ghost" type="button" data-page="${state.currentPage + 1}" ${state.currentPage === state.totalPages ? 'disabled' : ''}>Siguiente</button>`;
  elements.pagination.querySelectorAll('[data-page]').forEach((button) => {
    button.addEventListener('click', () => fetchCharacters(Number(button.dataset.page)));
  });
}

function populateSpecies() {
  // La API no ofrece un catálogo de especies; estas son las más habituales.
  ['Alien', 'Animal', 'Human', 'Humanoid', 'Robot'].forEach((species) => {
    const option = document.createElement('option');
    option.value = species;
    option.textContent = species;
    elements.speciesFilter.append(option);
  });
}

let searchTimeout;
function handleFilterChange() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => fetchCharacters(1), 350);
}

elements.search.addEventListener('input', handleFilterChange);
elements.statusFilter.addEventListener('change', () => fetchCharacters(1));
elements.speciesFilter.addEventListener('change', () => fetchCharacters(1));
elements.favoritesToggle.addEventListener('click', () => {
  state.showFavorites = !state.showFavorites;
  elements.favoritesToggle.setAttribute('aria-pressed', state.showFavorites);
  renderCharacters();
});
elements.clearFilters.addEventListener('click', () => {
  elements.search.value = '';
  elements.statusFilter.value = '';
  elements.speciesFilter.value = '';
  state.showFavorites = false;
  elements.favoritesToggle.setAttribute('aria-pressed', 'false');
  fetchCharacters(1);
});

populateSpecies();
fetchCharacters();
