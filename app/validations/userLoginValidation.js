

const LoginValidationSchema = {
    email: {
        in : 'body',
        exists: {
            errorMessage: 'Email is required'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'Should be a valid email format'
        },
        trim: true,
        normalizeEmail: true
    }
}

module.exports =  LoginValidationSchema