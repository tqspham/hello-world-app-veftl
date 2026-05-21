'use client';

export const LANGUAGES = {
  EN: 'English',
  ES: 'Español',
  FR: 'Français',
  DE: 'Deutsch',
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: LanguageCode = 'EN';

export const translations: Record<LanguageCode, Record<string, string>> = {
  EN: {
    appTitle: 'Hello, World! - Theme Toggle',
    appDescription: 'A clean, minimalist app with smooth light and dark theme switching',
    pageHeading: 'Hello, World!',
    pageDescription: 'Toggle the theme in the navigation bar to switch between light and dark modes. Your preference persists across page reloads.',
    selectLanguage: 'Language',
    switchLanguage: 'Switch language',
  },
  ES: {
    appTitle: '¡Hola, Mundo! - Cambio de Tema',
    appDescription: 'Una aplicación limpia y minimalista con cambio suave entre temas claro y oscuro',
    pageHeading: '¡Hola, Mundo!',
    pageDescription: 'Alterna el tema en la barra de navegación para cambiar entre modos claro y oscuro. Tu preferencia persiste después de recargar la página.',
    selectLanguage: 'Idioma',
    switchLanguage: 'Cambiar idioma',
  },
  FR: {
    appTitle: 'Bonjour, Monde ! - Changement de Thème',
    appDescription: 'Une application épurée et minimaliste avec changement fluide entre les thèmes clair et sombre',
    pageHeading: 'Bonjour, Monde !',
    pageDescription: 'Basculez le thème dans la barre de navigation pour passer entre les modes clair et sombre. Votre préférence persiste après le rechargement de la page.',
    selectLanguage: 'Langue',
    switchLanguage: 'Changer la langue',
  },
  DE: {
    appTitle: 'Hallo, Welt! - Designumschalter',
    appDescription: 'Eine saubere, minimalistische App mit sanftem Wechsel zwischen hellem und dunklem Design',
    pageHeading: 'Hallo, Welt!',
    pageDescription: 'Wechseln Sie das Design in der Navigationsleiste, um zwischen hellem und dunklem Modus zu wechseln. Ihre Voreinstellung bleibt nach dem Neuladen der Seite erhalten.',
    selectLanguage: 'Sprache',
    switchLanguage: 'Sprache wechseln',
  },
};

export function getTranslation(language: LanguageCode, key: string): string {
  return translations[language]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
}
