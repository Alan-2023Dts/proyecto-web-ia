# Explorador Interactivo de Información

Aplicación web académica para explorar personajes de la serie **Rick and Morty** mediante la [Rick and Morty API](https://rickandmortyapi.com/).

## Características

- Consulta de personajes reales mediante `fetch()`.
- Visualización de imagen, nombre, estado, especie y ubicación.
- Buscador por nombre.
- Filtros por estado y especie.
- Paginación de resultados.
- Favoritos persistentes con `localStorage`.
- Mensajes para resultados vacíos y errores de API o red.
- Diseño responsive para celular, tablet y computadora.

## Tecnologías

- HTML5 semántico.
- CSS3 con diseño responsive.
- JavaScript vanilla (ES6+).
- Rick and Morty API.
- GitHub Pages.

## Ejecución

Abre `index.html` en un navegador o visita la versión publicada en GitHub Pages cuando esté habilitada. La aplicación no requiere instalación ni servidor local.

## Estructura

```text
├── index.html
├── style.css
├── script.js
└── README.md
```

## Uso de Inteligencia Artificial

Esta sección documenta de forma transparente el apoyo de IA durante el desarrollo.

### Tres prompts importantes utilizados

1. "Diseña la arquitectura de una aplicación web con HTML, CSS y JavaScript para consultar la Rick and Morty API, incluyendo buscador, filtros y favoritos."
2. "Implementa una función JavaScript que consuma la API con fetch(), gestione errores de red y muestre mensajes cuando no haya resultados."
3. "Revisa la interfaz y propón mejoras responsive y de accesibilidad para una cuadrícula de tarjetas de personajes."

### Respuesta de IA que requirió corrección

Una primera propuesta filtraba los favoritos únicamente sobre los personajes cargados en la página actual. Esto podía mostrar un mensaje vacío aunque existieran favoritos guardados en otra página de la API.

### Error encontrado y resolución

Se identificó que la API responde con estado HTTP `404` cuando una búsqueda no encuentra personajes. Se resolvió comprobando `response.ok`, diferenciando el caso de resultados inexistentes de otros errores de servidor y mostrando un mensaje claro al usuario.

### Modificación explicable realizada al código

Se añadió un estado centralizado en `script.js` para controlar personajes, página actual, filtros y favoritos. También se incorporó la clave `rick-morty-favorites` en `localStorage`, de modo que los favoritos permanecen disponibles después de cerrar o recargar el navegador.

### Reflexión sobre el aprendizaje

La IA ayudó a acelerar la planificación y a detectar casos de error, pero fue necesario revisar, probar y adaptar sus sugerencias. El aprendizaje principal fue que una respuesta generada debe validarse contra la documentación de la API, la experiencia del usuario y los requisitos de evaluación antes de integrarse.

## Control de calidad y entregables

Durante el desarrollo se registrarán los avances mediante commits distribuidos, Issues y Pull Requests. También se verificará la publicación mediante GitHub Pages y el cumplimiento de todos los requisitos funcionales y académicos.

## Licencia

Proyecto académico de uso educativo.
