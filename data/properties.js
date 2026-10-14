(() => {
  // El registro conserva datos, fotos, fuente y estado de publicación por separado.
  // Las fichas cerradas o con datos contradictorios quedan fuera de los catálogos públicos.
  const photoPaths = (date, id, count) => Array.from({ length: count }, (_, index) =>
    `imagenes/delnorte.propiedades/${date}_${id}/delnorte.propiedades_${id}_${index}.jpg`);
  const sourceFor = id => `https://www.instagram.com/p/${id}/`;

  const properties = [
    {
      id: 'DYAMViQgJsY', publishedAt: '2026-05-06', title: 'Casa en Barrio Aeropuerto',
      operation: 'venta', type: 'casas', city: 'rio-grande', neighborhood: 'Barrio Aeropuerto',
      address: 'Barrio Aeropuerto, Río Grande', bedrooms: 3, bathrooms: 2,
      area: 110, areaLabel: '110 m² construidos', lotArea: 200, price: 93000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Precio rebajado de US$ 110.000 a US$ 93.000 según la publicación.',
      summary: 'Casa unifamiliar de mampostería revestida en lenga, sobre un lote de 200 m².',
      features: ['Tres dormitorios', 'Dos baños completos', 'Living luminoso y cocina-comedor amplia', 'Lavadero independiente', 'Patio libre y entrada para vehículo', 'Calefacción por caldera y radiadores', 'Apta crédito hipotecario según la publicación'],
      conditions: 'Precio publicado más gastos de comisión inmobiliaria y escritura.',
      whatsapp: '5492964610103', cardPhotoIndex: 0, heroPhotoIndex: 0,
      cardPhotoAlt: 'Fachada de madera de la casa en Barrio Aeropuerto',
      heroPhotoAlt: 'Fachada de madera de la casa en Barrio Aeropuerto',
      photos: photoPaths('2026-05-06', 'DYAMViQgJsY', 10)
    },
    {
      id: 'DeaME7gGqCx', publishedAt: '2026-10-12', title: 'Dúplex en Barrio Mutual',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Houssay, entre Buenos Aires y Av. Santa Fe', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: 57, areaLabel: '57 m² cubiertos', uncoveredArea: 24, price: 85000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Dúplex de dos plantas con dos dormitorios, patio trasero y espacio para estacionar.',
      features: ['24 m² descubiertos', 'Cocina con amoblamientos Johnson', 'Baño en planta alta y toilette en planta baja', 'Conexión para lavarropas', 'Patio delantero y trasero', 'Calefacción por caldera y radiadores', 'Tanque de reserva de agua y bomba', 'Apto crédito hipotecario según la publicación'],
      conditions: 'Precio publicado más gastos de comisión inmobiliaria y escritura.',
      whatsapp: '5492964610103', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del dúplex en Barrio Mutual',
      photos: photoPaths('2026-10-12', 'DeaME7gGqCx', 16)
    },
    {
      id: 'DeIXru5mncY', publishedAt: '2026-10-05', title: 'Dúplex sobre calle Entre Ríos',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Entre Ríos, a pasos de la bicisenda', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: 92, areaLabel: '92 m² cubiertos', semiCoveredArea: 13.86, lotArea: 116,
      price: 100000, currency: 'USD', availabilityStatus: 'rented', publicListing: false,
      occupancy: 'Alquilado hasta el 30/06/2027 según la publicación.',
      summary: 'Dúplex con living con hogar a leña, quincho/lavadero con parrilla y entrada techada.',
      features: ['Dos dormitorios con placard', '13,86 m² semicubiertos', 'Terreno de 116 m²', 'Baño completo y toilette', 'Cocina y comedor', 'Patio interno'],
      conditions: 'La publicación indica que está alquilado hasta el 30/06/2027.',
      whatsapp: '5492964610103', cardPhotoIndex: 0,
      photos: photoPaths('2026-10-05', 'DeIXru5mncY', 12)
    },
    {
      id: 'DeIJre_muqb', publishedAt: '2026-10-05', title: 'Casa en Barrio Las Barrancas',
      operation: 'venta', type: 'casas', city: 'rio-grande', neighborhood: 'Las Barrancas',
      address: 'Barrio Las Barrancas', bedrooms: 3, bathrooms: 2,
      area: 130, areaLabel: '130 m² construidos', lotArea: 237, price: 170000, currency: 'USD',
      availabilityStatus: 'rented', publicListing: false,
      occupancy: 'Actualmente alquilada según la publicación.',
      summary: 'Casa de dos plantas con living-comedor, cocina, lavadero y patio amplio.',
      features: ['Tres dormitorios', 'Dos baños, uno con ducha', 'Depósito bajo escalera', 'Portón y entrada para vehículo', 'Calefacción por caldera y radiadores', 'Aberturas de PVC', 'Apta crédito hipotecario según la publicación'],
      conditions: 'La publicación indica que está alquilada.',
      whatsapp: '5492964610103', cardPhotoIndex: 4,
      photos: photoPaths('2026-10-05', 'DeIJre_muqb', 16)
    },
    {
      id: 'DeH7lENGoxL', publishedAt: '2026-10-05', title: 'Publicación en revisión',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: '',
      address: '', bedrooms: null, bathrooms: null, area: null, areaLabel: '', price: null, currency: 'ARS',
      availabilityStatus: 'review-pending', publicListing: false,
      occupancy: 'La descripción de Instagram y las fotos locales no coinciden con claridad. Dirección y tipo de inmueble pendientes de verificar.',
      summary: '', features: [], conditions: '', whatsapp: '5492964617729',
      photos: photoPaths('2026-10-05', 'DeH7lENGoxL', 10)
    },
    {
      id: 'DVzC9oKjzON', publishedAt: '2026-03-12', title: 'Publicación en revisión',
      operation: null, type: null, city: null, neighborhood: '', address: '',
      bedrooms: null, bathrooms: null, area: null, areaLabel: '', price: null, currency: 'ARS',
      availabilityStatus: 'review-pending', publicListing: false,
      occupancy: 'Las fotos locales muestran un cartel de ALQUILA y la dirección Alfredo Gálvez 542, Depto. 5; la información pegada la identifica como VENTA. Verificar que las fotos correspondan a esta publicación antes de usarla.',
      summary: '', features: [], conditions: '', whatsapp: '5492964617729',
      photos: photoPaths('2026-03-12', 'DVzC9oKjzON', 15)
    },
    {
      id: 'DdXRi7gGlfa', publishedAt: '2026-09-16', title: 'Departamento en Belgrano y San Martín',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: '',
      address: 'Av. Belgrano esquina Av. San Martín', bedrooms: 2, bathrooms: 1,
      area: null, areaLabel: '', price: 900000, currency: 'ARS', priceNote: '+ expensas',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Departamento en primer piso, al frente, con dos dormitorios.',
      features: ['Dos dormitorios con placard', 'Cocina con barra y living-comedor', 'Baño completo', 'Lavandería en el edificio'],
      conditions: 'La publicación indica contrato por dos años, ajuste semestral por IPC y expensas, luz, gas y seguro contra incendio aparte.',
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del edificio en Belgrano y San Martín',
      photos: photoPaths('2026-09-16', 'DdXRi7gGlfa', 8)
    },
    {
      id: 'DczHePGmjeT', publishedAt: '2026-09-02', title: 'Departamentos en Barrio Buenavista',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: 'Barrio Buenavista',
      address: 'Gálvez al 500', bedrooms: 1, bathrooms: 1,
      area: null, areaLabel: '', price: 700000, currency: 'ARS', priceNote: 'sin expensas',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Departamentos en primer piso, con cocina con barra y living-comedor, en Barrio Buenavista.',
      features: ['Un dormitorio con placard', 'Baño completo con ducha y mampara', 'Cocina con barra', 'Living-comedor', 'Ubicados en primer piso', 'Sin expensas', 'No se aceptan mascotas'],
      conditions: 'Contrato por un año, con aumento a los seis meses por índice IPC. Luz y gas se abonan aparte. No se aceptan mascotas.',
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del edificio de departamentos en Gálvez al 500, Barrio Buenavista',
      photos: photoPaths('2026-09-02', 'DczHePGmjeT', 8)
    }
  ].map(property => ({ ...property, source: sourceFor(property.id) }));

  const formatPrice = property => {
    if (property.price == null) return 'Consultar precio';
    const currency = property.currency === 'USD' ? 'USD' : '$';
    return `${currency} ${new Intl.NumberFormat('es-AR').format(property.price)}${property.priceNote ? ` ${property.priceNote}` : ''}`;
  };
  const formatDate = date => date ? new Intl.DateTimeFormat('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'
  }).format(new Date(`${date}T12:00:00Z`)) : 'fecha no informada';
  const isPublicOpportunity = property => property.publicListing && ['confirmed', 'pending-confirmation'].includes(property.availabilityStatus);

  function filterProperties(items, { operation = 'todas', type = 'todas', city = 'todas', bedrooms = 'todos', confirmedOnly = false } = {}) {
    return items.filter(property =>
      isPublicOpportunity(property) &&
      (operation === 'todas' || property.operation === operation) &&
      (type === 'todas' || property.type === type) &&
      (city === 'todas' || property.city === city) &&
      (bedrooms === 'todos' || property.bedrooms === Number(bedrooms)) &&
      (!confirmedOnly || property.availabilityStatus === 'confirmed')
    ).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  globalThis.DelNorteCatalog = { properties, formatPrice, formatDate, filterProperties, isPublicOpportunity };
})();
