# 🌸 Tu Flor del Día

Una web móvil hermosa que muestra una flor única y una cita bonita cada día.

## ✨ Características

- 🎨 **Flores generadas proceduralmente** - Cada día genera una flor única y diferente
- 📖 **Citas hermosas** - Poemas y frases bonitas de libros y autores clásicos
- 📱 **Diseño responsive** - Optimizado para móviles, tablets y desktop
- 🎯 **Consistencia diaria** - La misma flor y cita durante todo el día, cambia al siguiente día
- ⚡ **Rápido y ligero** - Next.js estático para máximo rendimiento

## 🚀 Instalación

### Requisitos previos
- Node.js 16.8 o superior
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd ProyectoRuth
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

## 📦 Construcción y Despliegue

### Para GitHub Pages

1. **Compilar la aplicación**
   ```bash
   npm run export
   ```

2. **Los archivos estáticos están en la carpeta `out/`**
   - Sube esta carpeta a tu repositorio en la rama `gh-pages`
   - O configura GitHub Actions para desplegar automáticamente

### Para Vercel (Recomendado)

1. Push tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Vercel desplegará automáticamente

### Para Netlify

1. Compilar: `npm run export`
2. Sube la carpeta `out/` a Netlify
3. O conecta tu repositorio para despliegue automático

## ✏️ Personalización

### Agregar más citas

Edita el archivo `data/quotes.ts` y agrega más citas al array:

```typescript
{
  text: "Tu cita aquí",
  author: "Nombre del autor"
}
```

### Cambiar colores

En `components/FlowerGenerator.tsx`:
- Modifica los valores HSL en las variables de color
- Experimenta con diferentes valores de saturación y luminosidad

### Cambiar estilos

En `app/page.tsx`:
- Personaliza los colores del gradiente de fondo
- Ajusta tamaños de fuente y espaciado

## 📝 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales
├── components/
│   └── FlowerGenerator.tsx # Generador de flores SVG
├── data/
│   └── quotes.ts           # Base de datos de citas
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🔧 Desarrollo

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación
- `npm run export` - Exporta a HTML estático
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint

## 📱 Nota sobre dispositivos móviles

La aplicación es totalmente responsive y funciona perfectamente en:
- iPhones (todas las versiones)
- Android
- Tablets
- Desktop

Para instalar como app en iPhone:
1. Abre en Safari
2. Toca el botón de compartir
3. Selecciona "Añadir a Pantalla de Inicio"

## 🎨 Inspiración

Este proyecto está inspirado en:
- La belleza de las flores de la naturaleza
- La poesía y la literatura clásica
- El diseño minimalista moderno

## 📄 Licencia

Este proyecto es de código abierto y libre para usar y modificar.

## 💝 Dedicatoria

Hecho con ❤️ para alguien especial.

---

¿Preguntas o sugerencias? Siéntete libre de hacer cambios y experimentar con el código.
