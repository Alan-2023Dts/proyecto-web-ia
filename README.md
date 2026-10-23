# Explorador Interactivo de Rick and Morty

## Integrante

- **Alan-2023Dts**

## Descripción

Aplicación web académica para consultar y explorar personajes de la serie
**Rick and Morty** mediante la [Rick and Morty API](https://rickandmortyapi.com/).
La interfaz permite buscar personajes por nombre, filtrar por estado y especie,
consultar los resultados mediante paginación y guardar personajes favoritos en
el navegador.

El proyecto está construido como una aplicación estática, sin servidor propio
ni dependencias externas que deban instalarse. La información de los
personajes se obtiene en tiempo real desde la API.

## Funcionalidades

- Consulta de personajes mediante `fetch()`.
- Visualización de imagen, nombre, estado, especie y última ubicación.
- Búsqueda por nombre.
- Filtros por estado y especie.
- Paginación de resultados.
- Gestión de favoritos.
- Persistencia de favoritos mediante `localStorage`.
- Mensajes para carga, resultados vacíos, errores de red y errores de la API.
- Diseño responsive para celulares, tablets y computadoras.
- Etiquetas semánticas y estados accesibles mediante atributos ARIA.

## Tecnologías utilizadas

- HTML5.
- CSS3 y diseño responsive.
- JavaScript vanilla (ES6+).
- Rick and Morty API.
- GitHub Pages.

## Instrucciones de uso

### Opción 1: abrir localmente

1. Descarga o clona este repositorio:

   ```bash
   git clone https://github.com/Alan-2023Dts/proyecto-web-ia.git
   ```

2. Abre el archivo `index.html` en un navegador moderno.
3. Escribe un nombre en el buscador o selecciona un estado o especie.
4. Usa **Mis favoritos** para mostrar los personajes guardados.
5. Pulsa la estrella de una tarjeta para añadir o quitar un favorito.
6. Usa **Limpiar** para restablecer la búsqueda y los filtros.

No es necesario instalar paquetes ni ejecutar un servidor local. Se requiere
conexión a Internet para consultar la API. Los favoritos se guardan en el
`localStorage` del navegador y pueden desaparecer si se borran los datos del
sitio.

### Opción 2: versión publicada

También puede utilizarse la versión publicada en GitHub Pages cuando esté
habilitada para el repositorio.

## Estructura del proyecto

```text
├── index.html   # Estructura de la interfaz
├── style.css    # Estilos y diseño responsive
├── script.js    # Consumo de la API e interacción
└── README.md    # Documentación del proyecto
```

## Prompts utilizados durante el desarrollo

Estos fueron algunos de los prompts principales utilizados como apoyo para
planificar, implementar y revisar el proyecto:

1. **Planificación:**
   “Diseña la arquitectura de una aplicación web con HTML, CSS y JavaScript
   para consultar la Rick and Morty API, incluyendo buscador, filtros y
   favoritos.”

2. **Consumo de API y errores:**
   “Implementa una función JavaScript que consuma la API con `fetch()`,
   gestione errores de red y muestre mensajes cuando no haya resultados.”

3. **Interfaz y accesibilidad:**
   “Revisa la interfaz y propón mejoras responsive y de accesibilidad para una
   cuadrícula de tarjetas de personajes.”

4. **Persistencia:**
   “Agrega favoritos persistentes con `localStorage` y permite alternar entre
   todos los personajes y los favoritos.”

Las respuestas generadas por IA fueron revisadas y adaptadas antes de
incorporarse al proyecto. La IA se utilizó como apoyo, no como sustituto de
las pruebas y decisiones de implementación.

## Dificultades encontradas y soluciones

### Manejo de búsquedas sin resultados

La API responde con código HTTP `404` cuando una búsqueda no encuentra
personajes. Se agregó una comprobación de `response.ok` para mostrar un
mensaje comprensible en lugar de dejar la interfaz en un estado ambiguo.

### Errores de red

Una consulta puede fallar aunque la API esté disponible, por ejemplo por falta
de conexión. El código diferencia los errores de red de los errores de la API
y muestra un mensaje específico para que el usuario pueda volver a intentarlo.

### Estado de filtros y paginación

Al cambiar el nombre, el estado o la especie, la consulta debe comenzar
nuevamente desde la primera página. Se centralizó la carga de personajes en
`fetchCharacters()` para mantener sincronizados los filtros, los resultados y
la paginación.

### Persistencia de favoritos

Los favoritos tenían que conservarse después de recargar la página. Se
resolvió guardando sus identificadores en `localStorage` con la clave
`rick-morty-favorites` y recuperándolos al iniciar la aplicación.

### Catálogo de especies

La API no proporciona un catálogo independiente de especies para construir el
selector. Por eso se incluyeron las especies más habituales como opciones
iniciales: `Alien`, `Animal`, `Human`, `Humanoid` y `Robot`.

### Limitación del filtro de favoritos

El filtro de favoritos se aplica sobre los personajes cargados en la página
actual de la API. Por ese motivo, un favorito guardado en otra página puede no
aparecer hasta volver a consultar esa página.

## Aprendizajes

El desarrollo permitió practicar el consumo de una API externa, la gestión de
estados en JavaScript, la persistencia en el navegador, el manejo explícito de
errores y la creación de una interfaz responsive. También se comprobó que las
respuestas generadas por IA deben validarse contra la documentación de la API,
el comportamiento real de la aplicación y los requisitos del proyecto.

## Licencia

Proyecto académico de uso educativo.
