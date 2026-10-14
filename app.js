(() => {
  const catalog = globalThis.DelNorteCatalog;
  if (!catalog) return;

  const { properties, formatPrice, formatDate, filterProperties, isPublicOpportunity } = catalog;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const icon = name => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
  const imageVariant = (path, width) => `assets/properties/${path.split('/').pop().replace(/\.jpg$/i, '')}-${width}.webp`;
  const cityName = property => property.city === 'rio-grande' ? 'Río Grande' : property.city;
  const priceMarkup = property => property.price == null
    ? 'Consultar precio'
    : `<span class="price-currency">${property.currency === 'USD' ? 'USD' : '$'}</span><span class="price-amount">${new Intl.NumberFormat('es-AR').format(property.price)}</span>${property.priceNote ? `<span class="price-suffix">${escapeHTML(property.priceNote)}</span>` : ''}`;

  function propertyCard(property, featured = false) {
    const operation = property.operation === 'alquiler' ? 'Alquiler' : 'Venta';
    const imageIndex = property.cardPhotoIndex ?? 0;
    const specs = [property.area != null ? `${new Intl.NumberFormat('es-AR').format(property.area)} m²` : property.areaLabel, property.bedrooms ? `${property.bedrooms} dorm.` : '', property.bathrooms ? `${property.bathrooms} ${property.bathrooms === 1 ? 'baño' : 'baños'}${property.toilets ? ' + toilette' : ''}` : ''].filter(Boolean);
    return `<article class="property-card ${featured ? 'property-card-featured' : ''}" data-property="${escapeHTML(property.id)}" data-card-operation="${escapeHTML(property.operation)}">
      <div class="property-photo">
        <button type="button" class="photo-button" data-detail="${escapeHTML(property.id)}" aria-label="Ver fotos de ${escapeHTML(property.title)}">
          <img src="${escapeHTML(imageVariant(property.photos[imageIndex], 1280))}" srcset="${escapeHTML(imageVariant(property.photos[imageIndex], 640))} 640w, ${escapeHTML(imageVariant(property.photos[imageIndex], 1280))} 1280w" sizes="${featured ? '(max-width: 767px) 100vw, 33vw' : '(max-width: 639px) 100vw, 50vw'}" alt="${escapeHTML(property.cardPhotoAlt || `Foto de ${property.title}`)}" loading="lazy" decoding="async" width="1280" height="1280">
        </button>
      </div>
      <div class="property-body">
        <div class="property-caption"><span class="property-operation-badge">${operation}</span><span class="property-location">${escapeHTML([property.neighborhood, cityName(property)].filter(Boolean).join(' · '))}</span></div>
        <h3 class="property-title"><button type="button" data-detail="${escapeHTML(property.id)}">${escapeHTML(property.title)}</button></h3>
        ${specs.length ? `<p class="property-specs">${specs.map(spec => `<span>${escapeHTML(spec)}</span>`).join('')}</p>` : ''}
        <div class="property-footer-wrap"><div class="property-footer"><span class="property-price">${priceMarkup(property)}</span><button class="card-button" type="button" data-detail="${escapeHTML(property.id)}">Ver propiedad <span class="card-arrow" aria-hidden="true">↗</span></button></div></div>
      </div>
    </article>`;
  }

  function renderFeatured() {
    const grid = document.querySelector('#featured-properties');
    if (!grid) return;
    const featured = (globalThis.DelNorteFeatured || [])
      .map(id => properties.find(property => property.id === id))
      .filter(property => property && isPublicOpportunity(property))
      .slice(0, 4);
    grid.innerHTML = featured.length ? featured.map(property => propertyCard(property, true)).join('') : '<p class="empty-results">No hay propiedades destacadas.</p>';
    const selectionCopy = document.querySelector('#selection-copy');
    if (selectionCopy) selectionCopy.textContent = 'Explorá nuestra selección de ventas y alquileres.';
  }

  const grid = document.querySelector('#property-grid');
  const search = document.querySelector('#property-search');
  const state = {
    operation: new URLSearchParams(location.search).get('operacion') === 'alquiler' ? 'alquiler' : 'venta',
    type: 'todas', city: 'todas', bedrooms: 'todos'
  };

  function renderCatalog() {
    if (!grid) return;
    const filtered = filterProperties(properties, state);
    grid.innerHTML = filtered.length
      ? filtered.map(property => propertyCard(property)).join('')
      : `<div class="empty-results"><h3>No hay publicaciones para estos filtros</h3><p>Probá con otra búsqueda o consultanos por otras opciones.</p><button type="button" class="card-button" data-reset>Limpiar filtros ${icon('arrow_forward')}</button></div>`;
    const count = document.querySelector('#result-count');
    if (count) {
      count.textContent = `${filtered.length} ${filtered.length === 1 ? 'publicación' : 'publicaciones'}`;
    }
    const title = document.querySelector('#catalog-title');
    if (title) title.innerHTML = `Propiedades en <span class="headline-accent">${state.operation === 'alquiler' ? 'alquiler.' : 'venta.'}</span>`;
    document.querySelectorAll('[data-operation]').forEach(button => {
      const active = button.dataset.operation === state.operation;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function resetFilters() {
    state.type = 'todas'; state.city = 'todas'; state.bedrooms = 'todos';
    search?.reset();
    renderCatalog();
  }

  document.addEventListener('click', event => {
    const operationButton = event.target.closest('[data-operation]');
    if (operationButton) {
      state.operation = operationButton.dataset.operation;
      const url = new URL(location.href);
      url.searchParams.set('operacion', state.operation);
      history.replaceState(null, '', url);
      if (!operationButton.closest('#catalog-tabs')) resetFilters();
      renderCatalog();
    }
    if (event.target.closest('#clear-filters, [data-reset]')) resetFilters();
    const detail = event.target.closest('[data-detail]');
    if (detail) openProperty(detail.dataset.detail);
  });

  search?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(search);
    Object.assign(state, { type: form.get('type'), city: form.get('city'), bedrooms: form.get('bedrooms') });
    renderCatalog();
  });
  const dialog = document.querySelector('#property-dialog');
  let selectedProperty;
  let photoIndex = 0;
  let previousFocus;

  function updateGallery() {
    if (!selectedProperty) return;
    const image = document.querySelector('#gallery-image');
    image.src = selectedProperty.photos[photoIndex];
    image.alt = `${selectedProperty.title} · fotografía ${photoIndex + 1} de ${selectedProperty.photos.length}`;
    document.querySelector('#gallery-count').textContent = `Foto ${photoIndex + 1} de ${selectedProperty.photos.length}`;
    document.querySelectorAll('[data-photo]').forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.photo) === photoIndex)));
  }

  function openProperty(id) {
    if (!dialog) return;
    selectedProperty = properties.find(property => property.id === id && isPublicOpportunity(property));
    if (!selectedProperty) return;
    photoIndex = 0; previousFocus = document.activeElement;
    const property = selectedProperty;
    const facts = [
      property.area != null ? `<div><strong>${property.area} m²</strong><span>${escapeHTML(property.areaLabel.replace(/^[\d.,]+ m²\s*/, '') || 'superficie publicada')}</span></div>` : '',
      property.bedrooms ? `<div><strong>${property.bedrooms}</strong><span>${property.bedrooms === 1 ? 'Dormitorio' : 'Dormitorios'}</span></div>` : '',
      property.bathrooms ? `<div><strong>${property.bathrooms}${property.toilets ? ' + 1' : ''}</strong><span>${property.toilets ? 'Baño + toilette' : property.bathrooms === 1 ? 'Baño' : 'Baños'}</span></div>` : ''
    ].filter(Boolean).join('');
    const address = property.address ? `<p class="detail-address">${escapeHTML(property.address)} · ${cityName(property)}</p>` : '';
    const features = property.features.length ? `<h3>Características publicadas</h3><ul>${property.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join('')}</ul>` : '';
    const inquiry = `Hola, me interesa ${property.title}. ¿Me comparten más información? ${property.source}`;
    document.querySelector('#detail-content').innerHTML = `
      <span class="detail-eyebrow"><span class="brand-dot"></span>${property.operation === 'alquiler' ? 'Alquiler' : 'Venta'}</span>
      <h2 id="detail-title">${escapeHTML(property.title)}</h2>${address}
      <p class="detail-price">${escapeHTML(formatPrice(property))}</p>
      ${property.occupancy ? `<p class="detail-occupancy">${escapeHTML(property.occupancy)}</p>` : ''}
      ${facts ? `<div class="detail-facts">${facts}</div>` : ''}
      <p class="detail-summary">${escapeHTML(property.summary)}</p>${features}
      ${property.conditions ? `<p class="detail-conditions">${escapeHTML(property.conditions)}</p>` : ''}
      <a class="detail-contact" href="https://wa.me/${property.whatsapp}?text=${encodeURIComponent(inquiry)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp ${icon('arrow_forward')}</a>
      <p class="detail-source">Fuente: <a href="${property.source}" target="_blank" rel="noopener noreferrer">publicación de Instagram del ${formatDate(property.publishedAt)}</a>.</p>`;
    document.querySelector('#gallery-thumbnails').innerHTML = property.photos.map((src, index) => `<button type="button" data-photo="${index}" aria-label="Ver foto ${index + 1}" aria-current="${index === photoIndex}"><img src="${escapeHTML(imageVariant(src, 160))}" alt="" loading="lazy" width="64" height="64"></button>`).join('');
    updateGallery();
    document.body.classList.add('dialog-open');
    dialog.showModal();
    document.querySelector('#detail-close').focus();
  }

  if (dialog) {
    document.querySelector('#detail-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      }
      const thumbnail = event.target.closest('[data-photo]');
      if (thumbnail) { photoIndex = Number(thumbnail.dataset.photo); updateGallery(); }
    });
    const movePhoto = direction => {
      if (!selectedProperty) return;
      photoIndex = (photoIndex + direction + selectedProperty.photos.length) % selectedProperty.photos.length;
      updateGallery();
    };
    document.querySelector('#gallery-prev')?.addEventListener('click', () => movePhoto(-1));
    document.querySelector('#gallery-next')?.addEventListener('click', () => movePhoto(1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
    });
    dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); previousFocus?.focus(); });
  }

  renderFeatured();
  renderCatalog();
})();
