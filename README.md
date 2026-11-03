# Catrina Salón & Peluquería

Propuesta de sitio web para presentar al salón. Desarrollado con React y la configuración existente de Create React App.

## Desarrollo

```bash
npm install
npm start
```

## Verificación y despliegue

```bash
CI=true npm test -- --watch=false
npm run build
```

La salida de producción se genera en `build/`. Vercel puede usar el preset **Create React App** con comando `npm run build` y directorio de salida `build`.

## Configuración y datos pendientes de confirmar

Editar `src/data/siteConfig.js` antes de publicar:

- `contact.whatsapp`: número oficial configurado como `528115289615`. Los botones abren `wa.me` con un mensaje general o uno específico para cada servicio.
- `contact.address` y `contact.hours`: dirección y horario proporcionados por el salón. `contact.maps` contiene el iframe oficial del establecimiento y las coordenadas verificadas para indicaciones.
- `contact.socials`: solo perfiles oficiales verificados.
- `testimonials`: solo opiniones reales autorizadas. La sección se muestra automáticamente si el arreglo contiene reseñas.
- `services`: confirmar categorías y descripciones con el salón. La selección actual es una propuesta basada en las fotografías disponibles.

La página no genera enlaces a perfiles sociales inexistentes. Las fotografías están en `src/assets/`.
