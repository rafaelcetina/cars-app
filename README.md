# Cars App 🚗

A modern, responsive web application built with **Astro**, **TypeScript**, and **Tailwind CSS** for managing car brands and models. This application provides a clean and user-friendly interface to interact with the [Cars API](https://github.com/rafaelcetina/cars-api).

## ✨ Features

- **Brand Management**: View, create, and manage car brands
- **Model Management**: Add models to brands with pricing information
- **Price Filtering**: Filter models by price range
- **Search Functionality**: Search models by name or brand
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS and Shadcn-inspired components
- **TypeScript**: Full type safety throughout the application
- **Real-time Updates**: Instant feedback for all CRUD operations

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator with component islands
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [Svelte](https://svelte.dev/) - Reactive components for interactive features
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
   Navigate to `http://localhost:4321` to see the application.

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
│   │   └── ModelsClient.svelte # Models page logic
│   ├── layouts/
│   │   └── Layout.astro        # Main layout component
│   ├── lib/
│   │   ├── api.ts             # API service functions
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── index.astro        # Brands page
│   │   └── models.astro       # Models page
│   ├── styles/
│   │   └── global.css         # Global styles and Tailwind config
│   └── types/
│       └── api.ts             # TypeScript interfaces
├── public/                    # Static assets
├── .eslintrc.cjs             # ESLint configuration
├── .prettierrc               # Prettier configuration
├── astro.config.mjs          # Astro configuration
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

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
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

## 🔧 Configuration

### ESLint

The project uses ESLint with TypeScript and Astro support for code quality and consistency.

### Prettier

Prettier is configured for consistent code formatting across the project.

### Tailwind CSS

Tailwind CSS v4 is configured with custom design tokens and responsive utilities.

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Cars API](https://github.com/rafaelcetina/cars-api) by Rafael Cetina
- [Astro](https://astro.build/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Svelte](https://svelte.dev/) for reactive components
- [Lucide](https://lucide.dev/) for beautiful icons
# cars-app
