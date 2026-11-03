import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { gallery, getMapsDirectionsUrl, getMapsEmbedUrl, getWhatsAppUrl, services, siteConfig } from './data/siteConfig';

test('opens the gallery and navigates with the keyboard', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Ampliar imagen: Cabello largo/i }));
  expect(screen.getByRole('dialog', { name: 'Galería de trabajos' })).toBeInTheDocument();
  expect(screen.getByText(/01 \/ 07/)).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByText(/02 \/ 07/)).toBeInTheDocument();
  const dialog = screen.getByRole('dialog', { name: 'Galería de trabajos' });
  fireEvent.touchStart(dialog, { touches: [{ clientX: 250 }] });
  fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 100 }] });
  expect(screen.getByText(/03 \/ 07/)).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('dialog', { name: 'Galería de trabajos' })).not.toBeInTheDocument();
});

test('all booking links use the official number and encoded general message', () => {
  render(<App />);
  expect(screen.queryByText('Belleza con identidad')).not.toBeInTheDocument();
  const generalUrl = getWhatsAppUrl();
  expect(generalUrl).toBe(`https://wa.me/528115289615?text=${encodeURIComponent(siteConfig.bookingMessage)}`);
  const links = [...document.querySelectorAll('a[href^="https://wa.me/"]')];
  expect(links.length).toBeGreaterThanOrEqual(10);
  links.forEach((link) => {
    expect(link.href).toContain('https://wa.me/528115289615?text=');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('each service has its own WhatsApp message and opens its full image', () => {
  render(<App />);
  services.forEach((service) => {
    const link = screen.getByRole('link', { name: `Consultar sobre ${service.title}` });
    const message = `Hola, buen día. Vi su página web y me gustaría solicitar información sobre el servicio de ${service.title} para agendar una cita.`;
    expect(link).toHaveAttribute('href', `https://wa.me/528115289615?text=${encodeURIComponent(message)}`);
    fireEvent.click(screen.getByRole('button', { name: `Ampliar imagen: ${service.alt}` }));
    const dialog = screen.getByRole('dialog', { name: 'Galería de trabajos' });
    expect(dialog.querySelector('figure img')).toHaveAttribute('src', service.image);
    fireEvent.mouseDown(dialog);
    expect(screen.queryByRole('dialog', { name: 'Galería de trabajos' })).not.toBeInTheDocument();
  });
  expect(screen.getAllByRole('button', { name: /^Ampliar imagen:/i })).toHaveLength(services.length + gallery.length);
});

test('contact shows the verified details and address-based map links', () => {
  render(<App />);
  expect(screen.getByText(siteConfig.contact.address)).toBeInTheDocument();
  expect(screen.getByText('Lunes a domingo')).toBeInTheDocument();
  expect(screen.getByText('12:00 p. m. – 8:00 p. m.')).toBeInTheDocument();
  expect(screen.getAllByText(/81 1528 9615/).length).toBeGreaterThan(0);
  expect(screen.getByTitle('Mapa de Catrina Salón & Peluquería en Google Maps')).toHaveAttribute('src', getMapsEmbedUrl());
  expect(screen.getByRole('link', { name: /Cómo llegar/i })).toHaveAttribute('href', getMapsDirectionsUrl());
  expect(getMapsEmbedUrl()).toContain('0x866299b196368f0d%3A0xe400b2807d2d2e5d');
  expect(getMapsDirectionsUrl()).toBe('https://www.google.com/maps/dir/?api=1&destination=25.6886436%2C-100.4506945');
});
