import './index.css';
import './main.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import { createApp } from 'vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import Translations from './vue-helpers/translations';
import VueScrollTo from 'vue-scrollto';

import App from './App.vue';
import ContactInfoHeader from './components/header/ContactInfoHeader.vue';
import LanguageSelector from './components/header/LanguageSelector.vue';
import Card from './components/cards/Card.vue';
import GoogleMap from './components/GoogleMap.vue';
import Footer from './components/Footer.vue';
import MainBannerCards from './components/MainBannerCards.vue';
import ScrollParallax from './components/ScrollParallax.vue';
import CustomerReview from './components/cards/CustomerReview.vue';
import ReviewsList from './components/ReviewsList.vue';

const defaultLocale = Translations.guessDefaultLocale();

const i18nPromise = Translations.loadLocaleMessages(defaultLocale);

const app = createApp(App);

app.component('ContactInfoHeader', ContactInfoHeader);
app.component('LanguageSelector', LanguageSelector);
app.component('Card', Card);
app.component('GoogleMap', GoogleMap);
app.component('Footer', Footer);
app.component('MainBannerCards', MainBannerCards);
app.component('ScrollParallax', ScrollParallax);
app.component('CustomerReview', CustomerReview);
app.component('ReviewsList', ReviewsList);

app.use(router);
app.use(VueScrollTo);

i18nPromise.then(messages => {
    const i18n = createI18n({
        legacy: false,
        locale: defaultLocale,
        fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
        availableLocales: import.meta.env.VITE_SUPPORTED_LOCALES.split(","),
        globalInjection: true,
        messages: { [defaultLocale]: messages }
    });
    Translations.switchHtmlLanguage(defaultLocale);

    app.use(i18n);

    app.mount('#app');
});