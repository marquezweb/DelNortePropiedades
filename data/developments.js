globalThis.DelNorteDevelopments = [
  {
    id: 'altos-de-la-estancia', category: 'terrenos', name: 'Altos de la Estancia',
    city: null, description: 'Desarrollo mencionado en las publicaciones de Del Norte Propiedades.',
    facts: [], source: null, verification: 'Características y condiciones del desarrollo a confirmar.'
  },
  {
    id: 'las-barrancas-ii', category: 'terrenos', name: 'Las Barrancas II',
    city: 'Río Grande', address: 'A 2 cuadras de la Ruta 3',
    description: 'Lotes residenciales y unifamiliares con servicios, en uno de los barrios de Río Grande.',
    facts: ['Lotes residenciales y unifamiliares desde 242 m²', 'Dos lotes con orientación hacia el mar', 'Agua y cloaca', 'Luz y gas'],
    priceFrom: 23750, currency: 'USD', financedFrom: 25000,
    financing: ['Entrega inicial del 25%: USD 6.250', 'Saldo en 18 cuotas fijas en dólares'],
    image: 'imagenes/delnorte.propiedades/2026-08-18_DcMiHEUml8T/delnorte.propiedades_DcMiHEUml8T_0.jpg',
    imageAlt: 'Vista aérea de los lotes de Las Barrancas II con orientación hacia el mar',
    photos: [
      { index: 0, label: 'Vista aérea · Lote con orientación al mar' },
      { index: 1, label: 'Vista aérea · Lotes y costa' },
      { index: 2, label: 'Vista del barrio y la costa' },
      { index: 3, label: 'Vista hacia el mar' },
      { index: 4, label: 'Vista aérea · Lotes y parcelas' }
    ].map(photo => ({ ...photo, src: `imagenes/delnorte.propiedades/2026-08-18_DcMiHEUml8T/delnorte.propiedades_DcMiHEUml8T_${photo.index}.jpg` })),
    source: 'https://www.instagram.com/p/DcMiHEUml8T/', verification: null
  },
  {
    id: 'gobernador-campos-309', category: 'pozo', name: 'Gobernador Campos 309',
    city: 'Ushuaia', description: 'Lanzamiento en pozo a tres cuadras de Av. San Martín, con vistas hacia la Bahía de Ushuaia y las montañas.',
    address: 'Gobernador Campos 309, esquina Godoy',
    facts: ['Unidades aptas turismo', 'Monoambientes desde 30,65 m² cubiertos', 'Planos municipales aprobados'],
    priceFrom: 85820, currency: 'USD', delivery: 'Septiembre de 2029',
    financingUntil: 'Diciembre de 2026',
    financing: ['25% de entrega al Boleto de Compraventa', '3 refuerzos de USD 10.000 en las cuotas 12, 18 y 24', 'Saldo hasta en 40 cuotas en pesos, ajustadas por índice CAC'],
    image: 'imagenes/delnorte.propiedades/2026-08-26_Dcg-Q_-GvEr/delnorte.propiedades_Dcg-Q_-GvEr_3.jpg',
    imageAlt: 'Render del edificio proyectado en Gobernador Campos 309, esquina Godoy, Ushuaia',
    photos: [
      { index: 3, label: 'Render del proyecto · Vista de la esquina' },
      { index: 1, label: 'Render del proyecto · Fachada y acceso' },
      { index: 2, label: 'Render del proyecto · Fachada con balcones' },
      { index: 0, label: 'Placa de lanzamiento · Precio y financiación' },
      { index: 4, label: 'Mapa de ubicación del proyecto' }
    ].map(photo => ({ ...photo, src: `imagenes/delnorte.propiedades/2026-08-26_Dcg-Q_-GvEr/delnorte.propiedades_Dcg-Q_-GvEr_${photo.index}.jpg` })),
    source: 'https://www.instagram.com/p/Dcg-Q_-GvEr/', verification: null
  }
];
