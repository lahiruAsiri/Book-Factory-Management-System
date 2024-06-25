import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';

import './MachineReport.css';

const MachineReport = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('/api/machines');
        setMachines(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch machine details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching machine details:', error.message);
        }
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    let conditionChart = null; // Initialize Chart instance variable
    let availabilityChart = null; // Initialize Chart instance variable

    const createConditionChart = () => {
      // Destroy existing Chart instance if it exists
      if (conditionChart) {
        conditionChart.destroy();
      }

      const ctx = document.getElementById('conditionChart').getContext('2d');
      conditionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Good', 'Not Good'],
          datasets: [{
            label: 'Machine Condition',
            data: [
              machines.filter(machine => machine.machine_condition === 'Good').length,
              machines.filter(machine => machine.machine_condition === 'Not Good').length
            ],
            backgroundColor: ['#36a2eb', '#ffcc00'],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Machine Condition',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    const createAvailabilityChart = () => {
      // Destroy existing Chart instance if it exists
      if (availabilityChart) {
        availabilityChart.destroy();
      }

      const ctx = document.getElementById('availabilityChart').getContext('2d');
      availabilityChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Available', 'Not Available'],
          datasets: [{
            label: 'Machine Availability',
            data: [
              machines.filter(machine => machine.machine_availableStatus === 'Available').length,
              machines.filter(machine => machine.machine_availableStatus === 'Not Available').length
            ],
            backgroundColor: ['#ffcc00', '#36a2eb'],
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
              text: 'Machine Availability',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (machines.length > 0) {
      createConditionChart(); // Initial chart creation
      createAvailabilityChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instances when component unmounts
      if (conditionChart) {
        conditionChart.destroy();
      }
      if (availabilityChart) {
        availabilityChart.destroy();
      }
    };
  }, [machines]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      const columns = ["Machine Number", "Machine Name", "Machine Condition", "Machine Availability"];
      const data = machines.map(machine => [
        machine.machine_number,
        machine.machine_name,
        machine.machine_condition,
        machine.machine_availableStatus
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
      doc.text("Machine Report", 105, headerTopMargin, null, null, "center");
      doc.save('machine_report.pdf');
    };
    backgroundImage.src = pdfimg;
  };

  return (
    <div>
      <Home2nav />
      <div className="machine-report">
        <h2>Machine Report</h2>
        <div className="machine-container">
          <div className="machine-details-column">
            {error && <div>Error: {error}</div>}
            <div className="machines">
              {machines.map(machine => (
                <div className="machine-item" key={machine._id}>
                  <h3 className="machine-number">{machine.machine_number}</h3>
                  <p className="machine-detail"><strong>Machine Name:</strong> {machine.machine_name}</p>
                  <p className="machine-detail"><strong>Machine Condition:</strong> {machine.machine_condition}</p>
                  <p className="machine-detail"><strong>Machine Availability:</strong> {machine.machine_availableStatus}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column">
            <div className="chart-container">
              <h2 className="chart-title">Machine Condition</h2>
              <canvas id="conditionChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Machine Availability</h2>
              <canvas id="availabilityChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <Link to="/MachineManage" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineReport;
