import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ success, onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (success) {
                navigate('/tickets');
            } else {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [success, navigate, onClose]);

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center p-4">
                        {success ? (
                            <>
                                <i className="fas fa-check-circle text-success fa-3x mb-3"></i>
                                <h4 className="text-success">تم الحجز بنجاح</h4>
                                <p>جاري تحويلك إلى صفحة التذاكر...</p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-times-circle text-danger fa-3x mb-3"></i>
                                <h4 className="text-danger">فشل الحجز</h4>
                                <p>يرجى المحاولة مرة أخرى...</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
