import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import Footer from './Footer';
import { useUser } from '../component/UserContext';
import img from '../images/logo1.png';

const ProfilePage = () => {
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
        return <div>لا توجد بيانات للمستخدم.</div>;
    }

    return (
        <div>
            <HeaderSection isLoggedIn={true} />

            <div className="container my-5" dir="rtl">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-3">
                                    <img
                                        src={userData?.profileImage || img}
                                        alt="الصورة الشخصية"
                                        className="rounded-circle img-fluid"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                </div>
                                <h4 className="mb-2">{userData?.fullname || 'الاسم'}</h4>
                                {/* <p className="text-muted mb-4">{userData?.email || 'البريد الإلكتروني'}</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-4">البيانات الشخصية</h5>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">الاسم بالكامل</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userData?.fullname || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">البريد الإلكتروني</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={userData?.email || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">رقم الهاتف</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={userData?.contact_number || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">الرقم القومي</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userData?.national_number || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">العنوان</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userData?.address || ''}
                                            disabled
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;
