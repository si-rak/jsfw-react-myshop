import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import styles from './CheckoutSuccessPage.module.css';
import btnStyles from '../../components/Button.module.css';

function CheckoutSuccessPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
  });

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    // stop confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`pageContainer ${styles.container}`}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className={styles.title}>🎉 Order Successful!</div>

      <p className={styles.message}>
        Your order has been placed successfully. Thank you for shopping with us!
      </p>

      <Link to="/" className={`${btnStyles.button} ${btnStyles.blueButton}`}>
        Back to Store
      </Link>
    </div>
  );
}

export default CheckoutSuccessPage;
