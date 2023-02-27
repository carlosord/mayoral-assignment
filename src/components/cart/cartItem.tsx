import { applyDiscount, getFormattedPrice, Product } from '@/domain/product';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faTrash, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '@/styles/CartItem.module.css'
import Image from "next/image";

interface Props {
    product: Product;
    variant: number;
    quantity: number;
    onIncrementQuantity: () => void;
    onDecrementQuantity: () => void;
    onRemove: () => void;
}

const CartItem: React.FC<Props> = ({ product, variant, quantity, onIncrementQuantity, onDecrementQuantity, onRemove }) => {

    const { t } = useTranslation();

    const [itemQuantity, setItemQuantity] = useState(quantity);

    const incrementQuantity = () => {
        setItemQuantity(itemQuantity + 1);
        onIncrementQuantity();
    }

    const decrementQuantity = () => {
        if (itemQuantity === 1) {
            onRemove()
        }
        setItemQuantity(itemQuantity - 1);
        onDecrementQuantity();
    }

    useEffect(() => setItemQuantity(quantity), [quantity])

    return (
        <div className={styles.cart_item}>
            <h3>{product.name}</h3>
            <div className={styles.detail_image}>
                <Image
                    src={product.variants[variant].image}
                    alt={`${product.name}_variant_${variant}`}
                    width={100}
                    height={100}
                />
            </div>
            <p>{t('cart_item_price')}: {getFormattedPrice(applyDiscount(product, variant), product.currency)}</p>
            <p>{t('cart_item_quantity')}: {itemQuantity}</p>
            <div className={styles.item_buttons}>
                <button onClick={incrementQuantity}><FontAwesomeIcon icon={faSquarePlus} /></button>
                <button onClick={decrementQuantity}><FontAwesomeIcon icon={faSquareMinus} /></button>
                <button onClick={onRemove}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    );
};

export default CartItem;
