import React from 'react';

const SelectField = ({ label, value, onChange, options = [] }) => {
    return (
        <div className="form-group mb-3">
            <label>{label}</label>
            <select
                className="form-control"
                value={value}
                onChange={onChange}
            >
                <option value="">{`اختر ${label}`}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;