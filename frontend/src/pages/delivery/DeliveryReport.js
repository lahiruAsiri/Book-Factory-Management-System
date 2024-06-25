import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import pdfimg from '../../img/pdfimg.png';
import 'jspdf-autotable';
import './DeliveryReport.css';

const DeliveryReport = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('/api/deliverys');
        setDeliveries(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch delivery details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching delivery details:', error.message);
        }
      }
    };
    fetchDeliveries();
  }, []);

  useEffect(() => {
    let statusChart = null;

    const createChart = () => {
      if (statusChart) {
        statusChart.destroy();
      }

      const statusCtx = document.getElementById('statusChart').getContext('2d');
      statusChart = new Chart(statusCtx, {
        type: 'pie',
        data: {
          labels: ['Delivered', 'Ongoing'],
          datasets: [{
            label: 'Delivery Status',
            data: [
              deliveries.filter(delivery => delivery.delivery_status === 'Delivered').length,
              deliveries.filter(delivery => delivery.delivery_status === 'Ongoing Delivering').length
            ],
            backgroundColor: ['#4caf50', '#f44336'],
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

    if (deliveries.length > 0) {
      createChart(); 
    }

    return () => {
      if (statusChart) {
        statusChart.destroy();
      }
    };
  }, [deliveries]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();

    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

      const columns = ["Vehicle Number", "Vehicle Location", "Delivery Status"];
      const data = deliveries.map(delivery => [delivery.vehicle_number, delivery.vehicle_location, delivery.delivery_status]);

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
      doc.text("Delivery Report", 105, headerTopMargin, null, null, "center");

      doc.save('delivery_report.pdf');
    };
    backgroundImage.src = pdfimg;
  };

  return (
    <div>
      <Home2nav />
      <div className="transport-report">
        <h2>Transport Report</h2>
        <div className="transport-container">
          <div className="transport-details-column">
            {error && <div>Error: {error}</div>}
            <div className="deliveries">
              {deliveries.map(delivery => (
                <div className="delivery-item" key={delivery._id}>
                  <h3 className="vehicle-number">{delivery.vehicle_number}</h3>
                  <p className="delivery-detail"><strong>Vehicle Location:</strong> {delivery.vehicle_location}</p>
                  <p className="delivery-detail"><strong>Delivery Status:</strong> {delivery.delivery_status}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column">
            <div className="chart-container">
              <h2 className="chart-title">Delivery Status</h2>
              <canvas id="statusChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <Link to="/DeliveryManage" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryReport;
