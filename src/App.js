import { useEffect, useRef, useState } from 'react';
import './App.css';
import { siteConfig, services, gallery, getWhatsAppUrl, getWhatsAppDisplay, getMapsEmbedUrl, getMapsDirectionsUrl } from './data/siteConfig';
import logo from './assets/logo_catrina_peluqueria.jpg';
import heroImage from './assets/img/Catrina-cabello-rosa-corona-floral.png';
import aboutImage from './assets/img/img15.jpg';
import detailImage from './assets/img/img5.jpg';

const navItems = [
  { href: '#inicio', label: 'Inicio' }, { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' }, { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];
const Arrow = ({ diagonal = false }) => <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
function BookingAction({ className, children, ariaLabel, serviceTitle, onClick }) {
  return <a className={className} href={getWhatsAppUrl(serviceTitle)} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} onClick={onClick}>{children}</a>;
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header"><div className="header-inner page-shell">
    <a className="brand" href="#inicio" aria-label="Catrina Salón & Peluquería, ir al inicio" onClick={() => setOpen(false)}>
      <img src={logo} alt="" width="54" height="54" /><span>CATRINA <small>SALÓN & PELUQUERÍA</small></span>
    </a>
    <nav className={`site-nav ${open ? 'is-open' : ''}`} id="site-navigation" aria-label="Navegación principal">
      {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <BookingAction className="nav-book" onClick={() => setOpen(false)}>Agendar cita <Arrow diagonal /></BookingAction>
    </nav>
    <button className={`menu-toggle ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span></span><span></span></button>
  </div></header>;
}

function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy page-shell"><div className="hero-copy-inner">
      <h1 id="hero-title">El arte de<br /><em>sentirte tú.</em></h1>
      <p className="hero-description">Elegancia, estilo y belleza que resaltan tu esencia. Un espacio para descubrir el look que habla de ti.</p>
      <div className="hero-actions"><BookingAction className="button button-gold">Agendar por WhatsApp <Arrow diagonal /></BookingAction><a className="text-link" href="#servicios">Explorar servicios <Arrow /></a></div>
    </div></div>
    <div className="hero-image-wrap"><img src={heroImage} alt="Catrina con maquillaje artístico, cabello rosa, corona floral y vestido negro" fetchPriority="high" /></div>
    <a className="hero-scroll" href="#servicios" aria-label="Desplazarse a servicios">DESCUBRE <span>↓</span></a>
  </section>;
}

const servicePhotos = services.map((service) => ({ src: service.image, alt: service.alt }));
function Services({ onSelect }) {
  return <section className="services-section section-padding" id="servicios" aria-labelledby="services-title"><div className="page-shell">
    <div className="services-top"><div data-reveal><p className="eyebrow">01 / Nuestros servicios</p><h2 id="services-title">Belleza hecha<br /><em>a tu medida.</em></h2></div><div className="services-top-copy" data-reveal><p>Un momento para ti, pensado alrededor de tu estilo. Explora algunas de las posibilidades que inspiran nuestro trabajo.</p><small>Selección de servicios por confirmar con el salón.</small></div></div>
    <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title} data-reveal style={{ '--delay': `${index * 90}ms` }}>
      <button className="service-image" type="button" onClick={() => onSelect(index)} aria-label={`Ampliar imagen: ${service.alt}`}><img src={service.image} alt={service.alt} loading="lazy" /><span className="service-number">0{index + 1}</span><span className="service-zoom" aria-hidden="true">↗</span></button>
      <div className="service-content"><div><h3>{service.title}</h3><p>{service.description}</p></div><BookingAction className="circle-link" ariaLabel={`Consultar sobre ${service.title}`} serviceTitle={service.title}><Arrow diagonal /></BookingAction></div>
    </article>)}</div>
  </div></section>;
}

function Gallery({ onSelect }) {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const columns = width <= 520
    ? [gallery.map((_, index) => index)]
    : width <= 1050
      ? [[0, 2, 4, 6], [1, 3, 5]]
      : [[0, 4], [1, 3, 5], [2, 6]];
  return <section className="gallery-section section-padding" id="galeria" aria-labelledby="gallery-title"><div className="page-shell">
    <div className="gallery-heading" data-reveal><div><p className="eyebrow">02 / Nuestro trabajo</p><h2 id="gallery-title">Cada detalle<br /><em>cuenta.</em></h2></div><p>Color, forma y expresión. Una mirada a los estilos que han pasado por Catrina.</p></div>
    <div className="gallery-grid">{columns.map((column, columnIndex) => <div className="gallery-column" key={columnIndex}>{column.map((index) => {
      const item = gallery[index];
      return <button className="gallery-item" type="button" key={item.src} onClick={() => onSelect(index)} aria-label={`Ampliar imagen: ${item.alt}`}><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" /><span className="gallery-item-overlay"><span>VER IMAGEN</span><span>↗</span></span></button>;
    })}</div>)}</div>
  </div></section>;
}

function Lightbox({ items, index, onClose, onChange }) {
  const closeRef = useRef(null), touchStart = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement, oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (event.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
      if (event.key === 'Tab') {
        const controls = Array.from(document.querySelectorAll('.lightbox button'));
        const current = controls.indexOf(document.activeElement);
        if (event.shiftKey && current === 0) { event.preventDefault(); controls[controls.length - 1].focus(); }
        else if (!event.shiftKey && current === controls.length - 1) { event.preventDefault(); controls[0].focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', onKey); previousFocus?.focus(); };
  }, [items, index, onClose, onChange]);
  const item = items[index];
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería de trabajos" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 55) onChange((index + (delta < 0 ? 1 : -1) + items.length) % items.length); touchStart.current = null; }}>
    <button ref={closeRef} className="lightbox-close" type="button" onClick={onClose} aria-label="Cerrar galería">×</button>
    <button className="lightbox-prev" type="button" onClick={() => onChange((index - 1 + items.length) % items.length)} aria-label="Imagen anterior">←</button>
    <figure><img src={item.src} alt={item.alt} /><figcaption><span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>{item.alt}</figcaption></figure>
    <button className="lightbox-next" type="button" onClick={() => onChange((index + 1) % items.length)} aria-label="Imagen siguiente">→</button>
  </div>;
}

function About() {
  return <section className="about-section section-padding" id="nosotros" aria-labelledby="about-title"><div className="page-shell about-grid"><div className="about-visual" data-reveal><img className="about-main" src={aboutImage} alt="Maquillaje artístico frente al letrero de Catrina Salón & Peluquería" loading="lazy" /><div className="about-detail"><img src={detailImage} alt="Detalle de un trabajo de color y corte de cabello" loading="lazy" /></div></div><div className="about-copy" data-reveal><p className="eyebrow">03 / Sobre Catrina</p><h2 id="about-title">Más que un salón,<br /><em>una experiencia.</em></h2><p>Creemos en la belleza que se siente propia. En escuchar, cuidar los detalles y crear un espacio donde puedas disfrutar cada paso de tu transformación.</p><p>Desde un cambio sutil hasta una nueva forma de expresarte, cada visita es una oportunidad para celebrar tu estilo.</p><a className="text-link text-link-dark" href="#galeria">Conoce nuestro trabajo <Arrow /></a></div></div></section>;
}

const benefits = [
  { number: '01', title: 'Tu estilo, primero', copy: 'Una experiencia pensada para escucharte y encontrar lo que va contigo.' },
  { number: '02', title: 'El detalle importa', copy: 'Cuidamos la forma, el color y los acabados que hacen único cada look.' },
  { number: '03', title: 'Un momento para ti', copy: 'Un espacio para detenerte, disfrutar y salir sintiéndote bien.' },
];
function Benefits() {
  return <section className="benefits-section section-padding" aria-labelledby="benefits-title"><div className="page-shell"><div className="benefits-heading" data-reveal><p className="eyebrow">La esencia Catrina</p><h2 id="benefits-title">La belleza está en<br /><em>cómo te hace sentir.</em></h2></div><div className="benefits-grid">{benefits.map((benefit) => <article className="benefit" key={benefit.number} data-reveal><span>{benefit.number} <span className="benefit-star">✦</span></span><h3>{benefit.title}</h3><p>{benefit.copy}</p></article>)}</div></div></section>;
}
function Testimonials() {
  if (!siteConfig.testimonials.length) return null;
  return <section className="testimonials-section section-padding" aria-labelledby="testimonials-title"><div className="page-shell"><p className="eyebrow">Voces de Catrina</p><h2 id="testimonials-title">Lo que dicen de nosotros.</h2><div className="testimonials-grid">{siteConfig.testimonials.map((item) => <blockquote key={item.name}><p>“{item.quote}”</p><footer>— {item.name}</footer></blockquote>)}</div></div></section>;
}
function BookingCTA() {
  return <section className="booking-section" aria-labelledby="booking-title"><div className="page-shell booking-content" data-reveal><p className="eyebrow">El siguiente paso</p><h2 id="booking-title">Tu próxima transformación<br /><em>comienza aquí.</em></h2><p>Cuéntanos qué tienes en mente y hagamos espacio para tu próximo momento especial.</p><BookingAction className="button button-dark">Agendar por WhatsApp <Arrow diagonal /></BookingAction></div></section>;
}
function Contact() {
  const { contact } = siteConfig;
  return <section className="contact-section section-padding" id="contacto" aria-labelledby="contact-title">
    <div className="page-shell contact-grid">
      <div data-reveal><p className="eyebrow">04 / Contacto</p><h2 id="contact-title">Nos encantará<br /><em>verte pronto.</em></h2><p className="contact-lead">¿Lista para darle forma a tu próximo look? Escríbenos y descubre cómo podemos acompañarte.</p><BookingAction className="text-link">Iniciar conversación <Arrow diagonal /></BookingAction></div>
      <div className="contact-details" data-reveal>
        <div><span className="contact-label">VISÍTANOS</span><address>{contact.address}</address></div>
        <div><span className="contact-label">HORARIOS</span><p>{contact.hours.days}<br /><span className="contact-hours-time">{contact.hours.time}</span></p></div>
        <div><span className="contact-label">WHATSAPP</span><p><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">{getWhatsAppDisplay()} <Arrow diagonal /></a></p></div>
        {contact.socials.length > 0 && <div><span className="contact-label">SÍGUENOS</span><div className="social-links">{contact.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label} <Arrow diagonal /></a>)}</div></div>}
      </div>
    </div>
    <div className="page-shell contact-map" data-reveal>
      <div className="contact-map-frame"><iframe src={getMapsEmbedUrl()} title="Mapa de Catrina Salón & Peluquería en Google Maps" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      <div className="contact-map-bottom"><span>Encuentra tu camino a Catrina</span><a className="button button-gold" href={getMapsDirectionsUrl()} target="_blank" rel="noopener noreferrer">Cómo llegar <Arrow diagonal /></a></div>
    </div>
  </section>;
}
function Footer() {
  const { contact } = siteConfig;
  return <footer className="site-footer"><div className="page-shell">
    <div className="footer-main">
      <a className="footer-brand" href="#inicio"><img src={logo} alt="Logotipo de Catrina Salón & Peluquería" loading="lazy" /><span>Un espacio para expresarte,<br />un momento para ti.</span></a>
      <nav aria-label="Navegación del pie de página">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      {(contact.whatsapp || contact.socials.length > 0) && <div className="footer-contact">{contact.whatsapp && <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp · {getWhatsAppDisplay()} <Arrow diagonal /></a>}{contact.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label} <Arrow diagonal /></a>)}</div>}
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Catrina Salón & Peluquería. Todos los derechos reservados.</span><a href="#inicio">Volver arriba ↑</a></div>
  </div></footer>;
}
function App() {
  const [lightbox, setLightbox] = useState(null);
  useReveal();
  useEffect(() => {
    const { contact } = siteConfig;
    const schema = { '@context': 'https://schema.org', '@type': 'BeautySalon', name: siteConfig.name, description: 'Salón de belleza y peluquería dedicado al estilo y cuidado personal.' };
    if (contact.address) schema.address = contact.address;
    if (contact.whatsapp) schema.telephone = `+${contact.whatsapp.replace(/\D/g, '')}`;
    if (contact.socials.length) schema.sameAs = contact.socials.map((social) => social.url);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return <><Header /><main><Hero /><div className="intro-strip"><div className="page-shell intro-strip-inner"><span>✦</span><p>Tu estilo tiene una historia. Nos encanta ser parte de ella.</p><span>✦</span></div></div><Services onSelect={(index) => setLightbox({ items: servicePhotos, index })} /><Gallery onSelect={(index) => setLightbox({ items: gallery, index })} /><About /><Benefits /><Testimonials /><BookingCTA /><Contact /></main><Footer />{lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={() => setLightbox(null)} onChange={(index) => setLightbox((current) => ({ ...current, index }))} />}</>;
}
export default App;
