import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import pdfimg from '../../img/pdfimg.png';
import 'jspdf-autotable';
import './BOreport.css';

const BulkOrderReport = () => {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBulkOrders = async () => {
      try {
        const response = await axios.get('/api/bulkOrders');
        setBulkOrders(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch bulk order details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching bulk order details:', error.message);
        }
      }
    };
    fetchBulkOrders();
  }, []);

  useEffect(() => {
    let myChart = null; 

    const createChart = () => {
      if (myChart) {
        myChart.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: bulkOrders.map(order => order.custermer_name),
          datasets: [{
            label: 'Ordered Quantity',
            data: bulkOrders.map(order => order.ordered_quantity),
            backgroundColor: '#36a2eb',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Ordered Quantity',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (bulkOrders.length > 0) {
      createChart(); 
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [bulkOrders]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();

    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

      const columns = ["Customer Name", "Ordered Quantity", "Full Payment", "Done Payment", "Remaining Payment"];
      const data = bulkOrders.map(order => [order.custermer_name, order.ordered_quantity, order.full_payment, order.done_payment, order.remaining_payment]);

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

      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.setTextColor('#000000');
      const headerTopMargin = 60;
      doc.text("Bulk Order Report", 105, headerTopMargin, null, null, "center");

      doc.save('bulk_order_report.pdf');
    };
    backgroundImage.src = pdfimg;
  };

  return (
    <div>
      <Home2nav />
      <div className="bulk-order-report">
        <h2>Bulk Order Report</h2>
        <div className="bulk-order-container">
          <div className="bulk-order-details-column">
            {error && <div>Error: {error}</div>}
            <div className="bulk-orders">
              {bulkOrders.map(order => (
                <div className="bulk-order-item" key={order._id}>
                  <h3 className="bulk-order-customer">{order.custermer_name}</h3>
                  <p className="bulk-order-detail"><strong>Ordered Quantity:</strong> {order.ordered_quantity}</p>
                  <p className="bulk-order-detail"><strong>Full Payment:</strong> {order.full_payment}</p>
                  <p className="bulk-order-detail"><strong>Done Payment:</strong> {order.done_payment}</p>
                  <p className="bulk-order-detail"><strong>Remaining Payment:</strong> {order.remaining_payment}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column">
            <div className="chart-container">
              <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <Link to="/BulkOrderManage" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderReport;
