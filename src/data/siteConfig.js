import img3 from '../assets/img/img3.jpg';
import img4 from '../assets/img/img4.jpg';
import img5 from '../assets/img/img5.jpg';
import img6 from '../assets/img/img6.jpg';
import img7 from '../assets/img/img7.jpg';
import img9 from '../assets/img/img9.jpg';
import img11 from '../assets/img/img11.jpg';
import img12 from '../assets/img/img12.jpg';
import img13 from '../assets/img/img13.jpg';
import img14 from '../assets/img/img14.jpg';
import img15 from '../assets/img/img15.jpg';

// Completar únicamente con datos confirmados por el salón.
export const siteConfig = {
  name: 'Catrina Salón & Peluquería',
  bookingMessage: 'Hola, buen día. Vi su página web de Catrina Salón & Peluquería y me gustaría solicitar información para agendar una cita.',
  contact: {
    whatsapp: '528115289615', // México: código de país + número.
    address: 'Luis Donaldo Colosio, Calle 1 Ote. 545-B, Adolfo López Mateos, 67485, Ciudad Santa Catarina, Nuevo León, México.',
    hours: {
      days: 'Lunes a domingo',
      time: '12:00 p. m. – 8:00 p. m.',
    },
    maps: {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d449.43477183546577!2d-100.4509287!3d25.6885874!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866299b196368f0d%3A0xe400b2807d2d2e5d!2sEstetica%20Catrina!5e0!3m2!1ses-419!2smx!4v1793729086606!5m2!1ses-419!2smx',
      latitude: 25.6886436,
      longitude: -100.4506945,
    },
    socials: [], // { label: 'Instagram', url: 'https://...' }
  },
  testimonials: [], // { name: 'Nombre real', quote: 'Opinión autorizada' }
};

export function getWhatsAppUrl(serviceTitle) {
  const message = serviceTitle
    ? `Hola, buen día. Vi su página web y me gustaría solicitar información sobre el servicio de ${serviceTitle} para agendar una cita.`
    : siteConfig.bookingMessage;
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppDisplay() {
  const local = siteConfig.contact.whatsapp.replace(/\D/g, '').slice(2);
  return local.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1 $2 $3');
}

export function getMapsEmbedUrl() {
  return siteConfig.contact.maps.embedUrl;
}

export function getMapsDirectionsUrl() {
  const { latitude, longitude } = siteConfig.contact.maps;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}`;
}

// Propuesta visual. Confirmar el menú real antes de publicar.
export const services = [
  { title: 'Corte & estilo', description: 'Formas y acabados para renovar tu look con personalidad.', image: img11, alt: 'Corte de cabello corto con diseño de color' },
  { title: 'Color & luz', description: 'Matices y contrastes que dan dimensión y vida a tu cabello.', image: img9, alt: 'Trabajo de color y mechas en cabello largo' },
  { title: 'Peinados', description: 'Detalles y movimiento para acompañar tus momentos especiales.', image: img14, alt: 'Peinados de trenzas realizados en el salón' },
  { title: 'Maquillaje artístico', description: 'Expresión creativa para un look que no pase desapercibido.', image: img6, alt: 'Maquillaje artístico de Catrina' },
];

export const gallery = [
  { src: img12, alt: 'Cabello largo con color rojizo y ondas', width: 1536, height: 2048 },
  { src: img7, alt: 'Trabajo de iluminación y matices en cabello ondulado', width: 2048, height: 2048 },
  { src: img4, alt: 'Cabello lacio en tono cobrizo', width: 1536, height: 2048 },
  { src: img15, alt: 'Maquillaje artístico inspirado en Catrina', width: 1536, height: 2048 },
  { src: img5, alt: 'Corte y color en cabello rubio', width: 1200, height: 1600 },
  { src: img13, alt: 'Comparativa de transformación de color de cabello', width: 1536, height: 2048 },
  { src: img3, alt: 'Corte bob rubio con acabado lacio', width: 1536, height: 2048 },
];
