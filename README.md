# Cars App 🚗

A modern, responsive web application built with **Astro**, **TypeScript**, and **Tailwind CSS** for managing car brands and models. This application provides a clean and user-friendly interface to interact with the [Cars API](https://github.com/rafaelcetina/cars-api) with advanced features like server-side rendering, dynamic content generation, and detailed model information.

## ✨ Features

### 🏠 Core Functionality

- **Brand Management**: View, create, and manage car brands with detailed information
- **Model Management**: Add models to brands with pricing information and specifications
- **Price Filtering**: Filter models by price range with real-time updates
- **Search Functionality**: Search models by name or brand with instant results
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS and Shadcn-inspired components

### 🚀 Advanced Features

- **Server-Side Rendering (SSR)**: Fast loading and SEO-optimized pages
- **Dynamic Routes**: Each brand has its own dedicated site with clean URLs
- **Model Detail Pages**: Comprehensive information pages for each car model
- **Content Generation**: AI-powered automatic content generation for car models
- **Real-time Content Creation**: Generate detailed Markdown content without page reload
- **Content Collections**: Organized storage and management of generated content
- **Breadcrumb Navigation**: Intuitive navigation throughout the application
- **Dark/Light Theme**: Toggle between themes for better user experience

### 📱 User Experience

- **Instant Feedback**: Real-time updates for all operations
- **Loading States**: Smooth loading animations and progress indicators
- **Error Handling**: Comprehensive error messages and recovery options
- **Accessibility**: WCAG compliant design with keyboard navigation
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator with SSR capabilities
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [Svelte](https://svelte.dev/) - Reactive components for interactive features
- **Server**: [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) - Node.js adapter for SSR
- **Content**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) - Type-safe content management
- **Icons**: [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **Linting**: [ESLint](https://eslint.org/) - Code quality and consistency
- **Formatting**: [Prettier](https://prettier.io/) - Code formatting

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cars-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321` (or the port shown in terminal) to see the application.

## 📁 Project Structure

```
cars-app/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.svelte
│   │   │   ├── Input.svelte
│   │   │   ├── Card.svelte
│   │   │   └── Badge.svelte
│   │   ├── BrandCard.svelte    # Brand display component
│   │   ├── ModelCard.svelte    # Model display component
│   │   ├── AddBrandForm.svelte # Brand creation form
│   │   ├── AddModelForm.svelte # Model creation form
│   │   ├── EditModelForm.svelte # Model editing form
│   │   ├── BrandsClient.svelte # Brands page logic
│   │   ├── ModelsClient.svelte # Models page logic
│   │   └── ThemeToggle.svelte  # Dark/light theme toggle
│   ├── layouts/
│   │   └── Layout.astro        # Main layout component
│   ├── lib/
│   │   ├── api.ts             # API service functions
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── index.astro        # Brands listing page (SSR)
│   │   ├── models.astro       # All models page (SSR)
│   │   ├── [brand].astro      # Brand-specific models page (SSR)
│   │   ├── [brand]/[model].astro # Model detail page (SSR)
│   │   ├── admin/
│   │   │   └── generate-content.astro # Content generation admin
│   │   └── api/
│   │       └── generate-car.ts # Content generation API endpoint
│   ├── content/
│   │   ├── cars/              # Generated car content (Markdown)
│   │   └── config.ts          # Content collection configuration
│   ├── styles/
│   │   └── global.css         # Global styles and Tailwind config
│   └── types/
│       └── api.ts             # TypeScript interfaces
├── scripts/
│   └── generate-car-content.js # Content generation script
├── public/                    # Static assets
├── .eslintrc.cjs             # ESLint configuration
├── .prettierrc               # Prettier configuration
├── astro.config.mjs          # Astro configuration with SSR
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🎯 API Integration

This application integrates with the [Cars API](https://cars-api-production.up.railway.app/) which provides the following endpoints:

### Brands

- `GET /brands` - List all brands
- `POST /brands` - Create a new brand

### Models

- `GET /brands/:id/models` - List models for a specific brand
- `POST /brands/:id/models` - Add a model to a brand
- `PUT /models/:id` - Update model price
- `GET /models` - List all models with optional price filtering

## 🌐 Routing & Navigation

### URL Structure

- **Home**: `/` - List of all car brands
- **Brand Models**: `/{brand-slug}` - Models for a specific brand (e.g., `/toyota`)
- **Model Details**: `/{brand-slug}/{model-slug}` - Detailed model information (e.g., `/toyota/camry`)
- **All Models**: `/models` - Complete list of all models across brands
- **Admin**: `/admin/generate-content` - Content generation interface

### Dynamic Routes

The application uses Astro's dynamic routing for SEO-friendly URLs:

- **Brand pages** are generated at build time for all available brands
- **Model pages** are generated for each model with comprehensive information
- **URL slugs** are automatically generated from brand/model names with special character handling

## 📝 Content Generation

### Automatic Content Creation

The application includes a powerful content generation system:

- **On-demand Generation**: Generate detailed content for any car model instantly
- **Rich Content**: Comprehensive information including specifications, features, safety ratings, and more
- **Markdown Format**: Structured content that's easy to read and maintain
- **No Page Reload**: Content is generated and displayed without refreshing the page

### Content Features

Generated content includes:

- 📊 **Technical Specifications**: Engine details, performance metrics, fuel economy
- 🛡️ **Safety Information**: NHTSA ratings, IIHS scores, safety features
- 💻 **Technology Features**: Infotainment systems, connectivity options
- 🪑 **Comfort & Interior**: Seating, climate control, premium features
- 🎨 **Design & Exterior**: Styling, lighting, wheel options
- 💰 **Pricing Information**: MSRP ranges and value propositions
- 🔧 **Maintenance Details**: Warranty information and service intervals

### Admin Interface

Access the content generation interface at `/admin/generate-content` to:

- Generate content for specific brand/model combinations
- Set custom years for content generation
- View generation history and status
- Manage existing content files

## 🎨 Available Scripts

- `npm run dev` - Start development server with SSR
- `npm run build` - Build for production with static generation
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Design System

The application uses a consistent design system inspired by Shadcn/ui:

- **Colors**: Semantic color tokens for consistent theming
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable, accessible UI components
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Complete dark/light theme support

## 🔧 Configuration

### Astro Configuration

The project is configured for server-side rendering with the Node.js adapter:

```javascript
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  // ... other config
});
```

### Content Collections

Type-safe content management for generated car information:

```typescript
const carsCollection = defineCollection({
  schema: z.object({
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    description: z.string().optional(),
    logo: z.string().optional(),
    generatedAt: z.date().optional(),
  }),
});
```

### ESLint

The project uses ESLint with TypeScript and Astro support for code quality and consistency.

### Prettier

Prettier is configured for consistent code formatting across the project.

### Tailwind CSS

Tailwind CSS is configured with custom design tokens and responsive utilities.

## 🚀 Deployment

The application can be deployed to any hosting service that supports Node.js:

### Production Build

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - Railway
   - Heroku
   - AWS
   - Any Node.js hosting service

### Environment Variables

Configure the following environment variables for production:

```env
NODE_ENV=production
CARS_API_URL=https://cars-api-production.up.railway.app/
```

## 🔍 SEO & Performance

### SEO Features

- **Server-Side Rendering**: All pages are pre-rendered for optimal SEO
- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD structured data for car information
- **Clean URLs**: SEO-friendly URL structure
- **Sitemap**: Automatic sitemap generation

### Performance Optimizations

- **Static Generation**: Pages are generated at build time
- **Image Optimization**: Optimized images and lazy loading
- **Code Splitting**: Automatic code splitting for better performance
- **Caching**: Efficient caching strategies
- **CDN Ready**: Optimized for CDN deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code consistency
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Cars API](https://github.com/rafaelcetina/cars-api) by Rafael Cetina
- [Astro](https://astro.build/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Svelte](https://svelte.dev/) for reactive components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Shadcn/ui](https://ui.shadcn.com/) for design inspiration

## 📞 Support

If you have any questions or need help with the application, please:

1. Check the [documentation](https://docs.astro.build/)
2. Search existing [issues](https://github.com/your-repo/cars-app/issues)
3. Create a new issue with detailed information

---

**Built with ❤️ using modern web technologies**
