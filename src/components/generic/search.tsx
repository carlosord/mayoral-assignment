import React, { useState } from "react";

import styles from '@/styles/Search.module.css'
import { useTranslation } from "react-i18next";

interface Props {
    field: string;
    list: Array<any>;
    handler: (x: Array<any>) => void;
}

const Search: React.FC<Props> = ({field, list, handler}) => {

    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const search = (event: any) => {
        const value = event.target.value
        setValue(value)
        handler(list.filter(obj => getDeepValue(obj, field).includes(value)))
    }

    const getDeepValue = (obj: any, field: string): string => {
        let parts = field.split('.');
        let firstField = parts.shift() || '';
        let restFields = parts.join('.');
        
        return restFields.length ? getDeepValue(obj[firstField], restFields) : obj[firstField];
    }

    const placeholder = t('search_placeholder')

    return (
        <div className={styles.search}>
            <label>{t('search')}:</label>
            <input placeholder={placeholder} value={value} onChange={search}></input>
        </div>
    )

}

export default Search;