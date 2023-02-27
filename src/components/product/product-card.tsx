import React, { Component } from "react";

import styles from '@/styles/ProductCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import { applyDiscount, getDiscount, getFormattedPrice, Product } from "@/domain/product";
import ProductDetail from "./product-detail";
import Image from "next/image";
import { withTranslation } from "react-i18next";

interface IProps {
    product: Product;
    variant: number;
    onAddToCart: (product: Product, variant: number) => void;
    onChangeVariant: (id: number, variant: number) => void;
    t: any;
}

interface IState {
    product: Product;
    variant: number;
    showVariants: boolean;
}

class ProductCard extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            product: props.product,
            variant: props.variant,
            showVariants: false
        }

        this.changeVariant = this.changeVariant.bind(this);
    }

    changeVariant(id: number, variant: number) {
        this.setState({variant: variant});
        this.props.onChangeVariant(id, variant);
    }

    render() {
        return (
            <div className={styles.card}>
                <div className={styles.card_image}>
                <Image
                        src={this.state.product.variants[this.state.variant].image}
                        alt={`${this.state.product.name}_variant_${this.state.variant}`}
                        width={500}
                        height={500}
                    />
                </div>
                <h2>{this.state.product.name}</h2>
                <div className={styles.card_price}>
                    <span className={this.state.product.variants[this.state.variant].discount ? "line-througt" : ""}>
                        {getFormattedPrice(this.state.product.variants[this.state.variant].price, this.state.product.currency)}
                    </span>
                    {
                        !!this.state.product.variants[this.state.variant].discount && 
                        <span>
                            {`${getFormattedPrice(applyDiscount(this.state.product, this.state.variant), this.state.product.currency)} (${getDiscount(this.state.product, this.state.variant)})`}
                        </span>
                    }
                </div>
                { this.state.product.variants.length > 1 &&
                    <>
                        <span className={styles.variant_action} onClick={(e) => this.setState({showVariants: !this.state.showVariants})}>
                            { this.state.showVariants ? "-" : "+" } {this.props.t('product_card_show_options')}
                        </span>
                        { this.state.showVariants &&
                            <div className={styles.variants}>
                            {
                                this.state.product.variants.map((v, i) => {
                                    if (this.state.variant !== i) {
                                        return (
                                            <div key={`p_variant_${this.state.product.id}_${i}`} className={styles.variants_images}>
                                                <Image onClick={() => this.changeVariant(this.state.product.id, i)}
                                                    src={v.image}
                                                    alt={`${this.state.product.name}_variant_${i}`}
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                            </div>
                        }
                    </>
                }
                <div className={styles.card_buttons}>
                    <button className={`btn btn-primary ${styles.card_add_button}`} onClick={() => this.props.onAddToCart(this.state.product, this.state.variant)}>
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                    <ProductDetail
                        product={this.state.product}
                        variant={this.state.variant}
                        onAddToCart={() => this.props.onAddToCart(this.state.product, this.state.variant)}
                        onChangeVariant={(v) => this.changeVariant(this.state.product.id, v)}/>
                </div>
            </div>
        )
    }

}

export default withTranslation()(ProductCard);