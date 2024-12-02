import React, { useState } from 'react';
import HeaderSection from './component/HeaderSection';
import Footer from './component/Footer';
import BookingForm from './component/Booking/BookingForm';
import { useUser } from './component/UserContext';
import LoadingPage from './component/LoadingPage';

const Booking = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showTicket, setShowTicket] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        selectedCenterName: '',
        selectedDistrict: '',
        selectedHospital: '',
        selectedDepartment: ''
    });

    const handleBookingComplete = (details) => {
        setBookingDetails(details);
        setShowTicket(true);
    };
    const { userData, loading } = useUser();
    if (!userData && !loading) {
        return <LoadingPage />;
    } else {
        return (
            <div>
                <div className="hero_area">
                    <HeaderSection isLoggedIn={isLoggedIn} />
                </div>

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <BookingForm onBookingComplete={handleBookingComplete} />
                    </div>
                </div>

                <Footer />
            </div>
        );
    };
};

export default Booking;