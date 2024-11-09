onst LoginValidationSchema = {  
    email: {
        exists: {
            errorMessage: 'email is required'            
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        }, 
        trim: true,
        normalizeEmail: true 
    }
}

const otpValidationSchema={
    otp:{
        exists:{
            errorMessage:"Otp is required"
        },
        notEmpty:{
            errorMessage:"Otp should not be empty"
        },
        trim:true,
        isLength:{
            options:{min:4,max:4},
            errorMessage:"Otp should be 4 numbers"
        },
        isNumeric:'OTP should be a number'
    },

}

module.exports={LoginValidationSchema,otpValidationSchema}
