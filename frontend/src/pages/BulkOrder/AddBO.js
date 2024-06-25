import React, { useState } from "react";
import axios from "axios";
import './AddBO.css'; 

const AddBO = () => {
  const [customerName, setCustomerName] = useState("");
  const [orderedQuantity, setOrderedQuantity] = useState("");
  const [fullPayment, setFullPayment] = useState("");
  const [donePayment, setDonePayment] = useState("");
  const [remainingPayment, setRemainingPayment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {

     // Basic validation
      if (!customerName || !orderedQuantity || !fullPayment || !donePayment || !remainingPayment) {
        setError("All fields are required.");
        return;
      }

      if (orderedQuantity <= 0 || fullPayment <= 0 || donePayment < 0 || remainingPayment < 0) {
        setError("Please enter valid values for Quantity and Payments.");
        return;
      }

      if (donePayment > fullPayment) {
        setError("Done payment cannot be greater than full payment.");
        return;
      }
      await axios.post("/api/bulkOrders", {
        custermer_name: customerName,
        ordered_quantity: orderedQuantity,
        full_payment: fullPayment,
        done_payment: donePayment,
        remaining_payment: remainingPayment
      });
      setSuccess(true);
      setError(null);
      setCustomerName("");
      setOrderedQuantity("");
      setFullPayment("");
      setDonePayment("");
      setRemainingPayment("");
    } catch (error) {
      setError("Error adding bulk order details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-partner-container">
      <h2>Add New Bulk Order Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ordered Quantity:</label>
          <input
            type="number"
            value={orderedQuantity}
            onChange={(e) => setOrderedQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Full Payment:</label>
          <input
            type="number"
            value={fullPayment}
            onChange={(e) => setFullPayment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Done Payment:</label>
          <input
            type="number"
            value={donePayment}
            onChange={(e) => setDonePayment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Remaining Payment:</label>
          <input
            type="number"
            value={remainingPayment}
            onChange={(e) => setRemainingPayment(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Bulk Order Details"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Bulk order details added successfully!</div>}
    </div>
  );
};

export default AddBO;


// import React, { useState } from "react";
// import axios from "axios";
// import './AddBO.css'; 

// const AddBO = () => {
//   const [customerName, setCustomerName] = useState("");
//   const [orderedQuantity, setOrderedQuantity] = useState("");
//   const [fullPayment, setFullPayment] = useState("");
//   const [donePayment, setDonePayment] = useState("");
//   const [remainingPayment, setRemainingPayment] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     try {
//       // Basic validation
//       if (!customerName || !orderedQuantity || !fullPayment || !donePayment || !remainingPayment) {
//         setError("All fields are required.");
//         return;
//       }

//       if (orderedQuantity <= 0 || fullPayment <= 0 || donePayment < 0 || remainingPayment < 0) {
//         setError("Please enter valid values for Quantity and Payments.");
//         return;
//       }

//       if (donePayment > fullPayment) {
//         setError("Done payment cannot be greater than full payment.");
//         return;
//       }

//       await axios.post("/api/bulkOrders", {
//         customer_name: customerName,
//         ordered_quantity: orderedQuantity,
//         full_payment: fullPayment,
//         done_payment: donePayment,
//         remaining_payment: remainingPayment
//       });
//       setSuccess(true);
//       setError(null);
//       setCustomerName("");
//       setOrderedQuantity("");
//       setFullPayment("");
//       setDonePayment("");
//       setRemainingPayment("");
//     } catch (error) {
//       setError("Error adding bulk order details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-partner-container">
//       <h2>Add New Bulk Order Details</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Customer Name:</label>
//           <input
//             type="text"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Ordered Quantity:</label>
//           <input
//             type="number"
//             value={orderedQuantity}
//             onChange={(e) => setOrderedQuantity(e.target.value)}
//             required
//             min="1"
//           />
//         </div>
//         <div className="form-group">
//           <label>Full Payment:</label>
//           <input
//             type="number"
//             value={fullPayment}
//             onChange={(e) => setFullPayment(e.target.value)}
//             required
//             min="1"
//           />
//         </div>
//         <div className="form-group">
//           <label>Done Payment:</label>
//           <input
//             type="number"
//             value={donePayment}
//             onChange={(e) => setDonePayment(e.target.value)}
//             required
//             min="0"
//           />
//         </div>
//         <div className="form-group">
//           <label>Remaining Payment:</label>
//           <input
//             type="number"
//             value={remainingPayment}
//             onChange={(e) => setRemainingPayment(e.target.value)}
//             required
//             min="0"
//           />
//         </div>
//         <button type="submit" disabled={loading} className="submit-button">
//           {loading ? "Adding..." : "Add Bulk Order Details"}
//         </button>
//       </form>
//       {error && <div className="error-message">{error}</div>}
//       {success && <div className="success-message">Bulk order details added successfully!</div>}
//     </div>
//   );
// };

// export default AddBO;

