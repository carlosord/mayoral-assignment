export interface Variant {
    image: string;
    price: number;
    discount: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    currency: string;
    variants: Variant[];
}

export function getFormattedPrice(price: number, currency: string) {
    return `${price}${currency}`
}

export function applyDiscount(p: Product, variant: number) {
    return p.variants[variant].price * (100 - p.variants[variant].discount) / 100
}

export function getDiscount(p: Product, variant: number) {
    return `-${p.variants[variant].discount}%`
}