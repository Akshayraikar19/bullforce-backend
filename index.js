require('dotenv').config()
const express = require('express')
const configureDB = require('./config/db')
configureDB()
const app = express()
const port = 5000
const cors = require('cors')

app.use(express.json())
app.use(cors())

const {LoginValidationSchema, otpValidationSchema} = require('./app/validations/userLoginValidation')
const usersCltr = require('./app/controllers/user-Cltr')
const { checkSchema } = require('express-validator')

// routes
app.post('/users/login', checkSchema(LoginValidationSchema), usersCltr.login)
app.post('/verifyOtp', checkSchema(otpValidationSchema),usersCltr.verifyOtp)

app.listen(port, () => {
    console.log('server running on port', port)
}) 
