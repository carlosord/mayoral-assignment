import { Product } from "@/domain/product";
import styles from '@/styles/ProductList.module.css'
import React, { Component } from "react";
import Search from "../generic/search";
import ProductCard from "./product-card";
import ProductSorter from "./product-sorter";
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withTranslation } from 'react-i18next';

interface ListProductItem {
    product: Product;
    variant: number;
}

interface IProps {
    products: ListProductItem[];
    onAddToCart: (product: Product, variant: number) => void;
    t: any;
}

interface IState {
    products: ListProductItem[];
    productsList: ListProductItem[];
    filter: string;
    grid: string;
}

class ProductsList extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            products: this.props.products,
            productsList: this.props.products,
            filter: '',
            grid: ''
        }

        this.search = this.search.bind(this);
        this.sortedProducts = this.sortedProducts.bind(this);
        this.changeVariant = this.changeVariant.bind(this);
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevProps.products != this.props.products) {
            this.setState({ 
                products: this.props.products,
                productsList: this.props.products
            });
        }
    }

    search(value: ListProductItem[]) {
        this.setState({
            productsList: value
        })
    }

    sortedProducts(sorter: (a: ListProductItem, b: ListProductItem) => number) {
        console.log(this.state.products)
        this.setState({
            products: this.state.products.sort(sorter),
            productsList: this.state.productsList.sort(sorter)
        });
    }

    changeVariant(id: number, variant: number) {
        let existingItem = this.state.products.find((p: ListProductItem) => p.product.id === id);
        if (existingItem) {
            existingItem.variant = variant;
        }
    }

    render() {
        return (
            <>
                <div className={styles.grid_buttons}>
                    <div className={styles.mobile}>
                        <span onClick={() => this.setState({grid: 'grid_1'})}>
                            <FontAwesomeIcon icon={faSquareMinus} />
                        </span>
                        <span onClick={() => this.setState({grid: 'grid_2'})}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                        </span>
                    </div>
                    <div className={styles.browser}>
                        <span onClick={() => this.setState({grid: 'grid_3'})}>
                            <FontAwesomeIcon icon={faSquareMinus} />
                        </span>
                        <span onClick={() => this.setState({grid: 'grid_4'})}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                        </span>
                    </div>
                </div>
                <div className={styles.list_options}>
                    <Search field='product.name' list={this.state.products} handler={this.search} />
                    <ProductSorter onSelectSorter={this.sortedProducts}/>
                </div>
                <div className={`${styles.grid} ${styles[this.state.grid]}`}>
                {
                    this.state.productsList.length ? 
                        this.state.productsList.map(item => 
                            <ProductCard 
                                key={`p_${item.product.id}`} 
                                product={item.product} 
                                variant={item.variant} 
                                onAddToCart={this.props.onAddToCart}
                                onChangeVariant={this.changeVariant} 
                            />)
                        :
                        <p>{this.props.t('product_list_empty')}</p>
                }
                </div>
            </>
        )
    }

}

export default withTranslation()(ProductsList);