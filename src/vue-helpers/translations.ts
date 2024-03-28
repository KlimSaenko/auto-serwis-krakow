const Translations = {
    messagesAllImports: import.meta.glob<Record<string, {}>>('../../config/locales/*.json', { import: 'default' }),

    get supportedLocales(){
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
    },

    switchHtmlLanguage(newLocale: string) {
        document.querySelector("html")?.setAttribute("lang", newLocale);
        localStorage.setItem("user-locale", newLocale);
    },

    async loadLocaleMessages(locale: string) {
        const messages = await Translations.messagesAllImports[`../../config/locales/${locale}.json`]();
        return messages;
    },

    isLocaleSupported(locale: string | null): boolean {
        if (!locale){
            return false;
        }
        return Translations.supportedLocales.includes(locale);
    },

    getUserLocale(): string {
        const locale = window.navigator.language || import.meta.env.VITE_DEFAULT_LOCALE;
        return locale.split('-')[0];
    },

    getPersistedLocale(): string | null {
        const persistedLocale = localStorage.getItem("user-locale");
        return Translations.isLocaleSupported(persistedLocale) ? persistedLocale : null;
    },

    guessDefaultLocale(): string {
        const userPersistedLocale = Translations.getPersistedLocale();
        if (userPersistedLocale) {
            return userPersistedLocale;
        }

        const userPreferredLocale = Translations.getUserLocale();
        if (Translations.isLocaleSupported(userPreferredLocale)) {
            return userPreferredLocale;
        }
        
        return import.meta.env.VITE_DEFAULT_LOCALE;
    }
}

export default Translations;