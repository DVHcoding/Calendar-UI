# Calendar-UI

**Calendar-UI** is a modern, feature-rich calendar application designed to streamline scheduling and task management for individuals and teams. Built with cutting-edge technologies like Next.js, React, and Tailwind CSS, it offers a visually appealing, accessible, and highly interactive user interface. Whether you're coordinating work meetings, tracking personal tasks, or planning educational commitments, calendar.me provides a seamless experience with robust features tailored to your needs.

![Calendar-UI Interface](https://learnlangs24h.s3.ap-southeast-2.amazonaws.com/uploads/ZVWQVUEd-tPaUnTjXSoTx.webp)  
_Screenshot of the Calendar-UI interface displaying a weekly schedule view for March 2025._

## Features

Calendar-UI is packed with functionalities to enhance productivity and user experience:

- **Multi-View Calendar**: Switch between month, week, and day views using intuitive tabs (powered by `@radix-ui/react-tabs`) to visualize your schedule effectively.
- **Event Management**: Create, edit, and delete events with a user-friendly form system (via `react-hook-form` and `zod` for validation). Events can include titles, categories, dates, times, and attendees.
- **Color-Coded Categories**: Organize events into categories like "Work" (purple), "Personal" (blue), and "Education" (gray), styled with `tailwindcss` and managed via `@radix-ui/react-select`.
- **Team Collaboration**: Add teammates to events and view their availability with profile avatars (using `@radix-ui/react-avatar`) and interactive popovers (via `@radix-ui/react-popover`).
- **Date Picking**: Select dates effortlessly with an integrated date picker (powered by `react-day-picker` and `date-fns` for date manipulation).
- **Responsive Design**: Enjoy a consistent experience across desktop, tablet, and mobile devices, thanks to Tailwind CSS’s responsive utilities.
- **Theme Support**: Toggle between light and dark modes with `next-themes`, enhancing accessibility and user comfort.
- **Interactive UI Components**: Leverage a variety of Radix UI primitives (e.g., dropdowns, dialogs, tooltips) for a polished and accessible interface.
- **Toast Notifications**: Receive feedback on actions like event creation or deletion with `sonner` toast notifications.
- **Error Handling**: Robust error management with `react-error-boundary` ensures a smooth user experience even when issues arise.

### Interface Highlights

The Calendar-UI interface offers a clean and modern layout:

- **Left Sidebar**: Features a dark-themed panel with profile avatars, a "My Calendars" dropdown, categorized events, and a "+" button for adding new items.
- **Calendar Panel**: Displays a month view (e.g., October 2023) with highlighted dates and navigation arrows, styled with Tailwind CSS gradients.
- **Weekly Schedule**: Shows a grid of time slots and events (e.g., "Team meeting," "Study time") with color-coded blocks and popovers for event details.

## Technologies Used

Calendar-UI is built with a modern, performant tech stack:

### Core Framework

- **[Next.js](https://nextjs.org/)** (`15.1.0`): A React framework for server-side rendering, static generation, and optimized performance.
- **[React](https://react.dev/)** (`^19`): A JavaScript library for building dynamic, component-based UIs.
- **[React DOM](https://react.dev/)** (`^19`): Handles DOM rendering for React components.

### Styling

- **[Tailwind CSS](https://tailwindcss.com/)** (`^3.4.17`): A utility-first CSS framework for rapid, responsive styling.
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** (`^1.0.7`): Adds animation utilities to Tailwind CSS for smooth transitions.
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** (`^2.5.5`): Merges Tailwind classes efficiently, reducing conflicts.
- **[class-variance-authority](https://cva.style/)** (`^0.7.1`): Manages component variants for consistent styling.
- **[clsx](https://github.com/lukeed/clsx)** (`^2.1.1`): A utility for conditionally joining class names.

### UI Components

- **Radix UI Primitives** (various versions): Accessible, unstyled components customized with Tailwind CSS:
  - `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`.
- **[vaul](https://github.com/emilkowalski/vaul)** (`^0.9.6`): A drawer component for mobile-friendly modals.
- **[cmdk](https://cmdk.paco.me/)** (`1.0.4`): A command palette component for quick navigation.
- **[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)** (`^2.1.7`): Resizable layout panels for flexible UI design.

### Form and Validation

- **[React Hook Form](https://react-hook-form.com/)** (`^7.54.1`): Efficient form handling and validation.
- **[Zod](https://zod.dev/)** (`^3.24.1`): Schema validation library, integrated with React Hook Form via `@hookform/resolvers` (`^3.9.1`).

### Date and Time

- **[date-fns](https://date-fns.org/)** (`latest`): Lightweight date manipulation library.
- **[React Day Picker](https://react-day-picker.js.org/)** (`8.10.1`): A customizable date picker component.

### Visual Enhancements

- **[Lucide React](https://lucide.dev/)** (`^0.454.0`): Open-source icons for consistent visual elements.
- **[embla-carousel-react](https://www.embla-carousel.com/)** (`8.5.1`): A lightweight carousel library for slideshows or event previews.
- **[recharts](https://recharts.org/)** (`2.15.0`): A charting library for data visualization (e.g., task completion trends).
- **[sonner](https://sonner.emilkowalski.dev/)** (`^1.7.1`): Elegant toast notifications for user feedback.
- **[input-otp](https://github.com/guilhermerodz/input-otp)** (`1.4.1`): A component for one-time password inputs (if applicable).

### Utilities

- **[Next Themes](https://github.com/pacocoursey/next-themes)** (`^0.4.4`): Theme management for light/dark mode support.
- **[React Error Boundary](https://github.com/bvaughn/react-error-boundary)** (`latest`): Graceful error handling in React components.
- **[autoprefixer](https://github.com/postcss/autoprefixer)** (`^10.4.20`): Adds vendor prefixes to CSS for broader compatibility.
- **[postcss](https://postcss.org/)** (`^8`): A tool for transforming CSS with plugins like Tailwind CSS.

### Development Tools

- **[TypeScript](https://www.typescriptlang.org/)** (`^5`): Static typing for improved code quality and developer experience.
- **Type Definitions**: `@types/node` (`^22`), `@types/react` (`^19`), `@types/react-dom` (`^19`) for TypeScript support.

## Installation

To set up Calendar-UI locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DVHcoding/Calendar-UI.git
   cd Calendar-UI
   ```
