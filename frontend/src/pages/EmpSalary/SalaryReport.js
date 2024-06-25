import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';

import './SalaryReport.css';

const EmployeeSalaryReport = () => {
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get('/api/employeeSalarys');
        setSalaries(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch salary details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching salary details:', error.message);
        }
      }
    };
    fetchSalaries();
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
          labels: ['Pending', 'Completed'],
          datasets: [{
            label: 'Salary Status',
            data: [
              salaries.filter(salary => salary.employee_salary_status === 'Pending').length,
              salaries.filter(salary => salary.employee_salary_status === 'Completed').length
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
              text: 'Salary Status',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (salaries.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [salaries]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      const columns = ["Employee Name", "NIC", "OT Hours", "Salary Amount", "Salary Status"];
      const data = salaries.map(salary => [
        salary.employee_name,
        salary.employee_NIC,
        salary.employee_OT,
        salary.employee_salaryAmount,
        salary.employee_salary_status
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
      doc.text("Employee Salary Report", 105, headerTopMargin, null, null, "center");
      doc.save('employee_salary_report.pdf');
    };
    backgroundImage.src = pdfimg;
  };

  return (
    <div>
      <Home2nav />
      <div className="salary-report">
        <h2>Employee Salary Report</h2>
        <div className="salary-container">
          <div className="salary-details-column">
            {error && <div>Error: {error}</div>}
            <div className="salaries">
              {salaries.map(salary => (
                <div className="salary-item" key={salary._id}>
                  <h3 className="employee-name">{salary.employee_name}</h3>
                  <p className="salary-detail"><strong>Employee NIC:</strong> {salary.employee_NIC}</p>
                  <p className="salary-detail"><strong>OT Hours:</strong> {salary.employee_OT}</p>
                  <p className="salary-detail"><strong>Salary Amount:</strong> {salary.employee_salaryAmount}</p>
                  <p className="salary-detail"><strong>Salary Status:</strong> {salary.employee_salary_status}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column">
            <div className="chart-container">
              <h2 className="chart-title">Salary Status</h2>
              <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <Link to="/EmpSalaryManage" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaryReport;
