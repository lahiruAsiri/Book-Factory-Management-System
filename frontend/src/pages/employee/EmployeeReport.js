import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';

import './EmployeeReport.css';

const EmployeeReport = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch employee details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching employee details:', error.message);
        }
      }
    };
    fetchEmployees();
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
          labels: ['Holiday = 0', 'Holiday > 0'],
          datasets: [{
            label: 'Employee Holiday Status',
            data: [
              employees.filter(employee => employee.employee_holidays === 0).length,
              employees.filter(employee => employee.employee_holidays > 0).length
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
              text: 'Employee Holiday Status',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (employees.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [employees]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      const columns = ["Employee Name", "NIC", "Position", "Address", "Holidays", "Phone Number"];
      const data = employees.map(employee => [
        employee.employee_name,
        employee.employee_NIC,
        employee.employee_position,
        employee.employee_adresses,
        employee.employee_holidays,
        employee.phone_number
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
      doc.text("Employee Report", 105, headerTopMargin, null, null, "center");
      doc.save('employee_report.pdf');
    };
    backgroundImage.src = pdfimg;
  };

  return (
    <div>
      <Home2nav />
      <div className="employee-report">
        <h2>Employee Report</h2>
        <div className="employee-container">
          <div className="employee-details-column">
            {error && <div>Error: {error}</div>}
            <div className="employees">
              {employees.map(employee => (
                <div className="employee-item" key={employee._id}>
                  <h3 className="employee-name">{employee.employee_name}</h3>
                  <p className="employee-detail"><strong>Employee NIC:</strong> {employee.employee_NIC}</p>
                  <p className="employee-detail"><strong>Employee Position:</strong> {employee.employee_position}</p>
                  <p className="employee-detail"><strong>Employee Address:</strong> {employee.employee_adresses}</p>
                  <p className="employee-detail"><strong>Employee Holidays:</strong> {employee.employee_holidays}</p>
                  <p className="employee-detail"><strong>Phone Number:</strong> {employee.phone_number}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column">
            <div className="chart-container">
              <h2 className="chart-title">Employee Holiday Status</h2>
              <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <Link to="/EmployeeManage" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
