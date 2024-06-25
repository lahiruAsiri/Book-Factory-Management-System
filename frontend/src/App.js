import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookDetailsPage from './pages/book/BookDetailsPage'; 
import BookSearchPage from './pages/book/BookSearchPage'; 
import SearchBookForUpdate from './pages/book/SearchBookForUpdate'; 
import UpdateBookPage from './pages/book/UpdateBookPage'; 
import Deletebookp from './pages/book/deletebookp'; 
import AddBook from './pages/book/AddBookp'; 
import BookAndOrder from './pages/book/BookAndOrder'; 
import BookDetails from './pages/book/BookDetails'; 
import BookManage from './pages/book/BookManage'; 
import BookQuantityReport from './pages/bookQuantity/BookQuantityReport'; 
import BookQuantityDetails from './pages/bookQuantity/bookQuantityDetails'; 
import DeleteBookQuantity from './pages/bookQuantity/deleteBookQuantity'; 
import SearchBQUpdate from './pages/bookQuantity/SearchBQUpdate'; 
import UpdateBQuantity from './pages/bookQuantity/UpdateBQuantity'; 
import OrderManage from './pages/order/orderManage'; 
import OrderReport from './pages/order/OrderReport'; 
import DeleteOrder from './pages/order/DeleteOrder'; 
import SerachOrderUpdate from './pages/order/SerachOrderUpdate'; 
import UpdateOrder from './pages/order/UpdateOrder'; 
import Printing from './pages/Printing/Printing'; 
import PrintingManage from './pages/Printing/PrintingManage'; 
import PrintingReport from './pages/Printing/PrintingReport'; 
import DeletePrinting from './pages/Printing/DeletePrinting'; 
import SerachPrintingU from './pages/Printing/SearchPrintingU'; 
import UpdatePrinting from './pages/Printing/UpdatePrinting'; 
import MachineManage from './pages/machine/machineManage'; 
import MachineReport from './pages/machine/MachineReport'; 
import DeleteMachine from './pages/machine/DeleteMachine'; 
import SearchMachineU from './pages/machine/SearchMachineU'; 
import UpdateMachine from './pages/machine/UpdateMachine'; 
import Employee from './pages/employee/employee'; 
import EmployeeManage from './pages/employee/employeeManage'; 
import EmployeeReport from './pages/employee/EmployeeReport'; 
import DeleteEmployee from './pages/employee/DeleteEmployee'; 
import SearchEmployeU from './pages/employee/SearchEmployeeU'; 
import UpdateEmployee from './pages/employee/UpdateEmployee'; 
import EmpSalaryManage from './pages/EmpSalary/EmpSalaryManage'; 
import SalaryReport from './pages/EmpSalary/SalaryReport'; 
import DeleteSalary from './pages/EmpSalary/DeleteSalary'; 
import SearchSalaryU from './pages/EmpSalary/SearchSalaryU'; 
import UpdateSalary from './pages/EmpSalary/UpdateSalary'; 
import TransportManage from './pages/transport/transportManage'; 
import TransportReport from './pages/transport/TransportReport'; 
import DeleteTransport from './pages/transport/DeleteTransport'; 
import SearchTransportU from './pages/transport/SearchTrapsortU'; 
import UpdateTransport from './pages/transport/UpdateTransport'; 
import Transport from './pages/transport/transport'; 
import DeliveryManage from './pages/delivery/deliveryManage'; 
import DeliveryReport from './pages/delivery/DeliveryReport'; 
import DeleteDelivery from './pages/delivery/DeleteDelivery'; 
import SearchDeliveryU from './pages/delivery/SearchDeliveryU';
import UpdateDelivery from './pages/delivery/UpdateDelivery';
import Material from './pages/Material/material'; 
import MaterialManage from './pages/Material/materialManage'; 
import MaterialReport from './pages/Material/MaterialReport'; 
import DeleteMaterial from './pages/Material/DeleteMaterial'; 
import SearchMaterialU from './pages/Material/SearchmaterialU';
import UpdateMaterial from './pages/Material/UpdateMaterial';
import OrderedMaterialManage from './pages/orderedMaterial/orderedMaterialManage'; 
import OrderedMaterialReport from './pages/orderedMaterial/orderedMaterialReport'; 
import DeleteorderedMaterial from './pages/orderedMaterial/DeleteorderedMaterial'; 
import SearchOMU from './pages/orderedMaterial/SearchOMU';
import UpdateOM from './pages/orderedMaterial/UpdateOM';
import SMmanage from './pages/SuppliedMaterial/SMmanage'; 
import SMreport from './pages/SuppliedMaterial/SMreport'; 
import DeleteSM from './pages/SuppliedMaterial/DeleteSM'; 
import SearchSMU from './pages/SuppliedMaterial/SearchSMU';
import UpdateSM from './pages/SuppliedMaterial/UpdateSM';
import PartnerManage from './pages/Partner/partnerManage'; 
import PartnerReport from './pages/Partner/Partnerreport'; 
import DeletePartner from './pages/Partner/DeletePartner'; 
import SearchPartnerU from './pages/Partner/SearchPartnerU';
import UpdatePartner from './pages/Partner/UpdatePartner';
import Partner from './pages/Partner/Partner'; 
import BulkOrderManage from './pages/BulkOrder/BulkOrderManage'; 
import BOreport from './pages/BulkOrder/BOreport'; 
import DeleteBO from './pages/BulkOrder/DeleteBO'; 
import SearchBOU from './pages/BulkOrder/SearchBOU';
import UpdateBO from './pages/BulkOrder/UpdateBO';
import Home1 from './pages/Home1';
import Home2 from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import MessageSend from './pages/messagesend';
import Notification from './pages/notification';
import ReceivedMessage from './pages/recievedMessage';
import SentMessage from './pages/sentMessage';

