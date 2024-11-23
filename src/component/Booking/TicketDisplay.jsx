import React from 'react';

const TicketDisplay = ({ bookingDetails }) => {
    const {
        selectedCenterName,
        selectedDistrict,
        selectedHospital,
        selectedDepartment
    } = bookingDetails;

    return (
        <div className="card shadow-lg rounded-lg">
            <div className="card-body">
                <h5 className="card-title text-center text-success mb-4">تذكرة الحجز</h5>
                <p><strong>المركز:</strong> {selectedCenterName || 'لم يتم اختيار مركز'}</p>
                <p><strong>الشياخة:</strong> {selectedDistrict}</p>
                <p><strong>المستشفى:</strong> {selectedHospital}</p>
                <p><strong>القسم:</strong> {selectedDepartment}</p>
            </div>
        </div>
    );
};

export default TicketDisplay;