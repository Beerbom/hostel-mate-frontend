// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate} from 'react-router-dom';

// // function AdminLogin() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const history = useNavigate(); // Get the history object
 
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Check if username and password match admin credentials
// //       if (username === "abc" && password === "1234") {
// //         // If credentials are correct, redirect to admin dashboard or page
// //         history('/userview');
// //       } else {
// //         // If credentials are incorrect, display error message
// //         setErrorMessage('Invalid username or password.');
// //       }
// //     } catch (error) {
// //       console.error('Error logging in:', error);
// //       setErrorMessage('An error occurred while logging in.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className='d-flex justify-content-center'>
// //         <div className='py-8 px-4 shadow rounded-lg px-10 w-100 mt-10 rounded' style={{ backgroundColor: "#2E2E2E", maxWidth: "500px", marginTop: "50px", maxHeight: "1800px" }}>
// //           <h2 className='mt-3 text-white mb-3 '>Admin Login</h2>
// //           {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group" style={{ marginBottom: "20px" }}>
// //               <input
// //                 type="text"
// //                 name="username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 className="form-control text-white"
// //                 style={{ backgroundColor: "#111111", height: "70px", width: "100%" }}
// //                 placeholder="Username"
// //               />
// //             </div>
// //             <div className="form-group" style={{ marginBottom: "20px" }}>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="form-control text-white"
// //                 style={{ backgroundColor: "#111111", height: "70px", width: "100%" }}
// //                 placeholder="Password"
// //               />
// //             </div>
// //             <button type="submit" className="btn btn-primary">Login</button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminLogin;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBar from './Navbar';

// function MessBillForm() {
//   const [formData, setFormData] = useState({
//     date: '',
//     TotalEstablishmentcharge: 0,
//     TotalFoodCharge: 0,
//     Fine: 0,
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [latestMessBill, setLatestMessBill] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false); // State to track editing mode
//   const [editedMessBills, setEditedMessBills] = useState([]); // State to track edited mess bills

//   useEffect(() => {
//     const fetchLatestMessBill = async () => {
//       try {
//         const response = await axios.get('/latest-messbill');
//         const latestMessBillData = response.data.messBillData;
//         setFormData({
//           date: latestMessBillData.date,
//           TotalEstablishmentcharge: latestMessBillData.TotalEstablishmentcharge,
//           TotalFoodCharge: latestMessBillData.TotalFoodCharge,
//           Fine: 0, // Initialize Fine as 0 initially
//         });
//       } catch (error) {
//         setError('Failed to fetch latest mess bill data');
//       }
//     };

//     const genLatestMessBill = async () => {
//       try {
//         const response = await axios.get('/messbillgen');
//         setLatestMessBill(response.data.latestMessBill);
//         setEditedMessBills(response.data.latestMessBill.messBills); // Initialize edited mess bills with latest data
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching latest mess bill:', error);
//         setError('Failed to fetch latest mess bill');
//         setLoading(false);
//       }
//     };

//     fetchLatestMessBill();
//     genLatestMessBill();
//   }, []);

//   const handleFineChange = (index, value) => {
//     const updatedMessBills = [...editedMessBills]; // Use editedMessBills for editing
//     updatedMessBills[index].Fine = value;
//     updatedMessBills[index].TotalAmount = updatedMessBills[index].Amount + parseFloat(value);
//     setEditedMessBills(updatedMessBills);
//   };

//   const handleAddFine = () => {
//     setIsEditing(!isEditing); // Toggle editing state
//   };

//   const handleConfirmUpdate = async () => {
//     try {
//       const response = await axios.post('/update-messbills', { messBills: editedMessBills });
//       setMessage(response.data.message);
//       setIsEditing(false); // Turn off editing mode after successful update
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to update mess bills');
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="container mt-5">
//         <h2 className="mb-4">Mess Bill Form</h2>
//         {message && <div className="alert alert-success">{message}</div>}
//         {error && <div className="alert alert-danger">{error}</div>}
//         <button onClick={handleAddFine} className="btn btn-primary mb-3">
//           {isEditing ? 'Confirm' : 'Add Fine'} {/* Button text changes based on editing state */}
//         </button>
//         <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
//           <thead>
//             <tr>
//               <th>Room No</th>
//               <th>Name</th>
//               <th>Fine</th>
//               <th>Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {editedMessBills.map((bill, index) => (
//               <tr key={index}>
//                 <td>{bill.Room_No}</td>
//                 <td>{bill.Name}</td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       type="number"
//                       value={bill.Fine}
//                       onChange={(e) => handleFineChange(index, e.target.value)}
//                     />
//                   ) : (
//                     bill.Fine // Show fine amount without input field when not editing
//                   )}
//                 </td>
//                 <td>{bill.TotalAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {isEditing && (
//           <button onClick={handleConfirmUpdate} className="btn btn-success mt-3">
//             Confirm {/* Button to confirm and update database */}
//           </button>
//         )}
//       </div>
//     </>
//   );
// }

// export default MessBillForm;
