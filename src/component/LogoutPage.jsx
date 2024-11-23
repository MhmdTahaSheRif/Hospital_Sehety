import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../images/logo1.png'
const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear all stored data
        localStorage.removeItem('token');
        sessionStorage.clear();

        // Redirect after 3 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 text-center">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            {/* <i className="fas fa-sign-out-alt text-primary fa-4x mb-3"></i> */}
                            <img src={img} />
                            <h2 className="mb-4">تسجيل الخروج</h2>
                            <p className="lead">...جاري تسجيل خروجك من المنصة</p>
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;
