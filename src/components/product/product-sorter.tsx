import { applyDiscount, Product } from '@/domain/product';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Sorter from '../generic/sorter';

interface ListProductItem {
    product: Product;
    variant: number;
}

interface Props {
    onSelectSorter: (sorter: (a: ListProductItem, b: ListProductItem) => number) => void
}

const ProductSorter: React.FC<Props> = ({ onSelectSorter }) => {

    const { t } = useTranslation();

    const sortOptions = [
        { 
            label: t('sorter_price_asc'),
            value: 'priceAsc'
        },
        { 
            label: t('sorter_price_desc'),
            value: 'priceDesc'
        }
    ];

    const sortFunctions = {
        priceAsc: (a: ListProductItem, b: ListProductItem) => applyDiscount(a.product, a.variant) - applyDiscount(b.product, b.variant),
        priceDesc: (a: ListProductItem, b: ListProductItem) => applyDiscount(b.product, b.variant) - applyDiscount(a.product, a.variant)
    };

    return (
        <Sorter
            sortOptions={sortOptions}
            sortFunctions={sortFunctions}
            onSelectSorter={onSelectSorter}
        />
    )

}

export default ProductSorter;