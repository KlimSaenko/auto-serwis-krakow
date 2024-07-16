class Translations {
    private static messagesAllImports = import.meta.glob<Record<string, {}>>('../../config/locales/*.json', { import: 'default' });

    static get supportedLocales(){
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
    };

    static switchHtmlLanguage(newLocale: string) {
        document.querySelector("html")?.setAttribute("lang", newLocale);
        localStorage.setItem("user-locale", newLocale);
    };

    static async loadLocaleMessages(locale: string) {
        const messages = await Translations.messagesAllImports[`../../config/locales/${locale}.json`]();
        return messages;
    };

    static isLocaleSupported(locale: string | null): boolean {
        if (!locale){
            return false;
        }
        return Translations.supportedLocales.includes(locale);
    };

    static getUserLocale(): string {
        const locale = window.navigator.language || import.meta.env.VITE_DEFAULT_LOCALE;
        return locale.split('-')[0];
    };

    static getPersistedLocale(): string | null {
        const persistedLocale = localStorage.getItem("user-locale");
        return Translations.isLocaleSupported(persistedLocale) ? persistedLocale : null;
    };

    static guessDefaultLocale(): string {
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