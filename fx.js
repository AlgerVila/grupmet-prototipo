// Gráficos propios: mapa de rutas, esquema de proximidad, contadores. SVG + CSS, sin librerías.
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Destinos orientativos (pendiente de confirmar rutas reales con GRUP MET).
const ROUTES = [
  ['JFK', -73.78, 40.64, 'l'], ['MIA', -80.29, 25.79, 'l'], ['MEX', -99.07, 19.44, 'l'], ['BOG', -74.15, 4.70, 'l'],
  ['GRU', -46.47, -23.43, 'r'], ['EZE', -58.54, -34.82, 'l'], ['PVG', 121.8, 31.14, 'l'],
];
const BCN = [2.08, 41.30];

function routeMap() {
  const px = (lon, lat) => [(lon - MAP.lon0) * MAP.k, (MAP.lat1 - lat) * MAP.k];
  const [bx, by] = px(...BCN);
  const X0 = 64, W = MAP.w - X0;
  let arcs = '', pts = '', movers = '';
  ROUTES.forEach(([code, lon, lat, side], i) => {
    const [x, y] = px(lon, lat);
    const d = Math.hypot(x - bx, y - by);
    const cx = (bx + x) / 2, cy = (by + y) / 2 - d * 0.24;
    const path = `M${bx.toFixed(1)} ${by.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    arcs += `<path id="arc${i}" class="arc" style="--i:${i}" pathLength="1" d="${path}"/>`;
    const tx = side === 'l' ? x - 9 : x + 9;
    pts += `<g class="dest" style="--i:${i}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/><text x="${tx.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${side === 'l' ? 'end' : 'start'}">${code}</text></g>`;
    if (!REDUCED) {
      const t0 = (1.6 + i * 0.7).toFixed(1), dur = (9 + d / 80).toFixed(1);
      // Ida y vuelta: 0 → 1 → 0 sobre el mismo arco, con pausa breve en cada extremo.
      movers += `<circle class="mover" r="3.2" opacity="0"><set attributeName="opacity" to="1" begin="${t0}s" fill="freeze"/><animateMotion dur="${dur}s" begin="${t0}s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1;1;0;0" keyTimes="0;0.46;0.5;0.96;1" keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1;0 0 1 1"><mpath href="#arc${i}"/></animateMotion></circle>`;
    }
  });
  return `<svg class="routemap" viewBox="${X0} 0 ${W} ${MAP.h}" role="img" aria-label="Mapa de rutas desde Barcelona hacia América y Asia">
  <path class="dots" d="${MAP.dots}"/>
  ${arcs}${pts}${movers}
  <g class="origin"><circle class="pulse" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="6"/><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="5.5"/><text x="${(bx + 11).toFixed(1)}" y="${(by - 9).toFixed(1)}">BCN</text></g>
</svg>`;
}

// Esquema de proximidad: posiciones a escala real (lat/lon), trazo simplificado de la costa.
function proximity() {
  const p = (lon, lat) => [+((lon - 1.955) * 0.7513 * 1650).toFixed(1), +((41.515 - lat) * 1650).toFixed(1)];
  const coast = [[1.93, 41.262], [2.00, 41.268], [2.09, 41.282], [2.13, 41.30], [2.175, 41.335], [2.20, 41.385], [2.245, 41.44], [2.32, 41.473], [2.40, 41.50]].map(c => p(...c).join(' ')).join(' L');
  const wh = p(2.018, 41.308), air = p(2.083, 41.297), port = p(2.165, 41.345), hq = p(2.318, 41.480);
  const at = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const mA = at(wh, air, 0.5), mP = at(wh, port, 0.62);
  return `<figure class="prox" data-inview>
<svg viewBox="0 0 520 430" role="img" aria-label="Esquema de situación: almacenes de moda en Gavà y Viladecans a 8 km del Aeropuerto del Prat y a 18 km del Puerto de Barcelona">
  <path class="sea" d="M${coast} L560 440 L-40 440 Z"/>
  <path class="coast" d="M${coast}"/>
  <text class="sea-t" x="372" y="318">Mar Mediterráneo</text>
  <text class="city" x="222" y="186" text-anchor="middle">Barcelona</text>
  <path class="link" pathLength="1" d="M${wh.join(' ')} L${air.join(' ')}"/>
  <path class="link" pathLength="1" style="--d:.35s" d="M${wh.join(' ')} L${port.join(' ')}"/>
  <g class="km" style="--d:.5s"><rect x="${mA[0] - 23}" y="${mA[1] + 11}" width="46" height="21" rx="2"/><text x="${mA[0]}" y="${mA[1] + 26}">8 km</text></g>
  <g class="km" style="--d:.9s"><rect x="${mP[0] - 26}" y="${mP[1] - 33}" width="52" height="21" rx="2"/><text x="${mP[0]}" y="${mP[1] - 18}">18 km</text></g>
  <g class="node"><circle cx="${air[0]}" cy="${air[1]}" r="6"/><text x="${air[0] + 12}" y="${air[1] + 42}">Aeropuerto del Prat</text></g>
  <g class="node"><circle cx="${port[0]}" cy="${port[1]}" r="6"/><text x="${port[0] + 16}" y="${port[1] - 2}">Puerto de Barcelona</text></g>
  <g class="node sec"><circle cx="${hq[0]}" cy="${hq[1]}" r="5"/><text x="${hq[0] - 12}" y="${hq[1] - 10}" text-anchor="end">Sede · El Masnou</text></g>
  <g class="node main"><circle class="pulse" cx="${wh[0]}" cy="${wh[1]}" r="9"/><circle cx="${wh[0]}" cy="${wh[1]}" r="9"/><text x="18" y="${wh[1] - 46}">Almacenes moda</text><text class="sub-t" x="18" y="${wh[1] - 28}">Gavà · Viladecans</text></g>
</svg>
<figcaption>Posiciones a escala. Instalaciones de farma y salud: a menos de 30 km del puerto y del aeropuerto.</figcaption>
</figure>`;
}

// Índice lateral de secciones: solo escritorio ancho, etiquetas al pasar el ratón.
let pindexIO = null;
function pageIndex() {
  document.querySelector('.pindex')?.remove();
  pindexIO?.disconnect();
  const secs = [...document.querySelectorAll('#app > section')].filter((s) => !s.matches('.hero,.trust,.cta') && s.querySelector('.eyebrow'));
  if (secs.length < 3) return;
  const nav = document.createElement('nav');
  nav.className = 'pindex'; nav.setAttribute('aria-label', 'En esta página');
  secs.forEach((sec, i) => {
    const a = document.createElement('a');
    a.href = '#'; a.dataset.i = i;
    const n = document.createElement('span'); n.className = 'pi-t';
    n.textContent = String(i + 1).padStart(2, '0') + ' · ' + sec.querySelector('.eyebrow').textContent.trim();
    const tick = document.createElement('span'); tick.className = 'pi-k'; tick.setAttribute('aria-hidden', 'true');
    a.append(n, tick);
    a.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: sec.getBoundingClientRect().top + scrollY - header.offsetHeight + 1 }); });
    nav.append(a);
  });
  document.body.append(nav);
  const links = [...nav.children];
  pindexIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const i = secs.indexOf(e.target);
    links.forEach((l, j) => { l.classList.toggle('on', i === j); i === j ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'); });
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => pindexIO.observe(s));
  const first = secs[0], last = secs[secs.length - 1];
  const vis = () => nav.classList.toggle('show', first.getBoundingClientRect().top < innerHeight * 0.6 && last.getBoundingClientRect().bottom > innerHeight * 0.4);
  nav._vis = vis; vis();
}
addEventListener('scroll', () => document.querySelector('.pindex')?._vis(), { passive: true });

function initFx() {
  pageIndex();
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    if (e.target.dataset.count) return countUp(e.target);
    e.target.classList.add('in');
  }), { threshold: 0.35 });
  document.querySelectorAll('#app [data-inview], #app [data-count]').forEach((el) => io.observe(el));
}

function countUp(el) {
  const to = +el.dataset.count, fmt = (n) => '+' + Math.round(n).toLocaleString('es-ES', { useGrouping: 'always' });
  if (REDUCED) { el.textContent = fmt(to); return; }
  const t0 = performance.now(), dur = 1600;
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(to * ease);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
