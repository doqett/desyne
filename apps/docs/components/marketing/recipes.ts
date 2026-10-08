/**
 * Recipes shown on the landing's recipe wall. Shared by the server (which
 * reads their source) and the client wall (which lazy-loads each demo).
 */
export type Recipe = { key: string; title: string; component: string };
export const recipeTabs: { id: string; label: string; recipes: Recipe[] }[] = [
  {
    id: "forms",
    label: "Forms",
    recipes: [
      {
        key: "radio-group/recipe-plan-picker",
        title: "Plan picker",
        component: "radio-group",
      },
      {
        key: "slider/recipe-pricing-calculator",
        title: "Pricing calculator",
        component: "slider",
      },
      {
        key: "input-otp/recipe-two-factor",
        title: "Two-factor code",
        component: "input-otp",
      },
      {
        key: "combobox/recipe-tag-picker",
        title: "Tag picker",
        component: "combobox",
      },
    ],
  },
  {
    id: "dates",
    label: "Date & time",
    recipes: [
      {
        key: "calendar/recipe-booking",
        title: "Booking calendar",
        component: "calendar",
      },
      {
        key: "date-picker/recipe-travel",
        title: "Travel dates",
        component: "date-picker",
      },
      {
        key: "date-field/recipe-business-hours",
        title: "Business hours",
        component: "date-field",
      },
      {
        key: "date-picker/recipe-report-range",
        title: "Report range",
        component: "date-picker",
      },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    recipes: [
      {
        key: "dialog/recipe-invite",
        title: "Invite dialog",
        component: "dialog",
      },
      {
        key: "popover/recipe-share",
        title: "Share popover",
        component: "popover",
      },
      {
        key: "menu/recipe-row-actions",
        title: "Row actions",
        component: "menu",
      },
      {
        key: "command-palette/recipe-app-search",
        title: "App search",
        component: "command-palette",
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    recipes: [
      { key: "chart/recipe-kpi", title: "KPI chart", component: "chart" },
      {
        key: "grid-list/recipe-kanban",
        title: "Kanban",
        component: "grid-list",
      },
      {
        key: "list-box/recipe-transfer",
        title: "Transfer list",
        component: "list-box",
      },
      {
        key: "table/recipe-permissions",
        title: "Permissions table",
        component: "table",
      },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    recipes: [
      {
        key: "toast/recipe-undo-delete",
        title: "Undo delete",
        component: "toast",
      },
      {
        key: "meter/recipe-usage-quotas",
        title: "Usage quotas",
        component: "meter",
      },
      {
        key: "progress-bar/recipe-import",
        title: "Import progress",
        component: "progress-bar",
      },
      {
        key: "alert/recipe-plan-limit",
        title: "Plan limit",
        component: "alert",
      },
    ],
  },
];

export const recipeKeys = recipeTabs.flatMap((t) =>
  t.recipes.map((r) => r.key),
);
