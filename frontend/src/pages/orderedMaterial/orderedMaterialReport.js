import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';


import './orderedMaterialReport.css'; // Update import to OrderedMaterialReport.css

const OrderedMaterialReport = () => {
  const [orderedMaterials, setOrderedMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderedMaterials = async () => {
      try {
        const response = await axios.get('/api/orderedMaterials'); // Change endpoint to fetch ordered materials
        setOrderedMaterials(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch ordered material details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching ordered material details:', error.message);
        }
      }
    };
    fetchOrderedMaterials();
  }, []);

  useEffect(() => {
    let statusChart = null; // Initialize Chart instance variable for status chart

    const createChart = () => {
      // Destroy existing Chart instance if it exists
      if (statusChart) {
        statusChart.destroy();
      }

      // Status Chart
      const statusCtx = document.getElementById('statusChart').getContext('2d');
      statusChart = new Chart(statusCtx, {
        type: 'pie',
        data: {
          labels: ['Pending', 'Delivered'], // Adjust labels
          datasets: [{
            label: 'Order Status', // Adjust label
            data: [
              orderedMaterials.filter(material => material.ordred_status === 'Pending').length,
              orderedMaterials.filter(material => material.ordred_status === 'Delivered').length
            ],
            backgroundColor: ['#2196F3', '#4CAF50'],
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
              text: 'Order Status', // Adjust title
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (orderedMaterials.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (statusChart) {
        statusChart.destroy();
      }
    };
  }, [orderedMaterials]);

  // Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  
    const columns = ["Material Name", "Ordered Quantity", "Supplier Name", "Ordered Cost", "Ordered Status"];
    const data = orderedMaterials.map(material => [
      material.material_name,
      material.orderd_quantity,
      material.supplier_name,
      material.ordred_cost,
      material.ordred_status
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
    doc.text("Ordered Material Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('OrderedMaterial_report.pdf');
  };
  backgroundImage.src = pdfimg; 
};

  return (
    <div>
            <Home2nav />
    <div className="ordered-material-report"> {/* Change class name to ordered-material-report */}
      <h2>Ordered Material Report</h2>
      <div className="ordered-material-container"> {/* Change class name to ordered-material-container */}
        <div className="ordered-material-details-column"> {/* Change class name to ordered-material-details-column */}
          {error && <div>Error: {error}</div>}
          <div className="ordered-materials"> {/* Change class name to ordered-materials */}
            {orderedMaterials.map(material => (
              <div className="ordered-material-item" key={material._id}> {/* Change class name to ordered-material-item */}
                <h3 className="ordered-material-name">{material.material_name}</h3> {/* Change class name to ordered-material-name */}
                <p className="ordered-material-detail"><strong>Ordered Quantity:</strong> {material.orderd_quantity}</p> {/* Change class name to ordered-material-detail */}
                <p className="ordered-material-detail"><strong>Supplier Name:</strong> {material.supplier_name}</p> {/* Change class name to ordered-material-detail */}
                <p className="ordered-material-detail"><strong>Ordered Cost:</strong> {material.ordred_cost}</p> {/* Change class name to ordered-material-detail */}
                <p className="ordered-material-detail"><strong>Ordered Status:</strong> {material.ordred_status}</p> {/* Change class name to ordered-material-detail */}
              </div>
            ))}
          </div>
        </div>
        <div className="ordered-chart-column"> {/* Change class name to ordered-chart-column */}
          <div className="ordered-chart-container">
            <h2 className="ordered-chart-title">Order Status</h2> {/* Change class name to ordered-chart-title */}
            <canvas id="statusChart" className="ordered-chart-canvas" width="400" height="200"></canvas> {/* Keep canvas id as statusChart */}
          </div>
          <Link to="/MaterialManage" className="back-button">Back To Menu</Link> {/* Adjust link destination */}
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>

  );
};

export default OrderedMaterialReport;
