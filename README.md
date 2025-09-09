# coop

> Donde las ideas encuentran forma, alas y sentido.

**coop** es una estructura flexible que se arma a la medida de cada proyecto. Un lugar donde los talentos correctos se conectan para lograr cosas que nadie podría hacer solo.

---

## 🎯 **Visión**

Que ninguna idea se quede sin nacer por falta de estructura, equipo o dirección.

Queremos ser donde las ideas encuentren forma, alas y sentido. Una referencia para quienes buscan una forma más inteligente y honesta de hacer las cosas.

Soñamos con un ecosistema donde la **inteligencia**, la **creatividad** y la **cooperación** reemplacen el ruido, la burocracia y los egos.

---

## 🚀 **Misión**

Lo nuestro es **resolver**, **proponer**, **ejecutar**.

**coop** es una estructura flexible que se arma a la medida de cada proyecto. Seleccionamos talento con precisión y trabajamos con equipos compactos pero poderosos.

Sin desperdicios, sin jerarquías de más y sin trajes forzados.

**Estrategia, creatividad y huevos**: lo esencial para que las ideas crezcan. Con profesionalismo, con ingenio... y con un toque de actitud.

---

## 🎨 **Personalidad**

**coop** no cabe en etiquetas.

No somos agencia ni estudio ni colectivo. Somos un **modelo propio**: estratégico, creativo y con una manera muy nuestra de hacer las cosas.

Tenemos una voz clara, una visión práctica y una actitud que combina inteligencia, colaboración y una dosis justa de ingenio.

### En pocas palabras

- **Siempre**, estratégicos; **siempre**, auténticos
- Profesionales, sin rigidez  
- Ingeniosos, sin sobreactuar
- Flexibles sin perder foco
- Directos, pero amables
- Curiosos sin descanso
- Creativos con intención

Y cuando hace falta... **con huevos** 🥚

---

## 🛠️ **Tecnología**

Este proyecto está construido con tecnologías modernas para crear experiencias web excepcionales:

### Stack Principal

- **[Next.js 15](https://nextjs.org/)** - Framework de React para producción
- **[Payload CMS](https://payloadcms.com/)** - Sistema de gestión de contenido headless
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipado estático
- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL

### Características

- 🎨 **Diseño responsive** adaptable a cualquier dispositivo
- ⚡ **Rendimiento optimizado** con Next.js y SSR
- 📝 **CMS flexible** para gestión de contenido
- 🔒 **Autenticación integrada** con Payload
- ☁️ **Cloud-ready** para despliegue en Payload Cloud
- 📱 **PWA ready** para experiencias móviles nativas

---

## 🚀 **Desarrollo**

### Requisitos previos

- Node.js 18+ 
- npm o yarn
- MongoDB (local o remoto)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd the-coop

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Ejecutar en desarrollo
npm run dev
```

### Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción  
npm run start        # Servidor de producción
npm run lint         # Linter de código
npm run generate:types # Generar tipos de Payload
```

### Estructura del proyecto

```
src/
├── app/
│   ├── (frontend)/     # Aplicación frontend
│   └── (payload)/      # Panel de administración CMS
├── collections/        # Colecciones de Payload
├── components/         # Componentes React reutilizables
└── payload.config.ts   # Configuración de Payload CMS

public/                 # Archivos estáticos
```

---

## 🎨 **Paleta de colores**

```css
--gris: #232323      /* Fondo principal */
--naranja: #ee6123    /* Acento principal */
--amarillo: #ffcf00   /* Acento secundario */
--beige: #FEF4C7      /* Acento suave */
--blanco: #fff        /* Texto principal */
```

---

## 📦 **Despliegue**

### Payload Cloud (Recomendado)
```bash
# Conectar con Payload Cloud
npx payload login
npx payload deploy
```

### Otros proveedores
- **Vercel**: Conecta tu repositorio para despliegue automático
- **Netlify**: Soporte para SSR y funciones serverless
- **Railway**: Despliegue sencillo con base de datos incluida

---

## 🤝 **Contribuir**

Las mejores ideas surgen de la colaboración. Si tienes algo que aportar:

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-idea`)
3. Commit tus cambios (`git commit -m 'Agregar nueva idea'`)
4. Push a la rama (`git push origin feature/nueva-idea`)
5. Abre un Pull Request

---

## 📄 **Licencia**

Este proyecto representa nuestra forma de hacer las cosas. Úsalo, aprende de él, mejóralo.

---

**coop** - *Donde las ideas encuentran su camino*

*Hecho con inteligencia, creatividad y cooperación* 🚀