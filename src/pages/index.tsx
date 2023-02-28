import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import ProductList from '@/components/product/product-list'
import { getProducts } from '@/services/productService'
import { Product } from '@/domain/product'
import React, { useEffect, useState } from 'react'
import Cart from '@/components/cart/cart'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/components/generic/language'

interface ListProductItem {
    product: Product;
    variant: number;
}

interface CartItem {
    product: Product,
    variant: number,
    quantity: number
}

export default function Home() {

    const { t } = useTranslation();

    const [products, setProducts] = useState<ListProductItem[]>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToCart = (product: Product, variant: number, quantity: number = 1) => {
        let existingItem = cartItems.find((ci: CartItem) => ci.product.id == product.id && ci.variant == variant)
        if (existingItem) {
            existingItem.quantity++;
            setCartItems([...cartItems])
        } else {
            setCartItems([...cartItems, { product: product, variant: variant, quantity: quantity }]);
        }
    }

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter((item: CartItem) => item.product.id !== id));
    }

    const checkout = () => {
        alert(t('checkout_message'));
        setCartItems([])
    }

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data.map((p: Product) => ({ product: p, variant: 0 })));
        })
    }, [])

    return (
        <>
            <Head>
                <title>Mayoral Store</title>
                <meta name="description" content="Mayoral test store" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <LanguageSelector />
                <ProductList products={products} onAddToCart={addToCart} />
                <Cart items={cartItems} onRemoveItem={removeFromCart} onCheckout={checkout}></Cart>
            </main>
        </>
    )
}
