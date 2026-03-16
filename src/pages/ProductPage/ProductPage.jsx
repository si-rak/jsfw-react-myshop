import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../cart/cartState';
import styles from './ProductPage.module.css';
import btnStyles from '../../components/Button.module.css';

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const json = await response.json();
        setProduct(json.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Unable to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={`pageContainer ${styles.container}`}>
      <img src={product.image?.url} alt={product.image?.alt || product.title} />

      <div className={styles.details}>
        <h2>{product.title}</h2>

        <p>{product.description}</p>

        <p className={styles.price}>Price: ${product.discountedPrice}</p>

        <div className={styles.actions}>
          <button
            className={`${btnStyles.button} ${btnStyles.greenButton}`}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <Link
            to="/"
            className={`${btnStyles.button} ${btnStyles.outlineButton}`}
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;


