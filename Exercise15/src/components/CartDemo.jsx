import { useCart } from '../context/CartContext.jsx';

const suggestions = [
  { id: 3, name: 'Little olive bowl', price: 34 },
  { id: 4, name: 'Soft cotton throw', price: 68 }
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function CartSummary() {
  const { items } = useCart();
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return <span className="cart-count" aria-live="polite">Bag <b>{String(count).padStart(2, '0')}</b></span>;
}

export default function CartDemo() {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const addedIds = new Set(items.map((item) => item.id));

  return (
    <section className="cart-card" aria-labelledby="cart-title">
      <div className="section-kicker"><span className="kicker-dot amber" /> CHALLENGE B <span className="kicker-rule" /> useContext / shared cart</div>
      <div className="cart-heading"><div><p className="eyebrow">Your picks</p><h2 id="cart-title">The little bag.</h2></div><CartSummary /></div>
      <div className="cart-items">
        {items.length === 0 ? <p className="empty-cart">Your bag is empty. Add something you like below.</p> : items.map((item) => (
          <article className="cart-item" key={item.id}>
            <div className={`item-swatch swatch-${item.id % 4}`} aria-hidden="true"><span>{item.name.charAt(0)}</span></div>
            <div className="item-description"><h3>{item.name}</h3><span>{money.format(item.price)} each</span></div>
            <div className="quantity-control" aria-label={`Quantity for ${item.name}`}><button type="button" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity === 1} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button></div>
            <strong className="item-total">{money.format(item.price * item.quantity)}</strong>
            <button className="remove-item" type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>×</button>
          </article>
        ))}
      </div>
      <div className="suggestions"><p className="suggestion-label">A couple more good things</p><div className="suggestion-list">{suggestions.map((product) => <button key={product.id} className="suggestion" type="button" onClick={() => addItem(product)} disabled={addedIds.has(product.id)}><span>{product.name}<small>{money.format(product.price)}</small></span><b>{addedIds.has(product.id) ? 'Added' : '+ Add'}</b></button>)}</div></div>
      <div className="cart-total"><span>Subtotal</span><strong>{money.format(total)}</strong></div>
      <p className="cart-footnote">Shared cart state, neatly kept in context.</p>
    </section>
  );
}
