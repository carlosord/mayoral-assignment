import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { appWithTranslation } from 'next-i18next';
import * as React from 'react';
import i18n from '../../i18n';

import type { AppProps } from 'next/app'
import { I18nextProvider } from 'react-i18next';

function App({ Component, pageProps }: AppProps) {
    return <I18nextProvider i18n={i18n}><Component {...pageProps} /></I18nextProvider>
}

export default appWithTranslation(App);