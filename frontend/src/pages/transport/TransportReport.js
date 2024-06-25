import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';


import './TransportReport.css';

const TransportReport = () => {
  const [transports, setTransports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get('/api/transports');
        setTransports(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch transport details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching transport details:', error.message);
        }
      }
    };
    fetchTransports();
  }, []);

  useEffect(() => {
    let conditionChart = null; 
    let availabilityChart = null; 

    const createCharts = () => {
      
      if (conditionChart) {
        conditionChart.destroy();
      }
      if (availabilityChart) {
        availabilityChart.destroy();
      }

      // Condition Chart
      const conditionCtx = document.getElementById('conditionChart').getContext('2d');
      conditionChart = new Chart(conditionCtx, {
        type: 'pie',
        data: {
          labels: ['Good', 'Not Good'],
          datasets: [{
            label: 'Vehicle Condition',
            data: [
              transports.filter(transport => transport.vehicle_condition === 'Good').length,
              transports.filter(transport => transport.vehicle_condition === 'Not Good').length
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
              text: 'Vehicle Condition',
              font: {
                size: 20
              }
            }
          }
        }
      });

  // Availability Chart - Bar chart
  const availabilityCtx = document.getElementById('availabilityChart').getContext('2d');
  const availabilityData = {
    labels: ['Van', 'Lorry'],
    datasets: [{
      label: 'Available',
      data: [
        transports.filter(transport => transport.vehicle_type === 'van' && transport.vehicle_availability === 'Available').length,
        transports.filter(transport => transport.vehicle_type === 'lorry' && transport.vehicle_availability === 'Available').length
      ],
      backgroundColor: '#4caf50',
      borderWidth: 1
    }, {
      label: 'Not Available',
      data: [
        transports.filter(transport => transport.vehicle_type === 'van' && transport.vehicle_availability === 'Not Available').length,
        transports.filter(transport => transport.vehicle_type === 'lorry' && transport.vehicle_availability === 'Not Available').length
      ],
      backgroundColor: '#f44336',
      borderWidth: 1
    }]
  };

  availabilityChart = new Chart(availabilityCtx, {
    type: 'bar',
    data: availabilityData,
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Vehicle Availability',
          font: {
            size: 20
          }
        }
      }
    }
  });
};

if (transports.length > 0) {
  createCharts();
}

return () => {
  if (conditionChart) {
    conditionChart.destroy();
  }
  if (availabilityChart) {
    availabilityChart.destroy();
  }
};
}, [transports]);

  // Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const columns = ["Vehicle Number", "Vehicle Type", "Brand Name", "Condition", "Availability"];
    const data = transports.map(transport => [
      transport.vehicle_number,
      transport.vehicle_type,
      transport.vehicle_brandName,
      transport.vehicle_condition,
      transport.vehicle_availability
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
    doc.text("Transport Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('Transport_report.pdf');
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
          <div className="transports">
            {transports.map(transport => (
              <div className="transport-item" key={transport._id}>
                <h3 className="vehicle-number">{transport.vehicle_number}</h3>
                <p className="transport-detail"><strong>Vehicle Type:</strong> {transport.vehicle_type}</p>
                <p className="transport-detail"><strong>Brand Name:</strong> {transport.vehicle_brandName}</p>
                <p className="transport-detail"><strong>Condition:</strong> {transport.vehicle_condition}</p>
                <p className="transport-detail"><strong>Availability:</strong> {transport.vehicle_availability}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-column">
          <div className="chart-container">
            <h2 className="chart-title">Vehicle Condition</h2>
            <canvas id="conditionChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <div className="chart-container">
            <h2 className="chart-title">Vehicle Availability</h2>
            <canvas id="availabilityChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <Link to="/TransportManage" className="back-button">Back To Menu</Link>
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>

  );
};

export default TransportReport;
