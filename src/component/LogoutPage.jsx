import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Assuming you're using a context for managing user state
import img from '../images/logo1.png';  // Your logo image path

const LogoutPage = () => {
    const { logout } = useUser();  // This clears the user data from context
    const navigate = useNavigate();

    useEffect(() => {
        // Clear localStorage data
        localStorage.clear();

        // Clear sessionStorage data
        sessionStorage.clear();

        // Clear all cookies
        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });

        // Clear any cached data
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    caches.delete(name);
                });
            });
        }

        // Clear IndexedDB if used
        indexedDB.databases().then(databases => {
            databases.forEach(database => {
                indexedDB.deleteDatabase(database.name);
            });
        });

        // Call the logout function from the context to update the user state
        logout();

        // Wait for a bit and then navigate to the home or login page
        const timer = setTimeout(() => {
            navigate('/');  // Redirect to home page (or login page as needed)
        }, 1000);  // 1 second delay for the logout process to complete

        // Cleanup the timeout when the component unmounts
        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div className="logout-container">
            <div className="logout-card">
                <div className="logout-content">
                    {/* Display the logo */}
                    <img src={img} alt="Logo" className="logout-logo" />
                    <h2 className="logout-title">تسجيل الخروج</h2>
                    <p className="logout-text">...جاري تسجيل خروجك من المنصة</p>

                    {/* Loading Spinner */}
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">جاري التحميل...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;