import './App.css';

function App() {
  return (
    <div className="App" >
     <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/Home2" element={<Home2 />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/booksdetails" element={<BookDetailsPage />} />
          <Route path="/GetOneBook" element={<BookSearchPage />} />
          <Route path="/SearchBookForUpdate" element={<SearchBookForUpdate />} />
          <Route path="/books/:book_name/UpdateBookPage" element={<UpdateBookPage />} />
          <Route path="/deletebookp" element={<Deletebookp />} />
          <Route path="/AddBookp" element={<AddBook />} />
          <Route path="/bookandorder" element={<BookAndOrder />} />
          <Route path="/bookManage" element={<BookManage />} />
          <Route path="/BookDetails" element={<BookDetails />} />
          <Route path="/BookQuantity" element={<BookQuantityDetails />} />
          <Route path="/BookQuantityReport" element={<BookQuantityReport />} />
          <Route path="/DeleteBookQuantity" element={<DeleteBookQuantity />} />
          <Route path="/SearchBQUpdate" element={<SearchBQUpdate />} />
          <Route path="/bookquantitys/:book_name/UpdateBQuantity" element={<UpdateBQuantity />} />
          <Route path="/OrderManage" element={<OrderManage />} />
          <Route path="/OrderReport" element={<OrderReport />} />
          <Route path="/DeleteOrder" element={<DeleteOrder />} />
          <Route path="/SerachOrderUpdate" element={<SerachOrderUpdate />} />
          <Route path="/orders/:order_coustermer/UpdateOrder" element={<UpdateOrder />} />
          <Route path="/Printing" element={<Printing />} />
          <Route path="/PrintingManage" element={<PrintingManage />} />
          <Route path="/PrintingReport" element={<PrintingReport />} />
          <Route path="/DeletePrinting" element={<DeletePrinting />} />
          <Route path="/SerachPrintingU" element={<SerachPrintingU />} />
          <Route path="/printingmanages/:printing_bookName/UpdatePrinting" element={<UpdatePrinting />} />
          <Route path="/MachineManage" element={<MachineManage />} />
          <Route path="/MachineReport" element={<MachineReport />} />
          <Route path="/DeleteMachine" element={<DeleteMachine />} />
          <Route path="/SearchMachineU" element={<SearchMachineU />} />
          <Route path="/machines/:machine_name/UpdateMachine" element={<UpdateMachine />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/EmployeeManage" element={<EmployeeManage />} />
          <Route path="/EmployeeReport" element={<EmployeeReport />} />
          <Route path="/DeleteEmployee" element={<DeleteEmployee />} />
          <Route path="/SearchEmployeU" element={<SearchEmployeU />} />
          <Route path="/employees/:employee_NIC/UpdateEmployee" element={<UpdateEmployee />} />
          <Route path="/EmpSalaryManage" element={<EmpSalaryManage />} />
          <Route path="/SalaryReport" element={<SalaryReport />} />
          <Route path="/DeleteSalary" element={<DeleteSalary />} />
          <Route path="/SearchSalaryU" element={<SearchSalaryU />} />
          <Route path="/employeeSalarys/:employee_NIC/UpdateSalary" element={<UpdateSalary />} />
          <Route path="/TransportManage" element={<TransportManage />} />
          <Route path="/TransportReport" element={<TransportReport />} />
          <Route path="/DeleteTransport" element={<DeleteTransport />} />
          <Route path="/SearchTransportU" element={<SearchTransportU />} />
          <Route path="/transports/:vehicle_number/UpdateTransport" element={<UpdateTransport />} />
          <Route path="/Transport" element={<Transport />} />
          <Route path="/DeliveryManage" element={<DeliveryManage />} />
          <Route path="/DeliveryReport" element={<DeliveryReport />} />
          <Route path="/DeleteDelivery" element={<DeleteDelivery />} />
          <Route path="/SearchDeliveryU" element={<SearchDeliveryU />} />
          <Route path="/deliverys/:vehicle_number/UpdateDelivery" element={<UpdateDelivery />} />
          <Route path="/Material" element={<Material />} />
          <Route path="/MaterialManage" element={<MaterialManage />} />
          <Route path="/MaterialReport" element={<MaterialReport />} />
          <Route path="/DeleteMaterial" element={<DeleteMaterial />} />
          <Route path="/SearchMaterialU" element={<SearchMaterialU />} />
          <Route path="/materials/:material_name/UpdateMaterial" element={<UpdateMaterial />} />
          <Route path="/OrderedMaterialManage" element={<OrderedMaterialManage />} />
          <Route path="/OrderedMaterialReport" element={<OrderedMaterialReport />} />
          <Route path="/DeleteorderedMaterial" element={<DeleteorderedMaterial />} />
          <Route path="/SearchOMU" element={<SearchOMU />} />
          <Route path="/orderedMaterials/:material_name/UpdateOM" element={<UpdateOM />} />
          <Route path="/SMmanage" element={<SMmanage />} />
          <Route path="/SMreport" element={<SMreport />} />
          <Route path="/DeleteSM" element={<DeleteSM />} />
          <Route path="/SearchSMU" element={<SearchSMU />} />
          <Route path="/suppliedMaterials/:material_name/UpdateSM" element={<UpdateSM />} />
          <Route path="/Partner" element={<Partner />} />
          <Route path="/PartnerManage" element={<PartnerManage />} />
          <Route path="/PartnerReport" element={<PartnerReport />} />
          <Route path="/DeletePartner" element={<DeletePartner />} />
          <Route path="/SearchPartnerU" element={<SearchPartnerU />} />
          <Route path="/partners/:partner_shopName/UpdatePartner" element={<UpdatePartner />} />
          <Route path="/BulkOrderManage" element={<BulkOrderManage />} />
          <Route path="/BOreport" element={<BOreport />} />
          <Route path="/DeleteBO" element={<DeleteBO />} />
          <Route path="/SearchBOU" element={<SearchBOU />} />
          <Route path="/bulkOrders/:customer_name/UpdateBO" element={<UpdateBO />} />
          <Route path="/MessageSend" element={<MessageSend />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/ReceivedMessage" element={<ReceivedMessage />} />
          <Route path="/SentMessage" element={<SentMessage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
