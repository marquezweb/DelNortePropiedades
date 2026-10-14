(() => {
  const numbers = { alquilar: '5492964617729', comprar: '5492964610103', tasar: '5492964610103', administrar: '5492964478802', renovar: '5492964478765', otro: '5492964610103' };
  const prepareWhatsAppURL = ({ name, phone, interest, interestText, fields = [], message, number }) => {
    const clean = value => String(value || '').trim();
    const parts = [`Hola, soy ${clean(name)}.`, `Teléfono de contacto: ${clean(phone)}.`];
    if (clean(interestText)) parts.push(`Consulta: ${clean(interestText)}.`);
    fields.forEach(({ label, value }) => { if (clean(value)) parts.push(`${label}: ${clean(value)}.`); });
    if (clean(message)) parts.push(clean(message));
    const url = new URL(`https://wa.me/${number || numbers[interest] || numbers.otro}`);
    url.searchParams.set('text', parts.join('\n'));
    return url.toString();
  };
  globalThis.DelNorteContact = { prepareWhatsAppURL };

  const floatingContact = document.querySelector('.floating-contact');
  if (floatingContact) {
    const syncFloatingContact = () => {
      const params = new URLSearchParams(location.search);
      let number = numbers.otro;
      let message = 'Hola, estoy viendo la web de Del Norte Propiedades y quisiera recibir asesoramiento para encontrar una propiedad.';
      if (location.pathname.endsWith('catalogo.html')) {
        const renting = params.get('operacion') === 'alquiler';
        number = renting ? numbers.alquilar : numbers.comprar;
        message = renting
          ? 'Hola, vi las propiedades en alquiler en la web de Del Norte Propiedades. Quisiera recibir más información y conocer los requisitos para alquilar.'
          : 'Hola, vi las propiedades en venta en la web de Del Norte Propiedades. Quisiera recibir más información y asesoramiento para comprar.';
      } else if (location.pathname.endsWith('desarrollos.html')) {
        const category = params.get('categoria') === 'pozo' ? 'pozo' : 'terrenos';
        const projects = (globalThis.DelNorteDevelopments || []).filter(project => project.category === category);
        const project = projects.find(item => item.id === params.get('id')) || (projects.length === 1 ? projects[0] : null);
        message = project
          ? `Hola, vi el proyecto ${project.name} en la web de Del Norte Propiedades. Quisiera recibir información sobre ${category === 'pozo' ? 'las unidades' : 'los terrenos'}, precios y financiación.`
          : `Hola, vi la sección de ${category === 'pozo' ? 'edificios en pozo' : 'terrenos y loteos'} en la web de Del Norte Propiedades. Quisiera recibir información sobre las opciones y la financiación.`;
      } else if (location.pathname.endsWith('servicios.html')) {
        const administration = location.hash === '#administracion';
        number = administration ? numbers.administrar : numbers.tasar;
        message = administration
          ? 'Hola, vi el servicio de administración en la web de Del Norte Propiedades. Quisiera conversar sobre la administración de mi inmueble.'
          : 'Hola, vi el servicio de tasaciones en la web de Del Norte Propiedades. Quisiera consultar por la tasación de mi inmueble.';
      } else if (location.hash === '#propietarios') {
        message = 'Hola, vi la web de Del Norte Propiedades. Quisiera conversar sobre la venta o el alquiler de mi propiedad.';
      }
      const url = new URL(`https://wa.me/${number}`);
      url.searchParams.set('text', message);
      floatingContact.href = url.toString();
    };
    syncFloatingContact();
    floatingContact.addEventListener('click', syncFloatingContact);
    window.addEventListener('hashchange', syncFloatingContact);
    document.addEventListener('click', event => {
      if (event.target.closest('button[data-operation]')) syncFloatingContact();
    });
  }

  const menuToggle = document.querySelector('#menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  const closeMenu = () => {
    navigation?.classList.remove('mobile-open');
    navigation?.querySelectorAll('details[open]').forEach(group => group.removeAttribute('open'));
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir navegación');
  };
  menuToggle?.addEventListener('click', () => {
    if (navigation.classList.contains('mobile-open')) { closeMenu(); return; }
    navigation.classList.add('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar navegación');
  });
  navigation?.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const wasOpen = navigation?.classList.contains('mobile-open');
    closeMenu();
    if (wasOpen) menuToggle?.focus();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width:1024px)').addEventListener('change', closeMenu);

  const header = document.querySelector('.site-header');
  if (header) {
    const syncDepth = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    syncDepth();
    window.addEventListener('scroll', syncDepth, { passive: true });
  }

  const hero = document.querySelector('[data-hero-carousel]');
  const heroFrame = hero?.querySelector('.hero-image');
  const heroImage = heroFrame?.querySelector('img');
  if (heroImage && heroFrame && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const slides = [
      {
        src: 'assets/oficina-1440.webp',
        srcset: 'assets/oficina-768.webp 768w, assets/oficina-1440.webp 1440w',
        alt: 'Frente de la oficina de Del Norte Propiedades y su cartel en Ushuaia 536, Río Grande',
        objectPosition: '100% 60%'
      },
      {
        src: 'assets/oficina-cartel-1440.webp',
        srcset: 'assets/oficina-cartel-768.webp 768w, assets/oficina-cartel-1440.webp 1440w',
        alt: 'Cartel de Del Norte Propiedades junto al frente de la oficina en Río Grande',
        objectPosition: '100% 58%'
      },
      {
        src: 'assets/oficina-frente-1440.webp',
        srcset: 'assets/oficina-frente-768.webp 768w, assets/oficina-frente-1440.webp 1440w',
        alt: 'Frente de la oficina de Del Norte Propiedades en Río Grande, con su acceso y fachada',
        objectPosition: '52% 56%'
      }
    ];
    const overlay = heroImage.cloneNode();
    overlay.removeAttribute('fetchpriority');
    overlay.alt = '';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.add('hero-carousel-layer');
    heroImage.classList.add('hero-carousel-layer', 'is-active');
    heroFrame.append(overlay);
    let activeSlide = 0;
    let visibleLayer = heroImage;
    let incomingLayer = overlay;
    window.setInterval(() => {
      if (document.hidden) return;
      const nextSlide = (activeSlide + 1) % slides.length;
      const slide = slides[nextSlide];
      const preloaded = new Image();
      preloaded.sizes = heroImage.sizes;
      preloaded.srcset = slide.srcset;
      preloaded.onload = () => {
        incomingLayer.src = slide.src;
        incomingLayer.srcset = slide.srcset;
        incomingLayer.alt = slide.alt;
        incomingLayer.style.objectPosition = slide.objectPosition;
        incomingLayer.removeAttribute('aria-hidden');
        requestAnimationFrame(() => {
          visibleLayer.classList.remove('is-active');
          visibleLayer.alt = '';
          visibleLayer.setAttribute('aria-hidden', 'true');
          incomingLayer.classList.add('is-active');
          [visibleLayer, incomingLayer] = [incomingLayer, visibleLayer];
          activeSlide = nextSlide;
        });
      };
      preloaded.src = slide.src;
    }, 5000);
  }

  document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
    const ready = document.createElement('p');
    ready.className = 'whatsapp-ready';
    ready.setAttribute('role', 'status');
    ready.hidden = true;
    const readyLink = document.createElement('a');
    readyLink.className = 'text-link';
    readyLink.textContent = 'Tu consulta está lista. Abrir WhatsApp';
    readyLink.target = '_blank';
    readyLink.rel = 'noopener noreferrer';
    ready.append(readyLink);
    form.append(ready);
    form.addEventListener('input', event => {
      event.target.setCustomValidity?.('');
      ready.hidden = true;
      readyLink.removeAttribute('href');
    });
    form.addEventListener('change', () => { ready.hidden = true; readyLink.removeAttribute('href'); });
    form.addEventListener('submit', event => {
      event.preventDefault();
      for (const input of form.querySelectorAll('input[required]')) {
        input.value = input.value.trim();
        input.setCustomValidity(input.value.length < 2 ? 'Completá este campo.' : '');
      }
      const phone = form.querySelector('input[name="phone"]');
      if (phone) {
        const digits = phone.value.replace(/\D/g, '');
        if (digits.length < 6 || digits.length > 18 || !/^[+\d\s().-]+$/.test(phone.value)) {
          phone.setCustomValidity('Ingresá un teléfono válido con código de área.');
        }
      }
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const interest = form.querySelector('select[name="interest"]');
      const interestText = interest?.selectedOptions?.[0]?.textContent?.trim();
      const url = prepareWhatsAppURL({
        name: data.get('name'), phone: data.get('phone'), interest: data.get('interest'), interestText,
        fields: Array.from(form.querySelectorAll('[data-message-field]'), field => ({ label: field.dataset.messageField, value: data.get(field.name) })),
        message: data.get('message'), number: form.dataset.whatsappNumber
      });
      readyLink.href = url;
      ready.hidden = false;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
})();
