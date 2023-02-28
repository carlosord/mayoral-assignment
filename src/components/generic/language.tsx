import React, { useState } from "react";

import styles from '@/styles/Language.module.css'
import { useTranslation } from "react-i18next";
import Image from "next/image";


const LanguageSelector: React.FC<{}> = ({}) => {

    const { i18n } = useTranslation();

    const [lang, setLang] = useState('es');

    const onSetLang = (l: string) => {
        setLang(l)
        i18n.changeLanguage(l)
    }

    return (
        <div className={styles.language_selector}>
            <span onClick={() => onSetLang('es')}><Image src='/es.svg' alt='es-flag' width={30} height={20} /></span>|
            <span onClick={() => onSetLang('en')}><Image src='/us.svg' alt='es-flag' width={30} height={20} /></span>
        </div>
    )

}

export default LanguageSelector;