
import { useContext, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { CategoryContext } from '../../components/context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();//Obtengo el parametro de la url
    const {categoriesMap} = useContext(CategoryContext);
    const [ products, setProducts ] = useState([]);
    
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div className='category-container'>
            <h2 className='category-title'>{category.toUpperCase().replace(/-/g, ' ')}</h2>
            <div className='category-products'>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Category;