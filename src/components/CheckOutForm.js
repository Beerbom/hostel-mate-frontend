import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import successImage from '../assets/check_mark.png';
import failedImage from '../assets/paymentfailed.png';
import '../App.css';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

const CheckoutForm = ({ amount, handleClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [payerName, setPayerName] = useState('');
  const [payerMail, setPayerMail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true); // Start loading

    const card = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
      billing_details: {
        name: payerName,
        email: payerMail,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setErrorMessage(result.error.message);
      setPaymentStatus('failed');
      setShowModal(true);
      setLoading(false); // Stop loading
    } else {
      try {
        const paymentResult = await axios.post('/api/pay', {
          amount,
          id: result.paymentMethod.id,
          payerName,
          payerMail,
        });

        if (paymentResult.data.success) {
          console.log('Payment Successful!');
          setPaymentStatus('success');
          setShowModal(true);
        } else {
          console.error('Payment failed:', paymentResult.data.error);
          setErrorMessage(paymentResult.data.error);
          setPaymentStatus('failed');
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setErrorMessage(error.message);
        setPaymentStatus('failed');
        setShowModal(true);
      } finally {
        setLoading(false); // Stop loading after payment attempt (whether success or failure)
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (paymentStatus === 'success') {
      handleClose();
    }
  };

  const handleNameChange = (event) => {
    setPayerName(event.target.value);
  };

  const handleMailChange = (event) => {
    setPayerMail(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="payerName">Name On Card</label>
          <input
            type="text"
            id="payerName"
            className="form-control"
            placeholder="Enter your name *"
            value={payerName}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="payerMail">Email</label>
          <input
            type="email"
            id="payerMail"
            className="form-control"
            placeholder="Enter your Email *"
            value={payerMail}
            onChange={handleMailChange}
            required
          />
        </div>
        <div className="form-group card-element-container">
          <label>Card Details</label>
          <CardElement className="card-element" />
        </div>
        <div className="text-center">
          <button
            className="btn btn-warning btn-lg"
            style={{ color: 'white', fontWeight: 500 }}
            type="submit"
            disabled={!stripe || paymentStatus === 'success' || loading}
          >
            {loading ? (
              <Loader /> // Show loader if loading state is true
            ) : (
              paymentStatus === 'success' ? 'Paid' : `Pay ${amount} Rs`
            )}
          </button>
        </div>
        {paymentStatus === 'failed' && <p className="text-danger mt-3">{errorMessage}</p>}
        {paymentStatus === 'success' && <p className="text-success mt-3">Payment Successful!</p>}
      </form>
      <Modal className="custom-modal" show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment {paymentStatus === 'success' ? 'Successful' : 'Failed'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentStatus === 'success' ? (
            <>
              <img src={successImage} alt="Payment Successful" style={{ width: '100px' }} />
              <p>Your payment of {amount} Rs was successful!</p>
            </>
          ) : (
            <>
              <img src={failedImage} alt="Payment failed" style={{ width: '100px' }} />
              <p>Payment failed: {errorMessage}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckoutForm;
