# Claude Development Context - coop Project

## Project Overview

**coop** is a modern web application built with Next.js 15 and Payload CMS, representing a flexible structure that adapts to each project's needs. The platform embodies the philosophy of connecting the right talents to achieve things no one could do alone.

### Brand Identity
- **Vision**: No idea should remain unborn due to lack of structure, team, or direction
- **Mission**: Resolve, propose, execute - with strategy, creativity, and courage
- **Personality**: Strategic yet authentic, professional without rigidity, ingenious without overacting
- **Voice**: Direct but kind, curious without rest, creative with intention

## Technical Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **Payload CMS** - Headless CMS for content management
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database (configured for Payload Cloud)
- **Sharp** - Image processing

### Current Project Structure
```
src/
├── app/
│   ├── (frontend)/          # Public-facing application
│   │   ├── layout.tsx       # Root layout with Anek Latin font
│   │   ├── page.tsx         # Homepage with Hero component
│   │   └── styles.css       # Global styles with color system
│   └── (payload)/           # CMS admin interface
├── collections/
│   └── Media.ts             # Media upload collection
├── components/
│   └── Hero.tsx             # Dynamic hero component with scroll effects
└── payload.config.ts        # Payload CMS configuration
```

## Design System

### Color Palette (CSS Custom Properties)
```css
--gris: #232323      /* Background - primary dark */
--naranja: #ee6123    /* Primary accent - coop brand color */
--amarillo: #ffcf00   /* Secondary accent - yellow */
--beige: #FEF4C7      /* Soft accent - cream */
--blanco: #fff        /* Text - white */

/* Semantic variables */
--color-primary: var(--naranja)
--color-secondary: var(--amarillo)
--color-accent: var(--beige)
--color-text: var(--blanco)
--color-background: var(--gris)
```

### Typography
- **Primary Font**: Anek Latin (Google Fonts)
- **Fallbacks**: system-ui, sans-serif
- **Font Weights**: 100-800 (variable font)
- **Loading**: Proper crossorigin configuration for performance

## Hero Component Architecture

### Key Features
1. **Dynamic Height**: Automatically adjusts based on number of headings
2. **Scroll-Based Activation**: Each heading appears on viewport scroll
3. **Fixed Center Image**: SVG logo stays centered while text changes around it
4. **Smart Color Switching**: Image changes from orange to white after first heading
5. **Responsive Text Positioning**: Fixed pixel-based positioning around center image

### Implementation Details
```typescript
// Dynamic height calculation
const headingCount = headingsRef.current.children.length
heroElement.style.height = `${headingCount * 100}vh`

// Scroll detection
const headingIndex = Math.floor(scrollY / windowHeight)
setActiveHeading(headingIndex)
```

### Text Layout System
- **Fixed Center Image**: `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)`
- **Left Text**: `right: calc(50% + 140px); text-align: right`
- **Right Text**: `left: calc(50% + 140px); text-align: left`
- **Responsive**: Uses fixed pixel calculations instead of percentages

## Content Management

### Media Collection
- Configured for file uploads with required alt text
- Cloud storage ready (S3 via Payload Cloud)
- Sharp integration for image processing
- Public read access enabled

### Authentication
- Payload's built-in auth system
- Header-based authentication for SSR compatibility

## Development Workflow

### Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
npm run generate:types # Generate Payload types
```

### Environment Setup
- Font loading with proper crossorigin attributes
- MongoDB connection via Payload Cloud
- TypeScript strict mode enabled
- CSS custom properties for theming

## Current Features

### Homepage Experience
1. **Animated Hero Section**: 7 sequential headings with fade transitions
2. **Brand Messaging**: Progressive revelation of coop's story
3. **Visual Hierarchy**: Fixed logo with contextual color changes
4. **Smooth Interactions**: 0.6s transitions for professional feel

### Text Content Sequence
1. "Bienvenidos a **coop**"
2. "**coop** se pronuncia 'kup'"
3. "**coop** es **coop**eración"
4. "y **coop** existe para tus ideas"
5. "= ideas"
6. "ideas llenas de posibilidades"
7. "y queremos desarrollarlas contigo"

## Performance Optimizations

### Font Loading
- Preconnect to Google Fonts
- Proper crossorigin configuration
- Font-display: swap for better loading

### Image Handling
- SVG optimization for sharp rendering
- CSS filters for dynamic color changes
- Smooth transitions with GPU acceleration

### CSS Architecture
- Custom properties for consistent theming
- Mobile-first responsive design
- Efficient selector specificity

## Future Development Notes

### Potential Enhancements
1. **CMS Integration**: Make hero content editable via Payload
2. **Animation Library**: Consider Framer Motion for more complex animations
3. **SEO Optimization**: Add meta tags and structured data
4. **Performance**: Implement image optimization and lazy loading
5. **PWA Features**: Add service worker and manifest

### Brand Guidelines
- Always maintain the balance of professionalism and authenticity
- Use orange (naranja) sparingly but effectively
- Ensure readability with high contrast
- Keep interactions smooth and intentional

### Technical Considerations
- Maintain TypeScript strict mode
- Follow Next.js 15 App Router patterns
- Keep components small and focused
- Use semantic HTML for accessibility

## Asset Management

### Recommended Structure
```
public/
├── images/          # Static images, logos, icons
│   └── coop.svg    # Main brand logo (currently orange)
├── fonts/           # Custom fonts if needed
└── icons/           # Favicon and app icons
```

### Media Uploads
- Managed through Payload CMS Media collection
- Cloud storage via S3 (Payload Cloud)
- Automatic image optimization with Sharp

## Deployment Configuration

### Payload Cloud (Recommended)
- Automatic S3 storage for media
- MongoDB Atlas integration
- Environment variable management
- SSL and CDN included

### Alternative Platforms
- **Vercel**: Excellent Next.js support
- **Netlify**: Good for static generation
- **Railway**: Simple full-stack deployment

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface definitions for props
- No any types allowed

### CSS
- Use custom properties for theming
- Mobile-first media queries
- Semantic class naming
- Avoid deeply nested selectors

### React
- Functional components with hooks
- Proper useEffect dependencies
- TypeScript prop interfaces
- Performance optimizations with useMemo/useCallback when needed

---

## Getting Started for New Development

1. **Environment Setup**
   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

2. **Key Files to Understand**
   - `src/app/(frontend)/page.tsx` - Homepage
   - `src/components/Hero.tsx` - Main hero component
   - `src/app/(frontend)/styles.css` - Global styles and theme
   - `payload.config.ts` - CMS configuration

3. **Brand Assets**
   - Logo: `/public/images/coop.svg`
   - Colors: Defined in CSS custom properties
   - Font: Anek Latin from Google Fonts

4. **Development Approach**
   - Always test responsive behavior
   - Maintain brand consistency
   - Follow TypeScript best practices
   - Consider CMS integration for new content

---

*Last updated: 2025-09-09*
*Project: coop - Donde las ideas encuentran forma, alas y sentido*