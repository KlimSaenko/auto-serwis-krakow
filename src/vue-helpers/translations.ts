class Translations {
    private static messagesAllImports = import.meta.glob<Record<string, {}>>('../../config/locales/*.json', { import: 'default' });

    private static stringLocaleToObject(locale: string): { locale: string, region: string } {
        return { locale: locale.split('-')[0], region: locale.split('-')[1] };
    }

    public static get supportedLocales(): [string] {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
    };

    public static get defaultLocale(): { locale: string, region: string } {
        return this.stringLocaleToObject(import.meta.env.VITE_DEFAULT_LOCALE);
    };

    public static switchHtmlLanguage(newLocale: string) {
        document.querySelector("html")?.setAttribute("lang", newLocale);
        localStorage.setItem("user-locale", newLocale);
    };

    public static async loadLocaleMessages(locale: string) {
        const messages = await Translations.messagesAllImports[`../../config/locales/${locale}.json`]();
        return messages;
    };

    public static isLocaleSupported(locale: string | null): boolean {
        if (!locale){
            return false;
        }
        return Translations.supportedLocales.includes(locale);
    };

    public static async getUserLocaleInfo(): Promise<{ locale: string, region: string }> {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale || window.navigator.language || import.meta.env.VITE_DEFAULT_LOCALE;

        const regionPromise = fetch('https://api.country.is');

        let timer: number;
        const region = await Promise.race([
            regionPromise,
            new Promise((_, rej) => timer = setTimeout(rej, 3000))
        ]).finally(() => clearTimeout(timer)) as Response;

        const localeInfo = this.stringLocaleToObject(locale)
        
        if (region?.ok){
            const regionJson = await region.json();

            if (regionJson.country)
                localeInfo.region = regionJson.country;
        }

        return localeInfo;
    };

    public static getPersistedLocale(): string | null {
        const persistedLocale = localStorage.getItem("user-locale");
        return Translations.isLocaleSupported(persistedLocale) ? persistedLocale : null;
    };

    public static async guessDefaultLocale(): Promise<string> {
        const userPersistedLocale = Translations.getPersistedLocale();
        if (userPersistedLocale) {
            return userPersistedLocale;
        }

        const userPreferredLocale = await Translations.getUserLocaleInfo();
        if (Translations.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale;
        }
        
        return import.meta.env.VITE_DEFAULT_LOCALE.split('-')[0];
    }
}

export default Translations;