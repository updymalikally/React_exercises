import { useCart } from '../context/CartContext.jsx';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartSummary() {
  const { cartItems, removeFromCart } = useCart();
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-panel-heading"><div><p className="eyebrow">Your selection</p><h2 id="cart-title">The bag<span>.</span></h2></div><span className="cart-count" aria-live="polite">{String(itemCount).padStart(2, '0')}</span></div>
      {cartItems.length === 0 ? (
        <div className="empty-state"><span className="empty-symbol" aria-hidden="true">＋</span><p>Your bag is waiting for something lovely.</p><small>Choose an object to get started.</small></div>
      ) : (
        <ul className="cart-list">{cartItems.map((item) => <li className="cart-line" key={item.id}><span className="line-quantity">{String(item.quantity).padStart(2, '0')}</span><div className="line-info"><strong>{item.name}</strong><small>{money.format(item.price)} each</small></div><strong className="line-total">{money.format(item.price * item.quantity)}</strong><button type="button" className="line-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>×</button></li>)}</ul>
      )}
      <div className="subtotal"><span>Subtotal</span><strong>{money.format(totalPrice)}</strong></div>
      <button type="button" className="checkout-button" disabled={cartItems.length === 0}>Continue to checkout <span aria-hidden="true">→</span></button>
      <p className="shipping-note">Shipping calculated at checkout.</p>
      <div className="context-note"><span aria-hidden="true">✳</span> Updates shared across the page with context.</div>
    </aside>
  );
}
