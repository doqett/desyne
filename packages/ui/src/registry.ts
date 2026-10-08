/**
 * Registry metadata — single source of truth for:
 *  - scripts/build-registry.ts  → registry.json (dependencies are inferred from imports)
 *  - the docs gallery grid and sidebar grouping
 */
import { defaultDesign, structuralCssVars } from "./lib/design";

export const categories = [
  "Typography",
  "Buttons",
  "Forms",
  "Date & Time",
  "Overlays",
  "Navigation",
  "Collections",
  "Display",
  "Layout",
  "Feedback",
] as const;

export type Category = (typeof categories)[number];

export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  category: Category;
  /** Example used as the gallery thumbnail (defaults to "demo"). */
  preview?: string;
  /** Extra shadcn registry fields (cssVars, css, …) merged into the item. */
  extra?: Record<string, unknown>;
}

export const components: ComponentMeta[] = [
  // Typography
  {
    name: "typography",
    title: "Typography",
    description:
      "Heading, Text, Lead, Code, Blockquote, List and a Prose wrapper for MDX.",
    category: "Typography",
    preview: "specimen",
  },
  // Buttons
  {
    name: "button",
    title: "Button",
    description:
      "Triggers an action, with variants, sizes and a pending state.",
    category: "Buttons",
  },
  {
    name: "toggle-button",
    title: "Toggle Button",
    description: "A button that can be switched on or off.",
    category: "Buttons",
  },
  {
    name: "toggle-button-group",
    title: "Toggle Button Group",
    description: "A set of toggle buttons with single or multiple selection.",
    category: "Buttons",
  },
  {
    name: "toolbar",
    title: "Toolbar",
    description:
      "Groups of buttons and toggles with arrow-key navigation and one tab stop.",
    category: "Buttons",
  },
  // Forms
  {
    name: "form",
    title: "Form",
    description:
      "Form with live validation, server errors, sections, rows and an actions bar.",
    category: "Forms",
    preview: "thumb",
  },
  {
    name: "field",
    title: "Field",
    description: "Label, Description, FieldError and Input building blocks.",
    category: "Forms",
  },
  {
    name: "text-field",
    title: "Text Field",
    description:
      "Single-line text input with label, description and validation.",
    category: "Forms",
  },
  {
    name: "textarea",
    title: "Textarea",
    description: "Multi-line text input that grows with its content.",
    category: "Forms",
  },
  {
    name: "number-field",
    title: "Number Field",
    description: "Numeric input with steppers, locale formatting and bounds.",
    category: "Forms",
  },
  {
    name: "search-field",
    title: "Search Field",
    description: "Text input for search with a clear button.",
    category: "Forms",
  },
  {
    name: "select",
    title: "Select",
    description: "Pick one option from a collapsible list.",
    category: "Forms",
  },
  {
    name: "combobox",
    title: "Combo Box",
    description: "Text input with a filterable list of suggestions.",
    category: "Forms",
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description: "Checkbox and CheckboxGroup, with indeterminate state.",
    category: "Forms",
  },
  {
    name: "radio-group",
    title: "Radio Group",
    description: "Choose a single option from a set.",
    category: "Forms",
  },
  {
    name: "switch",
    title: "Switch",
    description: "Toggle a setting on or off.",
    category: "Forms",
  },
  {
    name: "slider",
    title: "Slider",
    description: "Pick a value or range by dragging a thumb.",
    category: "Forms",
  },
  {
    name: "input-otp",
    title: "Input OTP",
    description: "One-time password input with individual character slots.",
    category: "Forms",
    extra: {
      cssVars: {
        theme: { "animate-caret-blink": "caret-blink 1.25s ease-out infinite" },
      },
      css: {
        "@keyframes caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
    },
  },
  {
    name: "color-picker",
    title: "Color Picker",
    description:
      "Color area, sliders, swatches, hex field and a popover picker.",
    category: "Forms",
  },
  {
    name: "drop-zone",
    title: "Drop Zone",
    description: "Drag-and-drop target with a FileTrigger for browsing files.",
    category: "Forms",
  },
  // Date & Time
  {
    name: "calendar",
    title: "Calendar",
    description: "Calendar and RangeCalendar for picking dates.",
    category: "Date & Time",
  },
  {
    name: "date-field",
    title: "Date Field",
    description: "Segmented DateField and TimeField inputs.",
    category: "Date & Time",
  },
  {
    name: "date-picker",
    title: "Date Picker",
    description: "DatePicker and DateRangePicker with a calendar popover.",
    category: "Date & Time",
  },
  // Overlays
  {
    name: "dialog",
    title: "Dialog",
    description: "Modal dialog and alert dialog.",
    category: "Overlays",
  },
  {
    name: "sheet",
    title: "Sheet",
    description: "A dialog that slides in from an edge of the screen.",
    category: "Overlays",
  },
  {
    name: "popover",
    title: "Popover",
    description: "Floating content anchored to a trigger.",
    category: "Overlays",
  },
  {
    name: "tooltip",
    title: "Tooltip",
    description: "A short label shown on hover or focus.",
    category: "Overlays",
  },
  {
    name: "menu",
    title: "Menu",
    description:
      "Dropdown menu with sections, selection, shortcuts and submenus.",
    category: "Overlays",
  },
  {
    name: "command-palette",
    title: "Command Palette",
    description: "Keyboard-driven command menu that filters as you type.",
    category: "Overlays",
  },
  // Navigation
  {
    name: "tabs",
    title: "Tabs",
    description: "Switch between panels of related content.",
    category: "Navigation",
    preview: "vertical",
  },
  {
    name: "breadcrumbs",
    title: "Breadcrumbs",
    description: "Show the current page's location in a hierarchy.",
    category: "Navigation",
  },
  {
    name: "link",
    title: "Link",
    description: "Accessible link with style variants.",
    category: "Navigation",
  },
  {
    name: "pagination",
    title: "Pagination",
    description: "Navigate between pages of results.",
    category: "Navigation",
  },
  {
    name: "disclosure",
    title: "Disclosure",
    description: "Collapsible sections and accordions.",
    category: "Navigation",
  },
  {
    name: "sidebar",
    title: "Sidebar",
    description:
      "Collapsible app sidebar with icon mode, mobile sheet and a keyboard shortcut.",
    category: "Navigation",
  },
  // Collections
  {
    name: "list-box",
    title: "List Box",
    description: "A selectable list of options, with sections.",
    category: "Collections",
  },
  {
    name: "grid-list",
    title: "Grid List",
    description: "An interactive list with selection and actions.",
    category: "Collections",
  },
  {
    name: "table",
    title: "Table",
    description: "Data table with sorting and row selection.",
    category: "Collections",
  },
  {
    name: "tree",
    title: "Tree",
    description:
      "Expandable hierarchy with icons, selection and keyboard navigation.",
    category: "Collections",
    preview: "thumb",
  },
  {
    name: "tag-group",
    title: "Tag Group",
    description: "Selectable, removable tags.",
    category: "Collections",
  },
  // Display
  {
    name: "card",
    title: "Card",
    description: "Container with header, content and footer.",
    category: "Display",
    preview: "stats",
  },
  {
    name: "badge",
    title: "Badge",
    description: "Small status or count label.",
    category: "Display",
  },
  {
    name: "avatar",
    title: "Avatar",
    description: "User image with fallback initials, sizes and groups.",
    category: "Display",
  },
  {
    name: "separator",
    title: "Separator",
    description: "Visually or semantically separates content.",
    category: "Display",
  },
  {
    name: "item",
    title: "Item",
    description:
      "List row with media, a title, a quiet second line and actions.",
    category: "Display",
  },
  {
    name: "kbd",
    title: "Kbd",
    description: "Display keyboard keys and shortcuts.",
    category: "Display",
  },
  {
    name: "chart",
    title: "Chart",
    description: "Recharts wrapper with themed colors, tooltip and legend.",
    category: "Display",
  },
  {
    name: "carousel",
    title: "Carousel",
    description: "Swipeable slides built on Embla.",
    category: "Display",
  },
  // Feedback
  {
    name: "alert",
    title: "Alert",
    description: "Callout for important messages.",
    category: "Feedback",
  },
  {
    name: "progress-bar",
    title: "Progress Bar",
    description: "Shows progress of a task, determinate or not.",
    category: "Feedback",
    extra: {
      cssVars: {
        theme: {
          "animate-indeterminate": "indeterminate 1.5s ease-in-out infinite",
        },
      },
      css: {
        "@keyframes indeterminate": {
          "0%": { translate: "-100% 0" },
          "100%": { translate: "300% 0" },
        },
      },
    },
  },
  {
    name: "meter",
    title: "Meter",
    description: "Shows a value within a known range, like storage used.",
    category: "Feedback",
  },
  {
    name: "skeleton",
    title: "Skeleton",
    description:
      "Placeholder while content loads, with pulse or shimmer animation.",
    category: "Feedback",
    extra: {
      cssVars: {
        theme: { "animate-shimmer": "shimmer 1.6s ease-in-out infinite" },
      },
      css: { "@keyframes shimmer": { "100%": { translate: "100% 0" } } },
    },
  },
  {
    name: "spinner",
    title: "Spinner",
    description: "Loading indicator.",
    category: "Feedback",
  },
  {
    name: "toast",
    title: "Toast",
    description: "Stacked notifications powered by sonner.",
    category: "Feedback",
  },
  {
    name: "stepper",
    title: "Stepper",
    description:
      "Steps of a multi-step flow, horizontal or vertical, with status and optional navigation.",
    category: "Navigation",
    preview: "thumb",
  },
  {
    name: "rating",
    title: "Rating",
    description:
      "Star rating input with keyboard support, and a read-only display with half stars.",
    category: "Forms",
  },
  {
    name: "input-group",
    title: "Input Group",
    description:
      "Attach text, icons and buttons to an input as one focusable field.",
    category: "Forms",
  },
  {
    name: "timeline",
    title: "Timeline",
    description:
      "A vertical feed of events with dots or icons, times and connector lines.",
    category: "Display",
  },
  {
    name: "description-list",
    title: "Description List",
    description:
      "Term and value pairs for detail pages, side by side or stacked.",
    category: "Display",
    preview: "thumb",
  },
  {
    name: "empty",
    title: "Empty",
    description: "Empty state with media, a title, a description and actions.",
    category: "Display",
  },
  {
    name: "progress-circle",
    title: "Progress Circle",
    description:
      "Circular progress, determinate or indeterminate, with the value inside.",
    category: "Feedback",
  },
  {
    name: "scroll-area",
    title: "Scroll Area",
    description:
      "Native scrolling with thin, themed scrollbars and optional fade edges.",
    category: "Layout",
    preview: "thumb",
  },
];

/** Structural tokens (shape, density, type) of the default style; components read them. */
const structural = structuralCssVars(defaultDesign);

/** Non-visual helpers published to the registry but not shown in the gallery. */
const toneCss = {
  theme: {
    "color-brand": "var(--brand)",
    "color-brand-foreground": "var(--brand-foreground)",
    "color-destructive-foreground": "var(--destructive-foreground)",
    "color-success": "var(--success)",
    "color-success-foreground": "var(--success-foreground)",
    "color-warning": "var(--warning)",
    "color-warning-foreground": "var(--warning-foreground)",
    "color-info": "var(--info)",
    "color-info-foreground": "var(--info-foreground)",
  },
  light: {
    brand: "oklch(0.54 0.21 277)",
    "brand-foreground": "oklch(0.99 0.005 277)",
    "destructive-foreground": "oklch(0.99 0 0)",
    success: "oklch(0.62 0.16 150)",
    "success-foreground": "oklch(0.99 0 0)",
    warning: "oklch(0.76 0.16 70)",
    "warning-foreground": "oklch(0.25 0.06 70)",
    info: "oklch(0.6 0.16 240)",
    "info-foreground": "oklch(0.99 0 0)",
  },
  dark: {
    brand: "oklch(0.67 0.18 277)",
    "brand-foreground": "oklch(0.22 0.06 277)",
    "destructive-foreground": "oklch(0.99 0 0)",
    success: "oklch(0.72 0.15 150)",
    "success-foreground": "oklch(0.2 0.05 150)",
    warning: "oklch(0.8 0.15 75)",
    "warning-foreground": "oklch(0.25 0.06 70)",
    info: "oklch(0.7 0.14 240)",
    "info-foreground": "oklch(0.2 0.05 240)",
  },
};

export const libs: {
  name: string;
  file: string;
  description: string;
  extra?: Record<string, unknown>;
}[] = [
  {
    extra: {
      cssVars: {
        theme: toneCss.theme,
        light: { ...toneCss.light, ...structural.light },
        dark: { ...toneCss.dark, ...structural.dark },
      },
    },
    name: "primitive",
    file: "lib/primitive.ts",
    description:
      "Shared helpers: composeTailwindRenderProps, focus ring, the color tone system (adds brand/success/warning/info tokens) and the structural tokens (radius levels, border width, field chrome, shadows, density, type) every component reads.",
  },
  {
    name: "design",
    file: "lib/design.ts",
    description:
      "Design engine: styles (default, soft, sharp, bold), neutral bases, brand colors, radius, density and fonts turned into CSS variables, plus URL encoding and a scoped applyDesign helper.",
  },
];

export interface BlockMeta {
  name: string;
  title: string;
  description: string;
  /** Path relative to repo root. */
  file: string;
  /** Where the file lands in the user's project. */
  target: string;
}

export const blocks: BlockMeta[] = [
  {
    name: "login-01",
    title: "Login 01",
    description: "Simple sign-in page with email and password.",
    file: "packages/ui/src/blocks/login-01/page.tsx",
    target: "app/login/page.tsx",
  },
];
