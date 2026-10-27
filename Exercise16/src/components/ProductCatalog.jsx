import { useCart } from '../context/CartContext.jsx';

const products = [
  { id: 'mug', name: 'Morning ceramic mug', detail: 'Hand-finished stoneware', price: 32, tone: 'sand', mark: '01' },
  { id: 'vase', name: 'Little sculptural vase', detail: 'A quiet shape for a shelf', price: 48, tone: 'clay', mark: '02' },
  { id: 'linen', name: 'Everyday linen throw', detail: 'Soft, washed natural linen', price: 96, tone: 'sage', mark: '03' }
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function ProductCatalog() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="section-heading"><div><p className="eyebrow">A considered collection</p><h2 id="catalog-title">Made for the everyday.</h2></div><span className="collection-count">03 OBJECTS</span></div>
      <div className="product-grid">
        {products.map((product) => {
          const inCart = cartItems.some((item) => item.id === product.id);
          return (
            <article className="product-card" key={product.id}>
              <div className={`product-art ${product.tone}`} aria-hidden="true"><span className="art-number">{product.mark}</span><div className="object-shape"><i /></div><span className="art-caption">OBJECTS FOR HOME</span></div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p></div><strong>{money.format(product.price)}</strong></div>
              <div className="product-actions"><button className="add-button" type="button" onClick={() => addToCart(product)}>{inCart ? 'Add another' : 'Add to bag'} <span aria-hidden="true">↗</span></button>{inCart && <button className="remove-button" type="button" onClick={() => removeFromCart(product.id)}>Remove</button>}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
