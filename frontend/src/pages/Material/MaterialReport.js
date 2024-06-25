import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';

import './MaterialReport.css'; // Update import to MaterialReport.css

const MaterialReport = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('/api/materials'); // Change endpoint to fetch materials
        setMaterials(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch material details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching material details:', error.message);
        }
      }
    };
    fetchMaterials();
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
          labels: ['Available', 'Not Available'], // Adjust labels
          datasets: [{
            label: 'Material Availability', // Adjust label
            data: [
              materials.filter(material => material.material_availability === 'Available').length,
              materials.filter(material => material.material_availability === 'Not Available').length
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
              text: 'Material Availability', // Adjust title
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
      if (statusChart) {
        statusChart.destroy();
      }
    };
  }, [materials]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      const columns = ["Material Name", "Material Price", "Material Quantity", "Material Availability"];
      const data = materials.map(material => [
        material.material_name,
        material.material_price,
        material.material_quantity,
        material.material_availability
      ]);
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
      doc.text("Material Report", 105, headerTopMargin, null, null, "center");
      doc.save('material_report.pdf');
    };
    backgroundImage.src = pdfimg;
  };

  return (
    <div>
      <Home2nav />
      <div className="material-report"> 
        <h2>Material Report</h2>
        <div className="material-container"> 
          <div className="material-details-column"> 
            {error && <div>Error: {error}</div>}
            <div className="materials"> 
              {materials.map(material => (
                <div className="material-item" key={material._id}> 
                  <h3 className="material-name">{material.material_name}</h3> 
                  <p className="material-detail"><strong>Material Price:</strong> {material.material_price}</p> 
                  <p className="material-detail"><strong>Material Quantity:</strong> {material.material_quantity}</p> 
                  <p className="material-detail"><strong>Material Availability:</strong> {material.material_availability}</p> 
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column"> 
            <div className="chart-container">
              <h2 className="chart-title">Material Availability</h2> 
              <canvas id="statusChart" className="chart-canvas" width="400" height="200"></canvas> 
            </div>
            <Link to="/MaterialManage" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialReport;
