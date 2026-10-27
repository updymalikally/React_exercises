import { useState } from 'react';

const startingProducts = [
  { id: 1, name: 'Everyday ceramic mug', price: 24, quantity: 1 },
  { id: 2, name: 'Linen notebook', price: 18.5, quantity: 2 },
  { id: 3, name: 'Small-batch candle', price: 32, quantity: 1 }
];

export default function ShoppingCart() {
  const [products, setProducts] = useState(startingProducts);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [formError, setFormError] = useState('');

  function addProduct(event) {
    event.preventDefault();
    const cleanName = name.trim();
    const numericPrice = Number(price);

    if (!cleanName || price === '' || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      setFormError('Enter a product name and a price greater than zero.');
      return;
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      { id: crypto.randomUUID(), name: cleanName, price: numericPrice, quantity: 1 }
    ]);
    setName('');
    setPrice('');
    setFormError('');
  }

  function changeQuantity(id, amount) {
    setProducts((currentProducts) => currentProducts.map((product) =>
      product.id === id
        ? { ...product, quantity: Math.max(1, product.quantity + amount) }
        : product
    ));
  }

  function removeProduct(id) {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
  }

  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const itemCount = products.reduce((sum, product) => sum + product.quantity, 0);
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <section className="cart-layout" aria-label="Shopping cart">
      <div className="cart-main">
        <div className="cart-title-row">
          <div><p className="eyebrow">Your bag</p><h2>Good things,<br /><em>coming your way.</em></h2></div>
          <span className="item-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        {products.length > 0 ? (
          <ul className="product-list">
            {products.map((product) => (
              <li className="product-row" key={product.id}>
                <div className="product-thumb" aria-hidden="true"><span>{product.name.charAt(0).toUpperCase()}</span></div>
                <div className="product-info"><h3>{product.name}</h3><span className="unit-price">{currency.format(product.price)} each</span></div>
                <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                  <button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Decrease ${product.name} quantity`} disabled={product.quantity <= 1}>−</button>
                  <span aria-live="polite">{product.quantity}</span>
                  <button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={`Increase ${product.name} quantity`}>+</button>
                </div>
                <strong className="line-total">{currency.format(product.price * product.quantity)}</strong>
                <button className="remove-button" type="button" onClick={() => removeProduct(product.id)} aria-label={`Remove ${product.name}`}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-cart"><span className="empty-icon" aria-hidden="true">○</span><h3>Your cart is taking a little break.</h3><p>Add something lovely below to get started.</p></div>
        )}

        <form className="add-form" onSubmit={addProduct}>
          <div className="form-heading"><span className="plus-mark">+</span><div><h3>Add something new</h3><p>Find another favorite for your bag.</p></div></div>
          <div className="form-fields">
            <label className="name-field">Product name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. A little vase" /></label>
            <label className="price-field">Price<input type="number" min="0.01" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="0.00" /></label>
            <button className="add-button" type="submit">Add to cart <span aria-hidden="true">↗</span></button>
          </div>
          {formError && <p className="form-error" role="alert">{formError}</p>}
        </form>
      </div>

      <aside className="summary-card" aria-label="Order summary">
        <p className="eyebrow">At a glance</p><h3>Order summary</h3>
        <div className="summary-line"><span>Items ({itemCount})</span><span>{currency.format(total)}</span></div>
        <div className="summary-line"><span>Shipping</span><span className="shipping-note">Calculated at checkout</span></div>
        <div className="summary-total"><span>Subtotal</span><strong>{currency.format(total)}</strong></div>
        <button className="checkout-button" type="button" disabled={products.length === 0}>Continue to checkout <span aria-hidden="true">→</span></button>
        <p className="checkout-note">A little joy, packed with care.</p>
        <div className="secure-note"><span aria-hidden="true">✳</span> Thoughtfully made. Ready for you.</div>
      </aside>
    </section>
  );
}
