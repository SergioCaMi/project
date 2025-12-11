import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../components/context/cart.context.jsx';
// IMPORTACIONES DE COMPONENTES
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ()=>{
    const {cartItems} = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'> 
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/>
                ))}
            </div>
            <Button>IR A CARRITO</Button>
        </div>
    );
};
export default CartDropdown;
