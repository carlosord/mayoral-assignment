import { applyDiscount, getDiscount, getFormattedPrice, Product } from '@/domain/product';
import React, { useState } from 'react';
import styles from '@/styles/ProductDetail.module.css'
import styles_card from '@/styles/ProductCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Props {
    product: Product;
    variant: number;
    onAddToCart: () => void;
    onChangeVariant: (variant: number) => void;
}

const ProductDetail: React.FC<Props> = ({ product, variant, onAddToCart, onChangeVariant }) => {

    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false);

    const toggleDetail = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <span onClick={toggleDetail} className={styles.card_details}>+ {t('product_list_details')}</span>
            { isOpen &&
                <div className={styles.modal_product}>
                    <div className={styles.product_detail}>
                        <div className={styles.detail_image}>
                            <Image
                                src={product.variants[variant].image}
                                alt={`${product.name}_variant_${variant}`}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className={styles.product_info}>
                            <div onClick={toggleDetail} className={styles.close_modal}>x</div>
                            <h2 className={styles.product_name}>{product.name}</h2>
                            <p className={styles.product_description}>{product.description}</p>
                            <div className={styles.product_info_price}>
                                <span className={product.variants[variant].discount ? "line-througt" : ""}>
                                    {getFormattedPrice(product.variants[variant].price, product.currency)}
                                </span>
                                {
                                    !!product.variants[variant].discount && 
                                    <span>
                                        {`${getFormattedPrice(applyDiscount(product, variant), product.currency)} (${getDiscount(product, variant)})`}
                                    </span>
                                }
                            </div>
                            <div className={styles_card.variants}>
                            { product.variants.length > 1 &&
                                product.variants.map((v, i) => {
                                    if (variant !== i) {
                                        return (
                                            <div key={`p_variant_${product.id}_${i}`} className={styles_card.variants_images}>
                                                <Image onClick={() => onChangeVariant(i)}
                                                    src={v.image}
                                                    alt={`${product.name}_variant_${i}`}
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                            </div>
                            <button className={`btn btn-primary ${styles_card.card_add_button} ${styles.card_add_button}`} onClick={onAddToCart}>
                                <FontAwesomeIcon icon={faCartPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default ProductDetail;