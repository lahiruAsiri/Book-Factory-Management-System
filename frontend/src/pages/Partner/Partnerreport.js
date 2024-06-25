import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';


import './PartnerReport.css';

const PartnerReport = () => {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('/api/partners');
        setPartners(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch partner details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching partner details:', error.message);
        }
      }
    };
    fetchPartners();
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
          labels: ['Paid', 'Pending'],
          datasets: [{
            label: 'Payment Status',
            data: [
              partners.filter(partner => partner.payment_status === 'Paid').length,
              partners.filter(partner => partner.payment_status === 'Pending').length
            ],
            backgroundColor: ['#36a2eb', '#ffcc00'],
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
              text: 'Payment Status',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (partners.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [partners]);

  // Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const columns = ["Partner Name", "Shop Address", "Payment Status"];
    const data = partners.map(partner => [
      partner.partner_name,
      partner.shop_adresses,
      partner.payment_status
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
    doc.text("Partner Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('Partner_report.pdf');
  };
  backgroundImage.src = pdfimg; 
};

  return (
    <div>
    <Home2nav />
    <div className="partner-report">
      <h2>Partner Report</h2>
      <div className="partner-container">
        <div className="partner-details-column">
          {error && <div>Error: {error}</div>}
          <div className="partners">
            {partners.map(partner => (
              <div className="partner-item" key={partner._id}>
                <h3 className="partner-shopName">{partner.partner_shopName}</h3>
                <p className="partner-detail"><strong>Partner Name:</strong> {partner.partner_name}</p>
                <p className="partner-detail"><strong>Shop Address:</strong> {partner.shop_adresses}</p>
                <p className="partner-detail"><strong>Payment Status:</strong> {partner.payment_status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-column">
          <div className="chart-container">
            <h2 className="chart-title">Payment Status</h2>
            <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <Link to="/PartnerManage" className="back-button">Back To Menu</Link>
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>
  );
};

export default PartnerReport;
