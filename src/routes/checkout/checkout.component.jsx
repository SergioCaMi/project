import { useContext } from 'react';

import { CartContext } from '../../components/context/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Descripción</span>
        </div>
        <div className='header-block'>
          <span>Cantidad</span>
        </div>
        <div className='header-block'>
          <span>Precio</span>
        </div>
        <div className='header-block'>
          <span>Eliminar</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: {cartTotal.toFixed(2)} €</div>
    </div>
  );
};

export default Checkout;
