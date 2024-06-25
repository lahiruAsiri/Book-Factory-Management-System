require('dotenv').config()

const cookieParser = require('cookie-parser');


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Import the cors middleware
const BooksRoutes = require('./routes/books')
const bookquantityRouts = require('./routes/bookquantity')
const bulkOrdersRouts = require('./routes/bulkOrders')
const deliveryRouts = require('./routes/deliverys')
const employeeRouts = require('./routes/employees')
const employeeSalaryRouts = require('./routes/employeesalarys')
const machineRouts = require('./routes/machines')
const materialRouts = require('./routes/materials')
const orderedMaterialRouts = require('./routes/orderedMaterials')
const orderRouts = require('./routes/orders')
const partnerRouts = require('./routes/partners')
const printingmanageRouts = require('./routes/printingmanage')
const suppliedMaterialRouts = require('./routes/suppliedMaterials')
const transportRouts = require('./routes/transports')
const UserRoutes = require('./routes/User')
const messageRoutes = require('./routes/message');




// express app
const app = express()

// middleware
app.use(express.json())

app.use(cors()); // Enable CORS middleware

app.use(cookieParser())



app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/auth',UserRoutes);
app.use('/api/books', BooksRoutes)
app.use('/api/bookquantitys', bookquantityRouts)
app.use('/api/bulkOrders', bulkOrdersRouts)
app.use('/api/deliverys', deliveryRouts)
app.use('/api/employees', employeeRouts)
app.use('/api/employeeSalarys', employeeSalaryRouts)
app.use('/api/machines', machineRouts)
app.use('/api/materials', materialRouts)
app.use('/api/orderedMaterials', orderedMaterialRouts)
app.use('/api/orders', orderRouts)
app.use('/api/partners', partnerRouts)
app.use('/api/printingmanages', printingmanageRouts)
app.use('/api/suppliedMaterials', suppliedMaterialRouts)
app.use('/api/transports', transportRouts)
app.use('/api', messageRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
  
