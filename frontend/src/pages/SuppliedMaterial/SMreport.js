import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';

import './SMreport.css'; // Update import to MaterialReport.css
import Home2nav from '../../components/home2nav';


const SMreport = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('/api/suppliedMaterials'); // Change endpoint to fetch supplied materials
        setMaterials(response.data);
      } catch (error) {
        setError('Error fetching supplied material details');
      }
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    let quantityChart = null; // Initialize Chart instance variable for quantity chart

    const createChart = () => {
      // Destroy existing Chart instance if it exists
      if (quantityChart) {
        quantityChart.destroy();
      }

      // Quantity Chart
      const quantityCtx = document.getElementById('quantityChart').getContext('2d');
      quantityChart = new Chart(quantityCtx, {
        type: 'bar',
        data: {
          labels: materials.map(material => material.material_name),
          datasets: [{
            label: 'Material Quantity', // Adjust label
            data: materials.map(material => material.quantity),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
            title: {
              display: true,
              text: 'Material Quantity Chart', // Adjust title
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (materials.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (quantityChart) {
        quantityChart.destroy();
      }
    };
  }, [materials]);

  // Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const columns = ["Material Name", "Quantity"];
    const data = materials.map(material => [
      material.material_name,
      material.quantity
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
    doc.text("Supplied Material Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('SuppliedMaterial_report.pdf');
  };
  backgroundImage.src = pdfimg; 
};

  return (
    <div>
    <Home2nav />
    <div className="material-report"> {/* Change class name to material-report */}
      <h2>Material Report</h2>
      <div className="material-container"> {/* Change class name to material-container */}
        <div className="material-details-column"> {/* Change class name to material-details-column */}
          {error && <div>Error: {error}</div>}
          <div className="materials"> {/* Change class name to materials */}
            {materials.map(material => (
              <div className="material-item" key={material._id}> {/* Change class name to material-item */}
                <h3 className="material-name">{material.material_name}</h3> {/* Change class name to material-name */}
                <p className="material-detail"><strong>Quantity:</strong> {material.quantity}</p> {/* Change class name to material-detail */}
              </div>
            ))}
          </div>
        </div>
        <div className="chart-column"> {/* Change class name to chart-column */}
          <div className="chart-container">
            <h2 className="chart-title">Material Quantity Chart</h2> {/* Change class name to chart-title */}
            <canvas id="quantityChart" className="chart-canvas" width="400" height="200"></canvas> {/* Keep canvas id as quantityChart */}
          </div>
          <Link to="/SMmanage" className="back-button">Back To Menu</Link> {/* Adjust link destination */}
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>

  );
};

export default SMreport;
