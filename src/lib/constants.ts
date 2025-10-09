// URLs e rotas
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_URL_API || 'http://localhost:8081',
  ENDPOINTS: {
    LINKS: '/api/links',
    SHORTEN: '/api/shorten',
    STATS: '/api/stats',
  },
} as const

export const UI_CONFIG = {
  SIDEBAR_WIDTH: '15rem',
  HEADER_HEIGHT: '4rem',
  ANIMATION_DURATION: 300,
} as const

export const QUERY_KEYS = {
  LINKS: ['links'],
  LINK_STATS: (id: string) => ['link-stats', id],
  USER_STATS: ['user-stats'],
} as const
