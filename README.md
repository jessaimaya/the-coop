# 🥚 coop

**coop existe para las ideas.**

Trabajamos con personas que tienen algo en mente —a veces claro, a veces no tanto— y necesitan apoyo de alguien que lo traduzca en algo concreto, funcional y con sentido.

Somos un espacio donde el marketing se piensa, se siente y se ejecuta con inteligencia. Nos gusta pensar que ayudamos a que las ideas nazcan, crezcan y encuentren su camino.

---

## ¿Qué es coop?

**coop no cabe en etiquetas.**

No somos agencia ni estudio ni colectivo. Somos un modelo propio: estratégico, creativo y con una manera muy nuestra de hacer las cosas. Tenemos una voz clara, una visión práctica y una actitud que combina inteligencia, colaboración y una dosis justa de ingenio.

### Visión
Que ninguna idea se quede sin nacer por falta de estructura, equipo o dirección.

Queremos ser donde las ideas encuentren forma, alas y sentido. Una referencia para quienes buscan una forma más inteligente y honesta de hacer las cosas.

### Misión
Lo nuestro es resolver, proponer, ejecutar.

coop es una estructura flexible que se arma a la medida de cada proyecto. Seleccionamos talento con precisión y trabajamos con equipos compactos pero poderosos. Sin desperdicios, sin jerarquías de más y sin trajes forzados.

**Estrategia, creatividad y huevos: lo esencial para que las ideas crezcan.**

### En pocas palabras
- **Siempre estratégicos, siempre auténticos**
- **Profesionales, sin rigidez**
- **Ingeniosos, sin sobreactuar**
- **Flexibles sin perder foco**
- **Directos, pero amables**
- **Curiosos sin descanso**
- **Creativos con intención**

### El huevo 🥚

En coop, el huevo representa la posibilidad: una idea que está por nacer, por crecer o por transformarse. Un símbolo sencillo, pero con profundidad —como todo lo que nos gusta hacer.

Es gestación, es inicio, es contenedor de potencial. Y también es ingenio, esfuerzo y carácter.

---

## Este Proyecto

Una experiencia web interactiva que presenta la esencia de coop a través de animaciones fluidas y narrativa visual. Construida con tecnologías modernas para crear una presentación inmersiva que refleja nuestra filosofía: simple en apariencia, profundo en intención.

### ⚡ Stack Técnico

- **React 19** - Framework de UI
- **Vite** - Build tool y dev server
- **Rive** - Animaciones interactivas y vectoriales
- **CSS-in-JS** - Estilos integrados con lógica de componentes

### 🎯 Características

- **Animación scroll-controlled** - La narrativa principal se desarrolla con el scroll del usuario
- **Rive Animations** - Animaciones vectoriales fluidas y interactivas
- **Responsive Design** - Optimizado para todos los dispositivos
- **Performance optimizado** - Scroll throttling y animaciones eficientes
- **State Machine Integration** - Lógica compleja de animaciones con Rive

---

## Empezar

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 8.0.0
```

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]
cd the-coop

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción  
npm run preview  # Preview del build
npm run lint     # Linting con ESLint
```

---

## Estructura del Proyecto

```
the-coop/
├── public/
│   ├── thecoop.riv          # Animación principal
│   └── para_abajo.riv       # Animación de scroll indicator
├── src/
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos del componente principal
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Punto de entrada
├── package.json
└── vite.config.js
```

### Animaciones Rive

**thecoop.riv** - Animación principal scroll-controlled
- Contiene la animación "ScrollingText" 
- Se controla mediante scrubbing basado en scroll
- Duración dinámica adaptada al contenido

**para_abajo.riv** - Indicador de scroll
- State machine con loops automáticos
- Se muestra durante los primeros 85% de la animación principal
- Desaparece suavemente cuando se completa la narrativa principal

### Lógica de Scroll

La experiencia se divide en secciones:
- **0-85%**: Animación principal + indicador activos
- **85-100%**: Solo animación principal
- **100%+**: Contenido post-animación

---

## Desarrollo

### Patrones de Código

**Estado minimalista**: Solo el estado necesario (ej: `showBottomRive`)

**Performance primero**: 
- Throttling en scroll events
- `requestAnimationFrame` para animaciones
- Cleanup apropiado de event listeners

**Estilos inline intencionales**: 
- Mantiene la lógica de estilo cerca de la lógica de componente
- Facilita el control dinámico basado en estado

### Extensibilidad

El proyecto está estructurado para facilitar:
- Adición de nuevas secciones de contenido
- Integración de más animaciones Rive
- Modificación de timing de animaciones
- Personalización de breakpoints responsive

---

## Filosofía de Código

Como coop, creemos en código que es:
- **Claro en intención**
- **Eficiente sin sobre-optimización**  
- **Mantenible sin sobrediseño**
- **Funcional con estilo**

Cada línea tiene propósito. Cada animación cuenta una historia. Cada interacción importa.

---

**En coop, no solo acompañamos: ayudamos a avanzar.**

---

*Construido con 🥚 por coop*