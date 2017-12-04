const validate = (values) => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {};
    const requiredFields = [
        'email',
        'password'
    ];

    const patternPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\\$%\\^&*\\-_.]).{8,}$/;
    const patternEmail = /^[A-Z0-9a-z._-]+$/;


    requiredFields.forEach(field => {
        if (!values.get(field)) {
            errors[field] = 'Required';
        }
    });

    if (!errors.email && !patternEmail.test(values.get('email'))) {
        errors.email = 'Wrong data!';
    }
    return errors
};

export default validate