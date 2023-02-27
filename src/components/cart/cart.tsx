import { applyDiscount, Product } from '@/domain/product';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CartItem from './cartItem';
import styles from '@/styles/Cart.module.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Item {
    product: Product;
    variant: number;
    quantity: number;
}

interface Props {
    items: Item[];
    onRemoveItem: (id: number) => void;
    onCheckout: () => void;
}

const Cart: React.FC<Props> = ({ items, onRemoveItem, onCheckout }) => {

    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);

    const updateTotal = () => {
        setTotal(items.reduce((acc, item) => acc + applyDiscount(item.product, item.variant) * item.quantity, 0));
    }

    const toggleCart = () => {
        setIsOpen(!isOpen);
    }

    const incrementQuantity = (item: Item) => {
        item.quantity++;
        updateTotal();
    }

    const decrementQuantity = (item: Item) => {
        item.quantity--;
        updateTotal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => updateTotal(), [items])

    return (
        <div className={styles.cart}>
            <button className={styles.cart_button} onClick={toggleCart}>
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{items.length}</span>
            </button>
            {isOpen && (
                <div className={styles.item_container}>
                    {items.map((item) => (
                        <CartItem
                            key={item.product.id}
                            product={item.product}
                            variant={item.variant}
                            quantity={item.quantity}
                            onIncrementQuantity={() => incrementQuantity(item)}
                            onDecrementQuantity={() => decrementQuantity(item)}
                            onRemove={() => { onRemoveItem(item.product.id) }}
                        />
                    ))}
                    <p className={styles.cart_total}>{t('total')}: {total.toFixed(2)}€</p>
                    <button className={`btn btn-primary ${styles.cart_item_checkout}`} onClick={onCheckout}>{t('cart_checkout_button')}</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
