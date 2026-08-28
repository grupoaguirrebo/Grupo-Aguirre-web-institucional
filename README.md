# Grupo Aguirre — landing institucional

Landing estática y responsive para Grupo Aguirre, orientada a reforzar credibilidad y derivar consultas de compras por volumen a WhatsApp.

## Desarrollo local

```bash
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

## Verificación

```bash
npm test
npm run build
npm run test:sites
```

## Despliegue

El proyecto no requiere variables de entorno ni servicios externos. `vercel.json` utiliza `dist/client` como salida estática.

## Contenido pendiente de una decisión del fundador

- Sustituir el símbolo institucional del bloque final por una fotografía real aprobada.
- Publicar una ubicación exacta solo cuando exista una dirección comercial lista para recibir clientes.
- Añadir dominio y correo corporativo cuando estén disponibles.
