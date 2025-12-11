import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
        <h2 className="name">{name}</h2>
        <span className="quantity">{quantity}</span>
    </div>
  );
};

export default CartItem;
