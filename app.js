// Prototipo GRUP MET — router por hash + plantillas. Sin backend.
// Textos e imágenes: tomados de grupmet.com (noviembre 2026).

const IMG = 'assets/img/';
const CONNECT_URL = 'https://grupmet.deiworld.es/csp/deiwcsp/deiw060001/WNDNewGrupMet.csp';

const SECTORS = {
  farma: {
    name: 'Farma y salud', short: 'farma', img: 'home-farma.jpg', alt: 'Sala de manipulado farmacéutico de GRUP MET',
    title: 'Especialistas en la industria farma y de la salud',
    card: 'Distribución de medicamentos y productos farmacéuticos para multinacionales alrededor de todo el mundo gracias a la certificación GDP.',
    facts: [['8.000 m²', 'al servicio de farma y salud'], ['24h × 7 días', 'almacén PMP en temperatura controlada']],
  },
  moda: {
    name: 'Moda y textil', short: 'moda', img: 'banner-moda.jpg', alt: 'Desfile de moda',
    title: 'Servicios exclusivos para la industria de la moda',
    card: 'Hemos apostado fuertemente por la industria textil, con servicios a lo largo de toda la cadena de suministros.',
    facts: [['+50 millones', 'de prendas manipuladas'], ['+100.000', 'prendas al día']],
  },
  editorial: {
    name: 'Editorial', short: 'editorial', img: 'home-editorial.jpg', alt: 'Estanterías de libros',
    title: 'Expertos en el transporte para el sector editorial',
    card: 'Nuestro profundo conocimiento y experiencia en el sector nos permite ofrecer siempre la mejor solución para nuestros clientes.',
    facts: [['+30 años', 'de experiencia acumulada'], ['América', 'por vía marítima y aérea']],
  },
};

const SERVICES = [
  ['ico-1.png', 'Transporte internacional', 'Especialistas en el transporte de mercancías de un país a otro.'],
  ['ico-2.png', 'Transporte marítimo', 'Permite trasladar grandes pesos y volúmenes de mercancías sólidas o líquidas.'],
  ['ico-3.png', 'Transporte aéreo', 'Se utiliza principalmente cuando se trata de largas travesías para transportar mercancías de valor.'],
  ['ico-4.png', 'Transporte terrestre', 'Este tipo de transporte ofrece una mayor flexibilidad a un menor coste.'],
  ['ico-5.png', 'Despacho de aduanas', 'Le ayudamos a superar todos los controles y formalidades aduaneras.'],
  ['ico-6.png', 'Logística y distribución', 'Almacenaje, transporte, distribución… procesos logísticos comunes y transversales altamente ligados a su éxito comercial.'],
  ['ico-7.png', 'Red global de agentes', 'Integrados en una red con más de 515 oficinas en 187 países.'],
  ['ico-8.png', 'Logística para ferias y pop-up', 'Recogida en sus instalaciones, transporte y entrega en el recinto ferial hasta el retorno una vez terminado el evento.'],
];

const NEWS = [
  ['news-1.jpg', 'Logística farmacéutica en Latinoamérica: retos reales en destino', 'logistica-farmaceutica-latinoamerica'],
  ['news-2.jpg', 'Aduanas en la exportación de químicos: CAS, REACH y doble uso', 'aduanas-productos-quimicos'],
  ['news-3.jpg', 'Packaging qualification: OQ y PQ explicados fácil en el transporte farmacéutico', 'packaging-qualification'],
  ['news-4.jpg', 'Consolidados propios en origen: qué diferencia hay frente a un NVOCC estándar', 'news-transporte-internacional'],
  ['news-5.jpg', 'Auditorías GDP en forwarding: qué revisa un auditor y cómo preparar la operativa', 'news-transporte-internacional'],
  ['news-6.jpg', 'Pharma lanes críticas entre USA, Europa y LATAM', 'news-transporte-internacional'],
];

const FIGURES = [['20.621', 'Envíos realizados'], ['72.708', 'Toneladas transportadas'], ['332.760', 'Metros cúbicos transportados'], ['430', 'Millones de euros transportados']];
const CLIENTS = ['Tommy Hilfiger', 'Naguisa', 'Munich', 'Diktons Barcelona', 'Ánonym'];
const WAREHOUSES = [
  ['moda-sede-1.jpg', 'Almacén 1 (central)', 'C/ Raurell 33 – Gavà (Barcelona)'],
  ['moda-sede-2.jpg', 'Almacén 2', 'C/ Raurell 31 – Gavà (Barcelona)'],
  ['moda-sede-3.jpg', 'Almacén 3', 'Avda. de la Generalitat 65 – Viladecans (Barcelona)'],
  ['moda-sede-4.jpg', 'Almacén 4', 'Avda. Siglo XXI 66-68 – Viladecans (Barcelona)'],
];

const photo = (file, alt, cls = '') => `<img class="photo ${cls}" src="${IMG}${file}" alt="${alt}" loading="lazy">`;

const cta = (sector) => `
<section class="cta"><div class="wrap">
  <h2>¿Le gustaría explicarnos su proyecto?</h2>
  <p>Estaremos encantados de escucharle.</p>
  <a class="btn" href="#/cotizar${sector ? '?sector=' + sector : ''}">Solicitar cotización</a>
</div></section>`;

