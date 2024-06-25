import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';


import './OrderReport.css';

const OrderReport = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch orders: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching orders:', error.message);
        }
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let myChart = null; // Initialize Chart instance variable

    const createChart = () => {
      // Destroy existing Chart instance if it exists
      if (myChart) {
        myChart.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Delivered', 'Not Delivered'],
          datasets: [{
            label: 'Delivery Status',
            data: [
              orders.filter(order => order.delivery_status === 'Delivered').length,
              orders.filter(order => order.delivery_status === 'Not Delivered').length
            ],
            backgroundColor: ['#36a2eb', '#ff6384'],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Delivery Status',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (orders.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [orders]);

  // Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  
    const columns = ["Customer", "Ordered Books", "Order Quantity", "Order Address", "Ordered Date", "Delivery Status"];
    const data = orders.map(order => [
      order.order_coustermer,
      order.ordered_books,
      order.order_quantity,
      order.order_adresses,
      order.ordered_date,
      order.delivery_status
    ]);

    // Add table (content starts lower)
    doc.autoTable({
      startY: 70, 
      head: [columns],
      body: data,
      theme: 'striped', 
      margin: { top: 20 },
      styles: {
        font: 'helvetica', 
        fontStyle: 'normal',
        fontSize: 10,
        lineColor: '#ffffff', 
        textColor: '#000000' 
      },
      headStyles: {
        fillColor: '#000000',
        textColor: '#ffffff' 
      }
    });

    // Header
    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor('#000000'); 
    const headerTopMargin = 60; 
    doc.text("Order Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('Order_report.pdf');
  };
  backgroundImage.src = pdfimg; 
};

  return (
    <div>
    <Home2nav />
    <div className="order-report">
      <h2>Order Report</h2>
      <div className="order-container">
        <div className="order-details-column">
          {error && <div>Error: {error}</div>}
          <div className="orders">
            {orders.map(order => (
              <div className="order-item" key={order._id}>
                <h3 className="order-customer">{order.order_coustermer}</h3>
                <p className="order-detail"><strong>Ordered Books:</strong> {order.ordered_books}</p>
                <p className="order-detail"><strong>Order Quantity:</strong> {order.order_quantity}</p>
                <p className="order-detail"><strong>Order Address:</strong> {order.order_adresses}</p>
                <p className="order-detail"><strong>Ordered Date:</strong> {order.ordered_date}</p>
                <p className="order-detail"><strong>Delivery Status:</strong> {order.delivery_status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-column">
          <div className="chart-container">
            <h2 className="chart-title">Delivery Status</h2>
            <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <Link to="/OrderManage" className="back-button">Back To Menu</Link>
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>

  );
};

export default OrderReport;
