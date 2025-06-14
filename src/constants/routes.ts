export const ROUTES = {
  LOGIN: 'Login',
  MAIN: 'Main',
  HOME: 'Home',
  DEVICE: 'Device',
  CONFIG: 'Config',
} as const;

export const TAB_ICONS = {
  [ROUTES.HOME]: 'home',
  [ROUTES.DEVICE]: 'smartphone',
  [ROUTES.CONFIG]: 'settings',
} as const;
