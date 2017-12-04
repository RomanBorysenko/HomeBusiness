import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, label, onChange, placeholder, value, error, type, onKeyPress}) => {
    let wrapperClass = 'form-group';

    if (error && error.length > 0) {
        // wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            {label ?
                <label htmlFor={name}>{label}</label> : null}
            <div className="field">
                <input
                    type={type ? type : 'text'}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onKeyPress={(e)=>onKeyPress(e)}
                    onChange={onChange}/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.bool
};

export default TextInput;
