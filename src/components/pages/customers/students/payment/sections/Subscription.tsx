// components/Subscribe.tsx

import React, { useEffect, useState } from 'react';
import { loadStripe, PaymentMethod } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [cardElement, setCardElement] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Stripe.js failed to load.');
        return;
      }
      const elements = stripe.elements();
      const cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        },
      });
      cardElement.mount('#card-element');
      setCardElement(cardElement);
    };

    initializeStripe();

    return () => {
      if (cardElement) {
        cardElement.unmount();
      }
    };
  }, [cardElement]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const { paymentMethod, error } = await stripe!.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'An error occurred.');
      return;
    }

    try {
      const res = await axios.post('/api/create-subscription/', {
        email,
        payment_method: paymentMethod.id,
      });

      if (res.data.error) {
        setError(res.data.error);
      } else if (res.data.latest_invoice.payment_intent) {
        const { client_secret } = res.data.latest_invoice.payment_intent;
        const result = await stripe!.confirmCardPayment(client_secret);

        if (result.error) {
          setError(result.error.message || 'An error occurred during confirmation.');
        } else {
          alert('Subscription successful!');
        }
      }
    } catch (err) {
      setError('An error occurred while processing the subscription.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div id="card-element"></div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default Subscribe;