const hero = ({ crumb, h1, lead, img, buttons = '', eyebrow = '', small = true }) => `
<section class="hero img ${small ? 'small' : ''}" style="--bg:url(${IMG}${img})"><div class="wrap">
  ${crumb ? `<div class="crumb"><a href="#/">Inicio</a> / ${crumb}</div>` : ''}
  ${eyebrow ? `<span class="eyebrow light">${eyebrow}</span>` : ''}
  <h1>${h1}</h1>${lead ? `<p>${lead}</p>` : ''}
  ${buttons ? `<div class="hero-cta">${buttons}</div>` : ''}
</div></section>`;

const strip = (facts) => `<section class="trust"><div class="wrap trust-grid">${facts.map(f => `<div><b>${f[0]}</b><span>${f[1]}</span></div>`).join('')}</div></section>`;

const sectorCards = () => Object.entries(SECTORS).map(([k, s]) => `
  <a class="card" href="#/sector/${k}">
    ${photo(s.img, s.alt, 'thumb')}
    <div class="body">
      <h3>${s.name}</h3><p>${s.card}</p>
      <ul>${s.facts.map(f => `<li><b>${f[0]}</b> ${f[1]}</li>`).join('')}</ul>
      <span class="link">Saber más</span>
    </div>
  </a>`).join('');

const serviceGrid = (cols) => `<div class="grid ${cols}">${SERVICES.map(s => `<div class="svc"><img src="${IMG}${s[0]}" alt="" width="48" height="48" loading="lazy"><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div>`;

const figures = () => `
<section class="bg-dark"><div class="wrap">
  <div class="head"><span class="eyebrow light">GRUP MET en datos</span><h2>Cifras que nos avalan</h2></div>
  <div class="grid g4">${FIGURES.map(f => `<div class="stat"><div class="num">+${f[0]}</div><span>${f[1]}</span></div>`).join('')}</div>
</div></section>`;

const clients = (bg = '') => `
<section class="${bg}"><div class="wrap">
  <div class="head"><span class="eyebrow">Clientes</span><h2>Quién confía en nosotros</h2><p class="lead">Algunos de nuestros principales clientes y colaboradores.</p></div>
  <div class="logos">${CLIENTS.map((c, i) => `<div><img src="${IMG}logo-cliente-${i + 1}.jpg" alt="${c}" width="203" height="118" loading="lazy"></div>`).join('')}</div>
</div></section>`;

const newsCards = (n) => NEWS.slice(0, n).map(x => `<a class="card" href="https://grupmet.com/${x[2]}/" target="_blank" rel="noopener">${photo(x[0], '', 'thumb wide')}<div class="body"><h3>${x[1]}</h3><span class="link">Leer más</span></div></a>`).join('');

const warehouses = () => `<div class="grid g4">${WAREHOUSES.map(w => `<div class="card">${photo(w[0], w[1], 'thumb')}<div class="body"><h3>${w[1]}</h3><p>${w[2]}</p></div></div>`).join('')}</div>`;

const offices = () => `
<div class="grid g3">
  <div class="office"><h3>Headquarter Office</h3><p>Calle Agricultura 16-18<br>El Masnou (Barcelona)</p><p><a class="link" href="tel:+34935405318">+34 935 405 318</a></p></div>
  <div class="office"><h3>MAD Office</h3><p>Calle Quebec 8<br>Barajas (Madrid)</p></div>
  <div class="office"><h3>BCN Airport Office</h3><p>Carrer Felip Sandino 20<br>El Prat de Llobregat (Barcelona)</p></div>
</div>`;

const sectorViews = {
  farma: () => hero({
    crumb: '<a href="#/sectores">Sectores</a> / Farma y salud', img: 'farma-36.jpg',
    h1: 'Transportamos productos <em>de salud</em> con la máxima calidad',
    lead: 'Especialistas en la distribución de medicamentos y productos farmacéuticos para multinacionales alrededor de todo el mundo gracias a la certificación GDP.',
    buttons: '<a class="btn btn-red" href="#/cotizar?sector=farma">Cotizar envío farma</a><a class="btn btn-ghost" href="#farma-instalaciones" data-scroll>Ver instalaciones</a>',
  }) + strip([['GDP', 'Certificación'], ['ISO 9001:2015', 'Garantía de calidad'], ['8.000 m²', 'de instalaciones'], ['24h × 7 días', 'temperatura controlada']]) + `
<section><div class="wrap grid g2">
  <div><span class="eyebrow">Farma services</span><h2>Especialistas en el transporte de la industria farma y de la salud</h2>
  <p class="lead">Incluimos servicios específicos de manipulación en la sala blanca que disponemos en nuestros 8.000 m² de instalaciones que, además, cuentan con almacén PMP propio en temperatura controlada 24h × 7 días.</p></div>
  ${photo('farma-38.jpg', 'Exterior de las instalaciones de GRUP MET para farma', 'tall')}
</div></section>
<section class="bg-g"><div class="wrap">
  <div class="grid g2">
    <div><span class="eyebrow">Nuestro proceso</span><h2>Acondicionamiento secundario en sala blanca</h2>
    <p>Estamos preparados para asumir cualquier manipulación de acondicionamiento secundario para las industrias de cosmética y farmacia. Servicios de manipulado en sala blanca. Garantía de calidad: disponemos de la ISO 9001:2015.</p>
    <ul class="tags">${['Etiquetados', 'Loteados', 'Registros', 'Inspección', 'Re-prospectados', 'Expositores', 'Encajado', 'Displays', 'Montaje de kits', 'Packs promocionales', 'Retractilados', 'Flow pack', 'Enfajados', 'Sleevado', 'Embolsados'].map(t => `<li>${t}</li>`).join('')}</ul></div>
    ${photo('farma-33.jpg', 'Operaria manipulando producto en sala blanca', 'tall')}
  </div>
</div></section>
<section id="farma-instalaciones"><div class="wrap">
  <div class="head"><span class="eyebrow">Nuestras instalaciones</span><h2>8.000 m² ubicados estratégicamente</h2>
  <p class="lead">Nuestras instalaciones permiten ofrecer un servicio completo: recepción de materias primas, manipulación o fabricación de productos, almacenaje y distribución de los productos acabados. A menos de 30 km del Puerto de Barcelona y del Aeropuerto del Prat.</p></div>
  <div class="gallery">${[['farma-02.jpg', 'Almacén con estanterías de palets'], ['farma-05.jpg', 'Zona de preparación'], ['farma-10.jpg', 'Manipulado manual de producto'], ['farma-14.jpg', 'Equipo trabajando en línea de manipulado'], ['farma-20.jpg', 'Línea de envasado'], ['farma-26.jpg', 'Sala de manipulado']].map(g => photo(g[0], g[1])).join('')}</div>
</div></section>
<section class="bg-dark"><div class="wrap grid g2">
  <div><span class="eyebrow light">Internacional</span><h2>Corresponsales especialistas farma en todo el mundo</h2>
  <p>Disponemos de corresponsales especialistas farma en todo el mundo, también acreditados para poder transportar medicamentos y productos farmacéuticos con la máxima calidad.</p></div>
  <div class="grid g2 certs"><div class="cert"><div class="seal">GDP</div><div><h3>Good Distribution Practice</h3><p>Certificado renovado en 2026.</p></div></div><div class="cert"><div class="seal">ISO</div><div><h3>ISO 9001:2015</h3><p>Garantía de calidad.</p></div></div></div>
</div></section>
${cta('farma')}`,

  moda: () => hero({
    crumb: '<a href="#/sectores">Sectores</a> / Moda y textil', img: 'banner-moda.jpg',
    h1: 'Cuidamos de <em>cada prenda</em>',
    lead: 'Pioneros en operaciones de la cadena de suministro relacionadas con la empresa textil. Incluimos servicios específicos de manipulación de prenda y de control de calidad. Gestionamos el envío de prenda a los puntos de venta, logística inversa y e-commerce.',
    buttons: '<a class="btn btn-red" href="#/cotizar?sector=moda">Cotizar envío moda</a><a class="btn btn-ghost" href="#moda-instalaciones" data-scroll>Ver instalaciones</a>',
  }) + strip([['+50 millones', 'de prendas planchadas, estocadas, etiquetadas, emperchadas y ubicadas'], ['+100.000', 'prendas al día de capacidad'], ['24.000 m²', 'dedicados a textil y moda'], ['18 km · 8 km', 'del puerto y del aeropuerto']]) + `
