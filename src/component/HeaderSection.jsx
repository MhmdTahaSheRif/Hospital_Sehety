import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo1.png';
import '../css/Head.css';
import { useUser } from './UserContext';
const HeaderSection = ({ isLoggedIn }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';
    const { userData, loading } = useUser();
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">جاري التحميل...</span>
                </div>
            </div>
        );
    }

    if (!userData) {
                return   <header className="header_section">
                <div className="header_bottom">
                    <div className="container-fluid"><nav className="navbar navbar-expand-lg custom_nav-container"> <a className="navbar-brand" href="#" style={{ backgroundColor: 'rgb(0 0 0 / 0%)' }}>
                <img src={logo} alt="Logo" />
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className=""> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {isLoggedIn && (
                    <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
                    </div>
                )}
                <div className="quote_btn-container">
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className={isActive('/')}>
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>تسجيل الدخول</span>
                            </Link>
                            <Link to="/register" className={isActive('/register')}>
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>انشاء حساب جديد</span>
                            </Link>
                        </>
                    )}
                    <form className="form-inline">
                            <Link to="/register" className={isActive('/register')}>
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>انشاء حساب جديد</span>
                            </Link>
                    <Link to="/" className={isActive('/login')}>
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>تسجيل الدخول</span>
                            </Link>
                    
                        <Link className={`nav-link ${isActive('/home')}`} to="/home">
                            الرئيسيه
                        </Link>
                        <div className="nav-item dropdown">
                            <Link
                                className={`nav-link dropdown-toggle ${isActive('/profile') || isActive('/settings') ? 'active' : ''}`}
                                role="button"
                                onClick={toggleDropdown}
                            >
                                <i className="fas fa-user"></i> حسابي
                            </Link>
                            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <li>
                                    <Link className={`dropdown-item ${isActive('/profile')}`} to="/profile">
                                        <i className="fas fa-user-circle me-2"></i>
                                        الملف الشخصي
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`dropdown-item ${isActive('/settings')}`} to="/settings">
                                        <i className="fas fa-cog me-2"></i>
                                        الإعدادات
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                        
                            </ul>
                        </div>
                    </form>
                </div>
            </div></nav>        </div>
                    </div>
                </header>
    }
    return (
        <header className="header_section">
            <div className="header_bottom">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <a className="navbar-brand" href="#" style={{ backgroundColor: 'rgb(0 0 0 / 0%)' }}>
                            <img src={logo} alt="Logo" />
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {isLoggedIn && (
                                <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
                                </div>
                            )}
                            <div className="quote_btn-container">
                                {!isLoggedIn && (
                                    <>
                                        <Link to="/login" className={isActive('/login')}>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span>تسجيل الدخول</span>
                                        </Link>
                                        <Link to="/register" className={isActive('/register')}>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span>انشاء حساب جديد</span>
                                        </Link>
                                    </>
                                )}
                                <form className="form-inline">
                                    <Link className={`nav-link ${isActive('/about')}`} to="/about">
                                        المجتمع الطبي
                                    </Link>
                                    <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                                        أسألتك
                                    </Link>
                                    <Link className={`nav-link ${isActive('/tickets')}`} to="/tickets">
                                        الحجوزات
                                    </Link>
                                    <Link className={`nav-link ${isActive('/hospital')}`} to="/hospital">
                                        المستشفيات
                                    </Link>
                                    {userData?.role !== 2 && (
                                        <Link className={`nav-link ${isActive('/booking')}`} to="/booking">
                                            حجز
                                        </Link>
                                    )}
                                    <Link className={`nav-link ${isActive('/home')}`} to="/home">
                                        الرئيسيه
                                    </Link>
                                    <div className="nav-item dropdown">
                                        <Link
                                            className={`nav-link dropdown-toggle ${isActive('/profile') || isActive('/settings') ? 'active' : ''}`}
                                            role="button"
                                            onClick={toggleDropdown}
                                        >
                                            <i className="fas fa-user"></i> حسابي
                                        </Link>
                                        <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                            <li>
                                                <Link className={`dropdown-item ${isActive('/profile')}`} to="/profile">
                                                    <i className="fas fa-user-circle me-2"></i>
                                                    الملف الشخصي
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className={`dropdown-item ${isActive('/settings')}`} to="/settings">
                                                    <i className="fas fa-cog me-2"></i>
                                                    الإعدادات
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            {isLoggedIn && (
                                                <li>
                                                    <Link to="/logout" className="dropdown-item text-danger">
                                                        <i className="fas fa-sign-out-alt me-2"></i>
                                                        تسجيل الخروج
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;
