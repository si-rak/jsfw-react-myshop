import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import btnStyles from '../../components/Button.module.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDiscounted, setFilterDiscounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://v2.api.noroff.dev/online-shop');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const json = await response.json();
        setProducts(json.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesName = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const isDiscounted =
      product.price && product.discountedPrice < product.price;

    const matchesDiscount = filterDiscounted ? isDiscounted : true;

    return matchesName && matchesDiscount;
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <div style={{ margin: '1rem 0' }}>
        <button
          className={`${btnStyles.button} ${btnStyles.outlineButton}`}
          onClick={() => setFilterDiscounted(!filterDiscounted)}
        >
          {filterDiscounted ? 'Show All Products' : 'Show Discounted Products'}
        </button>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className={styles.card}>
                <img src={product.image.url} alt={product.image.alt} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <strong>Price: ${product.discountedPrice}</strong>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;