<section><div class="wrap">
  <div class="head"><span class="eyebrow">Nuestro proceso</span><h2>De origen a tienda</h2>
  <p class="lead">Amplia experiencia de servicio a grandes almacenes y liquidadores. Contamos con almacén aduanero público y privado que facilita la gestión internacional del stock de nuestros clientes.</p></div>
  <img class="diagram" src="${IMG}moda-ciclo.jpg" alt="Ciclo del transporte internacional de moda" loading="lazy">
  <div class="grid g3" style="margin-top:36px">${[
    ['E-commerce', 'Nos ocupamos de toda la logística que necesita para su tienda online. Manejamos sus pedidos, empaquetamos y los enviamos a sus clientes de acuerdo con sus criterios.'],
    ['Manipulado de prendas', 'Realizamos cualquier operación para que la prenda esté lista para su entrega en la tienda. Colocamos botones, hacemos ojales, plancha (manual, automático), cosemos etiquetas, conectamos alarmas, bolsos y doblamos la ropa.'],
    ['Control de calidad', 'Verificamos sus prendas para cumplir todos los requisitos. Contamos con especialistas en calidad de prendas con varios años de experiencia.'],
    ['Almacenaje de prendas', 'Mantenemos sus productos en almacenes con la máxima seguridad y limpieza. Las prendas permanecen almacenadas en nuestras instalaciones hasta que las necesite nuevamente.'],
    ['Picking', 'Selección de pedidos iniciales y reposiciones, para ropa colgada y doblada. Podemos enviar más de 100.000 prendas al día.'],
    ['Logística inversa', 'Gestionamos devoluciones de final de temporada de sus tiendas y sus clientes multimarca. Verificamos sus prendas, las tratamos, las almacenamos y las dejamos listas para el envío.'],
  ].map(s => `<div class="svc"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div>
</div></section>
<section class="bg-g" id="moda-instalaciones"><div class="wrap">
  <div class="head"><span class="eyebrow">Nuestras instalaciones</span><h2>24.000 m² ubicados estratégicamente</h2>
  <p class="lead">Al servicio de la industria textil y de la moda. A 18 km del Puerto de Barcelona y a 8 km del Aeropuerto del Prat.</p></div>
  ${warehouses()}
</div></section>
<section><div class="wrap grid g2">
  ${photo('moda-brazo.jpg', 'Terminal de radiofrecuencia de muñeca', 'contain')}
  <div><span class="eyebrow">Comunicación</span><h2>Trazabilidad en todos los procesos</h2>
  <ul class="check"><li>Todas las comunicaciones y procesos son realizados con terminales de radiofrecuencia.</li><li>Control de la trazabilidad en todos los procesos.</li><li>Comunicaciones adaptadas a cada solución.</li><li>Desarrollos EDI en todos los formatos: webservices, edifact, xml, xlsx, txt, etc.</li></ul></div>
</div></section>
<section class="bg-g"><div class="wrap grid g2">
  <div><span class="eyebrow">Personal</span><h2>Recursos adaptados a cada temporada</h2>
  <ul class="check"><li>Recursos adaptados a la estacionalidad de cada cliente.</li><li>Entrenamiento continuo en diferentes procesos.</li><li>Personal involucrado en mejorar la calidad.</li></ul></div>
  ${photo('moda-recursos.jpg', 'Gráfico de recursos de personal permanente, multitarea y externo por mes', 'contain')}
</div></section>
${clients()}
${cta('moda')}`,

  editorial: () => hero({
    crumb: '<a href="#/sectores">Sectores</a> / Editorial', img: 'banner-editorial.jpg',
    h1: 'Transportamos <em>el sector editorial</em> con la máxima calidad',
    lead: 'Nuestro profundo conocimiento y experiencia en el sector nos permite ofrecer siempre la mejor solución para nuestros clientes.',
    buttons: '<a class="btn btn-red" href="#/cotizar?sector=editorial">Cotizar envío editorial</a>',
  }) + strip([['+30 años', 'de experiencia acumulada en el sector'], ['América', 'exportación marítima y aérea'], ['Soluciones', 'sectoriales de primer nivel'], ['Gestión integral', 'de librerías, editoriales o distribuidoras']]) + `
<section><div class="wrap grid g2">
  <div><span class="eyebrow">Editorial</span><h2>Expertos en el transporte para el sector editorial</h2>
  <p>Ya sea con soluciones sectoriales de primer nivel, ideales para una gestión integral de librerías y editoriales o distribuidoras de tamaño moderado, o con desarrollos expertos que se adapten a sus necesidades. Sin olvidar dos temas clave en la modernización del sector hoy en día: conectividad sectorial y movilidad avanzada, tanto para la gestión como en forma de aplicaciones de usuario.</p>
  <p>Además de nuestras soluciones, ponemos a su disposición todo nuestro know-how del sector, abarcando la consultoría y el desarrollo de soluciones ad-hoc de forma que se garanticen plenamente sus necesidades de gestión.</p></div>
  ${photo('editorial1.jpg', 'Operario preparando cajas de libros', 'tall')}
</div></section>
<section class="bg-g"><div class="wrap grid g2">
  ${photo('editorial2.jpg', 'Carga de cajas en furgoneta de reparto', 'tall')}
  <div><span class="eyebrow">Trayectoria</span><h2>Un referente para editoriales y distribuidores</h2>
  <p>La incorporación de META CARGO a MET permitió también diversificar sectorialmente hacia el nicho editorial, dado que trabajaban para las principales empresas del sector, exportadoras por la vía marítima y aérea hacia América, contando con clientes nacionales así como internacionales.</p>
  <p>Tras más de 30 años acumulados de experiencia en el sector, se ha posicionado la marca como un referente para las editoriales y distribuidores que frecuentemente confían sus envíos internacionales en MET.</p></div>
</div></section>
${cta('editorial')}`,
};

const views = {
  home: () => hero({
    small: false, img: 'banner-servicios.jpg', eyebrow: 'Transporte y logística internacional · desde 2003',
    h1: 'Logística integral para mercancía de <em>valor añadido</em>',
    lead: 'El operador logístico de referencia en cualquier sector que necesite un servicio exigente.',
    buttons: '<a class="btn btn-red" href="#/cotizar">Solicitar cotización</a><a class="btn btn-ghost" href="#/sectores">Ver mi sector</a>',
  }) + strip([['GDP', 'Certificación farma'], ['ISO 9001:2015', 'Garantía de calidad'], ['+515 oficinas', 'en 187 países'], ['Desde 2003', 'Barcelona · Madrid']]) + `
<section><div class="wrap">
  <div class="head"><span class="eyebrow">Sectores</span><h2>Especialistas por sector</h2>
  <p class="lead">Nuestro proyecto está muy enfocado en la industria de la salud, textil y de la moda, ofreciendo a nuestros clientes muchos servicios a lo largo de la cadena de suministro.</p></div>
  <div class="grid g3">${sectorCards()}</div>
</div></section>

<section class="bg-g"><div class="wrap">
  <div class="head"><span class="eyebrow">Servicios</span><h2>La ventaja de una base sólida</h2>
  <p class="lead">Nuestro objetivo es dar un valor agregado a nuestros clientes y transformarnos en un eslabón más en su cadena de valores.</p></div>
  ${serviceGrid('g4')}
</div></section>

${figures()}

<section><div class="wrap grid g2">
  ${photo('home-nosotros.jpg', 'Terminal de contenedores del puerto al atardecer', 'tall')}
  <div>
    <span class="eyebrow">Nosotros</span>
    <h2>Hacemos fácil la logística internacional</h2>
    <p class="lead">Una filosofía de trabajo basada en la transparencia, la anticipación y el ofrecer un servicio de calidad nos ha permitido consolidarnos como el operador logístico de referencia en cualquier sector que necesite un servicio exigente.</p>
    <a class="btn btn-line" href="#/nosotros">Saber más</a>
  </div>
</div></section>

${clients('bg-g')}

<section class="bg-dark"><div class="wrap grid g2">
  <div>
    <span class="eyebrow light">Track &amp; Trace</span>
    <h2>GRUP MET Connect</h2>
    <p>Nuestro departamento TI está en continuo desarrollo de plataformas y herramientas tecnológicas con el objetivo de conectar y ayudar a nuestros clientes.</p>
    <p>Aplicación web de seguimiento y estadísticas de todos sus envíos mediante una interface sencilla y atractiva.</p>
    <a class="btn btn-red" href="#/connect">Abrir app</a>
  </div>
  ${photo('connect.jpg', 'Pantalla de acceso de GRUP MET Connect', 'contain')}
</div></section>

<section><div class="wrap">
  <div class="head"><span class="eyebrow">Actualidad</span><h2>Últimas noticias</h2></div>
  <div class="grid g3 news">${newsCards(3)}</div>
  <p style="margin-top:28px"><a class="link" href="#/actualidad">Ver todas las noticias</a></p>
</div></section>
${cta()}`,

  sectores: () => hero({ crumb: 'Sectores', img: 'banner-nosotros.jpg', h1: 'Sectores', lead: 'Nuestro proyecto está muy enfocado en la industria de la salud, textil y de la moda.' }) + `
<section><div class="wrap"><h2 class="sr">Nuestros sectores</h2><div class="grid g3">${sectorCards()}</div></div></section>
<section class="bg-g"><div class="wrap" style="max-width:860px">
  <span class="eyebrow">Otros sectores</span><h2>Proyectos a medida para cualquier empresa</h2>
  <p>La alta calidad de nuestros servicios nos ha llevado a ser reclamados para trabajar en otras industrias, como los sectores de la construcción, la electrónica, la joyería, los electrodomésticos, la industria automotriz y de juguetes, entre otros. Del mismo modo, podemos desarrollar proyectos a medida para cualquier empresa, ya que estamos acostumbrados al alto rendimiento y la eficiencia que exige la industria de la moda.</p>
</div></section>${cta()}`,

  sector: (k) => (sectorViews[k] || views.sectores)(),

  servicios: () => hero({ crumb: 'Servicios', img: 'banner-servicios.jpg', h1: 'La ventaja de una base sólida', lead: 'Nuestro objetivo es dar un valor agregado a nuestros clientes y transformarnos en un eslabón más en su cadena de valores.' }) + `
<section><div class="wrap"><h2 class="sr">Nuestros servicios</h2>${serviceGrid('g4')}</div></section>${figures()}${cta()}`,

  instalaciones: () => hero({ crumb: 'Instalaciones', img: 'farma-02.jpg', h1: 'Nuestras instalaciones', lead: '24.000 m² para textil y moda y 8.000 m² para farma y salud, ubicados estratégicamente junto al Puerto de Barcelona y al Aeropuerto del Prat.' }) + `
<section><div class="wrap">
  <div class="head"><span class="eyebrow">Moda y textil</span><h2>24.000 m² · cuatro almacenes</h2>
  <p class="lead">A 18 km del Puerto de Barcelona y a 8 km del Aeropuerto del Prat. Almacén aduanero público y privado.</p></div>
  ${warehouses()}
</div></section>
<section class="bg-g"><div class="wrap">
  <div class="head"><span class="eyebrow">Farma y salud</span><h2>8.000 m² · sala blanca</h2>
  <p class="lead">Recepción de materias primas, manipulación o fabricación de productos, almacenaje y distribución de los productos acabados. Almacén PMP propio en temperatura controlada 24h × 7 días. A menos de 30 km del Puerto de Barcelona y del Aeropuerto del Prat.</p></div>
  <div class="gallery">${[['farma-36.jpg', 'Sala de manipulado'], ['farma-30.jpg', 'Operaria en línea de encajado'], ['farma-02.jpg', 'Almacén con estanterías de palets']].map(g => photo(g[0], g[1])).join('')}</div>
</div></section>
<section><div class="wrap"><div class="head"><span class="eyebrow">Oficinas</span><h2>Dónde estamos</h2></div>${offices()}</div></section>${cta()}`,

  nosotros: () => hero({ crumb: 'Nosotros', img: 'banner-nosotros.jpg', h1: 'Hacemos fácil la logística internacional', lead: 'Una filosofía de trabajo basada en la transparencia, la anticipación y el ofrecer un servicio de calidad.' }) + `
<section><div class="wrap grid g2" style="align-items:start">
  <div><span class="eyebrow">Nosotros</span><h2>GRUP MET nació en el año 2003</h2>
  <p>Nuestro proyecto está muy enfocado en la industria de la salud, textil y de la moda, ofreciendo a nuestros clientes muchos servicios a lo largo de la cadena de suministro.</p>
  <p>Dentro de la <b>industria de la salud</b> somos especialistas en la distribución de medicamentos y productos farmacéuticos para multinacionales alrededor de todo el mundo gracias a la certificación GDP.</p>
  <p>Dentro de la <b>industria de la moda</b> somos pioneros en operaciones de la cadena de suministro relacionadas con la empresa textil. Incluimos servicios específicos de manipulación de prenda y de control de calidad. Gestionamos el envío de prenda a los puntos de venta, logística inversa y e-commerce.</p>
  <p>La alta calidad de nuestros servicios nos ha llevado a ser reclamados para trabajar en otras industrias, como los sectores de la construcción, la electrónica, la joyería, los electrodomésticos, la industria automotriz y de juguetes, entre otros.</p></div>
  ${photo('home-nosotros.jpg', 'Terminal de contenedores del puerto al atardecer', 'tall')}
</div></section>
<section class="bg-g"><div class="wrap grid g2" style="align-items:start">
  <div><span class="eyebrow">Cómo trabajamos</span><h2>Un vínculo más en la estructura de su empresa</h2>
  <p>Nuestro objetivo es brindar un servicio de valor agregado a nuestros clientes. Con este objetivo, asesoramos continuamente a nuestros clientes sobre el transporte internacional y los problemas de producción.</p>
  <p>Una de nuestras herramientas más innovadoras es un sistema de control único y personalizado para cada cliente, donde a través de nuestra web puede acceder a todos los datos relacionados con sus envíos. Todo ello sin olvidar nunca la atención personal que nos caracteriza.</p></div>
  <div><span class="eyebrow">Red mundial</span><h2>Logística global</h2>
  <p>Gracias a nuestra red mundial de agencias coordinamos todas nuestras actividades locales, convirtiendo algo muy complicado como la logística internacional en algo muy fácil.</p>
  <p>En GRUP MET realizamos esfuerzos para reinventarnos todos los días, para nunca quedarnos obsoletos. Gracias a nuestra amplia red de agencias y socios en las principales ciudades, puertos y aeropuertos del mundo podemos ofrecer un servicio de logística global.</p></div>
</div></section>
${figures()}
<section><div class="wrap grid g2">
  <div><span class="eyebrow">Vídeo presentación</span><h2>Le explicamos de forma divertida lo que hacemos</h2>
  <a class="btn btn-line" href="https://youtu.be/9U1yq0wDVMA" target="_blank" rel="noopener">Ver vídeo</a></div>
  <a class="video" href="https://youtu.be/9U1yq0wDVMA" target="_blank" rel="noopener" aria-label="Ver vídeo de presentación en YouTube">${photo('banner-contacto.jpg', '', 'tall')}<span class="play" aria-hidden="true"></span></a>
</div></section>${cta()}`,

  actualidad: () => hero({ crumb: 'Actualidad', img: 'banner-blog.jpg', h1: 'Noticias', lead: 'Transporte internacional, logística farmacéutica y aduanas.' }) + `
<section><div class="wrap"><h2 class="sr">Últimas noticias</h2><div class="grid g3 news">${newsCards(6)}</div>
<p style="margin-top:32px"><a class="link" href="https://grupmet.com/news-transporte-internacional/" target="_blank" rel="noopener">Ver todas en grupmet.com</a></p></div></section>${cta()}`,

  contacto: () => hero({ crumb: 'Contacto', img: 'banner-contacto.jpg', h1: '¿Le gustaría explicarnos su proyecto?', lead: 'Explíquenos su proyecto y estaremos encantados de ayudarle y resolver cualquier duda o cuestión que pueda tener.', buttons: '<a class="btn btn-red" href="#/cotizar">Solicitar cotización</a><a class="btn btn-ghost" href="tel:+34935405318">+34 935 405 318</a>' }) + `
<section><div class="wrap"><div class="head"><span class="eyebrow">Oficinas</span><h2>Contacte con nosotros</h2></div>${offices()}
<p style="margin-top:28px"><a class="link" href="https://maps.google.com/maps?q=Carrer%20Agricultura%2C%2016%2C%2008320%20El%20Masnou%2C%20Barcelona" target="_blank" rel="noopener">Ver sede en Google Maps</a></p></div></section>`,

  connect: () => hero({ crumb: 'Área cliente', img: 'banner-servicios.jpg', h1: 'GRUP MET Connect', lead: 'Aplicación web de seguimiento y estadísticas de todos sus envíos mediante una interface sencilla y atractiva.' }) + `
<section><div class="wrap grid g2">
  <div><span class="eyebrow">Track &amp; Trace</span><h2>Todos los datos de sus envíos</h2>
  <p>Nuestro departamento TI está en continuo desarrollo de plataformas y herramientas tecnológicas con el objetivo de conectar y ayudar a nuestros clientes.</p>
  <p>Un sistema de control único y personalizado para cada cliente.</p>
  <a class="btn btn-red" href="${CONNECT_URL}" target="_blank" rel="noopener">Abrir app</a></div>
  ${photo('connect.jpg', 'Pantalla de acceso de GRUP MET Connect', 'contain')}
</div></section>`,

  cotizar: () => hero({ crumb: 'Cotización', img: 'banner-contacto.jpg', h1: 'Solicitar cotización', lead: 'Explíquenos su proyecto y estaremos encantados de ayudarle y resolver cualquier duda o cuestión que pueda tener.' }) + `
<section class="bg-g"><div class="wrap form-shell">
  <form class="form" id="quote" novalidate>
    <ol class="progress" aria-label="Progreso"><li class="on" data-p="1" aria-current="step">1 · Envío</li><li data-p="2">2 · Contacto</li><li data-p="3">3 · Confirmación</li></ol>

    <div data-step="1">
      <div class="fgrid">
        <fieldset class="full"><legend>Sector</legend><div class="chips">
          ${[['farma', 'Farma y salud'], ['moda', 'Moda y textil'], ['editorial', 'Editorial'], ['otro', 'Otro']].map(o => `<label><input type="radio" name="sector" value="${o[0]}"><span>${o[1]}</span></label>`).join('')}
        </div></fieldset>
        <fieldset class="full"><legend>Servicio</legend><div class="chips">
          ${['Aéreo', 'Marítimo', 'Terrestre', 'Aduanas', 'Logística', 'No lo sé'].map(o => `<label><input type="radio" name="modo" value="${o}"><span>${o}</span></label>`).join('')}
        </div></fieldset>
        <div><label for="origen">Origen *</label><input id="origen" name="origen" placeholder="Ciudad, país" required></div>
        <div><label for="destino">Destino *</label><input id="destino" name="destino" placeholder="Ciudad, país" required></div>
        <div class="full"><label for="merc">Mercancía *</label><input id="merc" name="merc" placeholder="Qué se envía" required></div>
        <div><label for="peso">Peso aprox. (kg)</label><input id="peso" name="peso" type="number" min="0" inputmode="decimal"></div>
        <div><label for="vol">Volumen aprox. (m³)</label><input id="vol" name="vol" type="number" min="0" step="0.1" inputmode="decimal"></div>
        <div><label for="inco">Incoterm</label><select id="inco" name="inco"><option value="">No lo sé</option><option>EXW</option><option>FCA</option><option>FOB</option><option>CIF</option><option>DAP</option><option>DDP</option></select></div>
        <div><label for="fecha">Fecha prevista</label><input id="fecha" name="fecha" type="date"></div>
        <div class="full cond" id="cond-farma" hidden>
          <label for="temp">Rango de temperatura</label>
          <select id="temp" name="temp"><option value="">Seleccione</option><option>+15 °C a +25 °C</option><option>+2 °C a +8 °C</option><option>Congelado</option><option>Sin control</option></select>
        </div>
        <div class="full cond" id="cond-moda" hidden>
          <label for="pres">Presentación</label>
          <select id="pres" name="pres"><option value="">Seleccione</option><option>Prenda colgada</option><option>Prenda doblada</option><option>Mixto</option></select>
        </div>
      </div>
      <div class="err" id="err1" role="alert"></div>
      <div class="actions"><span class="hint">* Obligatorio</span><button type="button" class="btn btn-red" id="next">Continuar</button></div>
    </div>

    <div data-step="2" hidden>
      <div class="fgrid">
        <div><label for="nombre">Nombre *</label><input id="nombre" name="nombre" autocomplete="name" required></div>
        <div><label for="empresa">Empresa *</label><input id="empresa" name="empresa" autocomplete="organization" required></div>
        <div><label for="email">Email *</label><input id="email" name="email" type="email" autocomplete="email" required></div>
        <div><label for="tel">Teléfono</label><input id="tel" name="tel" type="tel" autocomplete="tel"></div>
        <div class="full"><label for="nota">Mensaje</label><textarea id="nota" name="nota" rows="3"></textarea></div>
        <label class="full consent"><input type="checkbox" id="priv" required><span>He leído y acepto la Política de Privacidad *</span></label>
      </div>
      <div class="err" id="err2" role="alert"></div>
      <div class="actions"><button type="button" class="btn btn-line" id="back">Atrás</button><button type="submit" class="btn btn-red">Enviar</button></div>
    </div>

    <div data-step="3" hidden>
      <div class="done">
        <div class="ok"></div>
        <h2>Solicitud recibida</h2>
        <p>Referencia <b id="ref"></b>.</p>
        <div class="summary" id="summary"></div>
        <a class="btn btn-line" href="#/">Volver al inicio</a>
      </div>
    </div>
  </form>

  <aside class="aside">
    <h2 class="h3">¿Prefiere hablar?</h2>
    <p><a class="link" href="tel:+34935405318">+34 935 405 318</a></p>
    <p>Headquarter Office<br>Calle Agricultura 16-18, El Masnou (Barcelona)</p>
    <p class="badges"><span>GDP</span><span>ISO 9001:2015</span></p>
  </aside>
</div></section>`,
};

function initQuote(params) {
  const f = document.getElementById('quote'); if (!f) return;
  const show = (n) => {
    f.querySelectorAll('[data-step]').forEach(s => s.hidden = s.dataset.step != n);
    f.querySelectorAll('[data-p]').forEach(p => { p.classList.toggle('on', +p.dataset.p <= n); p.toggleAttribute('aria-current', +p.dataset.p === n); });
    window.scrollTo({ top: f.getBoundingClientRect().top + scrollY - 110 });
    const first = f.querySelector(`[data-step="${n}"] input:not([type=radio]), [data-step="${n}"] h2`);
    if (n > 1 && first) { first.tabIndex = first.tabIndex || -1; first.focus({ preventScroll: true }); }
  };
  const cond = () => {
    const v = f.sector.value;
    document.getElementById('cond-farma').hidden = v !== 'farma';
    document.getElementById('cond-moda').hidden = v !== 'moda';
  };
  const pre = params.get('sector');
  if (pre && SECTORS[pre]) f.querySelector(`[name=sector][value=${pre}]`).checked = true;
  cond();
  f.querySelectorAll('[name=sector]').forEach(r => r.addEventListener('change', cond));

  const MSG = { origen: 'Indique el origen', destino: 'Indique el destino', merc: 'Indique la mercancía', nombre: 'Indique su nombre', empresa: 'Indique su empresa', email: 'Introduzca un email válido', priv: 'Debe aceptar la política de privacidad' };
  const mark = (i, bad) => {
    i.classList.toggle('invalid', bad); i.setAttribute('aria-invalid', bad);
    const host = i.type === 'checkbox' ? i.closest('label') : i.parentElement;
    let e = host.querySelector('.ferr');
    if (bad && !e) { e = document.createElement('span'); e.className = 'ferr'; e.id = i.id + '-err'; host.append(e); i.setAttribute('aria-describedby', e.id); }
    if (e) bad ? e.textContent = MSG[i.id] || 'Campo obligatorio' : e.remove();
  };
  const missing = (step) => [...f.querySelectorAll(`[data-step="${step}"] [required]`)].filter(i => { const bad = !i.checkValidity(); mark(i, bad); return bad; });
  f.querySelectorAll('[required]').forEach(i => i.addEventListener('input', () => { if (i.classList.contains('invalid') && i.checkValidity()) mark(i, false); }));
  document.getElementById('next').onclick = () => {
    const m = missing(1);
    if (m.length) { document.getElementById('err1').textContent = `Faltan ${m.length} campo(s) obligatorio(s).`; m[0].focus(); return; }
    document.getElementById('err1').textContent = ''; show(2);
  };
  document.getElementById('back').onclick = () => show(1);
  f.onsubmit = (e) => {
    e.preventDefault();
    const m = missing(2);
    if (m.length) { document.getElementById('err2').textContent = `Revise ${m.length} campo(s) marcado(s).`; m[0].focus(); return; }
    const d = new FormData(f);
    const rows = [['Sector', SECTORS[d.get('sector')]?.name || (d.get('sector') ? 'Otro' : '')], ['Modo', d.get('modo')], ['Ruta', `${d.get('origen')} → ${d.get('destino')}`], ['Mercancía', d.get('merc')], ['Peso / volumen', [d.get('peso') && d.get('peso') + ' kg', d.get('vol') && d.get('vol') + ' m³'].filter(Boolean).join(' · ')], ['Contacto', `${d.get('nombre')} · ${d.get('empresa')}`]];
    const box = document.getElementById('summary'); box.innerHTML = '';
    rows.filter(r => r[1]).forEach(r => { const div = document.createElement('div'); const a = document.createElement('span'); const b = document.createElement('b'); a.textContent = r[0]; b.textContent = r[1]; div.append(a, b); box.append(div); });
    document.getElementById('ref').textContent = 'GM-' + Date.now().toString().slice(-6);
    show(3);
  };
}

let first = true;
function route() {
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const parts = path.split('/').filter(Boolean);
  const name = parts[0] || 'home';
  const view = views[name] || views.home;
  document.getElementById('app').innerHTML = view(parts[1]);
  document.querySelectorAll('.nav a[data-nav]').forEach(a => { const on = a.dataset.nav.split(' ').includes(name); a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  const h1 = document.querySelector('#app h1');
  document.title = (name === 'home' ? 'Logística integral para mercancía de valor añadido' : h1.textContent) + ' · GRUP MET';
  setMenu(false);
  window.scrollTo(0, 0);
  if (!first) document.getElementById('app').focus({ preventScroll: true });
  first = false;
  if (name === 'cotizar') initQuote(new URLSearchParams(qs || ''));
}

const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
function setMenu(open) {
  if (open) document.documentElement.style.setProperty('--nav-top', header.getBoundingClientRect().bottom + 'px');
  document.getElementById('nav').classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  const item = document.activeElement.closest('.nav-item');
  if (item) { item.classList.add('closed'); item.querySelector('.nav-link').focus(); }
});
document.querySelectorAll('.nav-item').forEach(i => {
  i.addEventListener('mouseleave', () => i.classList.remove('closed'));
  i.addEventListener('focusout', (e) => { if (!i.contains(e.relatedTarget)) i.classList.remove('closed'); });
});
document.getElementById('nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
matchMedia('(min-width:901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 80), { passive: true });
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-scroll]'); if (!a) return;
  e.preventDefault();
  const t = document.querySelector(a.getAttribute('href'));
  if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - header.offsetHeight });
});
window.addEventListener('hashchange', route);
route();
