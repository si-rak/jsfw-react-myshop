import { useState } from 'react';
import styles from './ContactPage.module.css';
import btnStyles from '../../components/Button.module.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  } 

  function handleSubmit(e) {
    e.preventDefault();

    // simple email validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  }

  return (
    <div className={`pageContainer ${styles.container}`}>
      <h2>Contact Us</h2>

      {success && <p className={styles.success}>Message sent successfully!</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className={`${btnStyles.button} ${btnStyles.greenButton}`}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactPage;