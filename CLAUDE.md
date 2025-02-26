# Development Guidelines for app1

## Build Commands
- `bun run dev` - Start development server
- `bun run build` - Build production version (runs TypeScript compiler then Vite build)
- `bun run preview` - Preview production build locally

## Code Style Guidelines
- **TypeScript**: Use strict typing with noUnusedLocals/Parameters enabled
- **Imports**: Order: 3rd party libs first, then local imports
- **Components**: Use Lit decorators (@customElement, @property) for Web Components
- **Naming**: camelCase for properties/methods, PascalCase for classes
- **Private Members**: Prefix with underscore (e.g., _onClick)
- **Documentation**: JSDoc comments for components and public properties
- **CSS**: Use component-scoped CSS with Lit's static styles
- **Error Handling**: Prefer early returns and type safety over try/catch blocks
- **Module Format**: Use ES modules (import/export syntax)
- **Web Component Best Practices**: Follow slot/part patterns for component customization