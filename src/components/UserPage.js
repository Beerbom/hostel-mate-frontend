import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import { Modal, Button } from 'react-bootstrap';
import CheckoutForm from './CheckOutForm';
import '../App.css';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messDutyData, setMessDutyData] = useState([]);
  const [messBillData, setMessBillData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(''); // Track payment status

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get('/api/nextpage', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchUserMessDuty = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get('/api/usermessduty', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessDutyData(response.data);
      } catch (error) {
        console.error('Error fetching mess duty data', error);
      }
    };

    const fetchMessBill = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get('/api/usermessbill', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessBillData(response.data.userMessBill);
      } catch (error) {
        console.error('Error fetching mess bill', error);
      }
    };

    fetchUserMessDuty();
    fetchMessBill();
  }, []);

  const handleMoreDetailsClick = async () => {
    setShowModal(true);
    try {
      const response = await axios.get('/api/latest-messbill');
      setMessBillData(response.data.messBillData);
    } catch (error) {
      console.error('Error fetching latest mess bill data:', error);
    }
  };

  const handlePaymentClick = async () => {
    setShowPay(true);

    
    const paymentData = {
      amount: Math.round(user.TotalAmount + user.Fine),
      id: 'payment_method_id', 
      payerName: user.name, 
      payerMail: user.email, 
    };

    try {
      const response = await axios.post('/api/pay', paymentData);
      if (response.data.success) {
        setPaymentStatus('Paid'); // Update payment status
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowPay(false);
  };

  if (loading) return <Loader />;

  return (
    <>
      {user && <UserNavbar username={user} />}
      <div className="container mt-4">
        <h3>Mess Duty Data</h3>
        {messDutyData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th className="text-center">From Date</th>
                  <th className="text-center">To Date</th>
                </tr>
              </thead>
              <tbody>
                {messDutyData.map((duty, index) => (
                  <tr key={index}>
                    <td className="text-center">{duty.fromDate}</td>
                    <td className="text-center">{duty.toDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No mess duty data found for the logged-in user.</p>
        )}

        <h3>Mess Bill Details</h3>
        {user && (
          <div>
            <div className="bill-format">
              <div className="bill-item">
                <span>Amount:</span>
                <span>{user.TotalAmount}</span>
              </div>
              <div className="bill-item">
                <span>Fine:</span>
                <span>{user.Fine}</span>
              </div>
              <div className="bill-item">
                <span>Total Attendance:</span>
                <span>{user.TotalAttendance}</span>
              </div>
              <div className="bill-item">
                <span>Total Amount to be paid :</span>
                <span>
                  <strong>{Math.round(user.TotalAmount + user.Fine)}</strong>/- Rs
                </span>
              </div>
              <div className="mt-3">
                <Button variant="primary" onClick={handleMoreDetailsClick}>
                  More Details
                </Button>{' '}
                <Button
                  variant="warning"
                  style={{ color: 'white', fontWeight: 500 }}
                  onClick={handlePaymentClick}
                  disabled={paymentStatus === 'Paid'}
                >
                  {paymentStatus === 'Paid' ? 'Paid' : `Pay ${Math.round(user.TotalAmount + user.Fine)} Rs`}
                </Button>
              </div>
            </div>
          </div>
        )}

        <Modal className="custom-modal" show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Mess Bill Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {messBillData && (
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">Date</th>
                      <th className="text-center">Total Establishment Charge</th>
                      <th className="text-center">Total Food Charge</th>
                      <th className="text-center">Rate Per Day</th>
                      <th className="text-center">No Of Users</th>
                      <th className="text-center">Total Attendance</th>
                      <th className="text-center">Total Fine</th>
                      <th className="text-center">Ess Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">{messBillData.date}</td>
                      <td className="text-center">{messBillData.TotalEstablishmentcharge}</td>
                      <td className="text-center">{messBillData.TotalFoodCharge}</td>
                      <td className="text-center">{Math.round(messBillData.RatePerDay)}</td>
                      <td className="text-center">{messBillData.NumberofUser}</td>
                      <td className="text-center">{messBillData.TotalAttendance}</td>
                      <td className="text-center">{messBillData.Fine}</td>
                      <td className="text-center">{Math.round(messBillData.esscharge)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* <CheckoutForm amount={Math.round(user.TotalAmount + user.Fine)} handleClose={handleCloseModal} /> */}
          </Modal.Footer>
        </Modal>
        <Modal className="custom-modal" show={showPay} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Payment Gateway</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CheckoutForm amount={Math.round(user.TotalAmount + user.Fine)} handleClose={handleCloseModal} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default UserPage;
