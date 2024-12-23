import React, { useState, useEffect } from 'react';
import CustomCarousel from './component/CustomCarousel'; 
import HeaderSection from './component/HeaderSection';
import Video from './component/video';
import Footer from './component/Footer';
import { useUser } from './component/UserContext';
import LoadingPage from './component/LoadingPage';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default isLoggedIn to false initially
    const { userData, loading } = useUser();

    // When loading is true or userData is available, we set the login state
    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userData]); // Re-run the effect if userData changes

    // If data is loading, show the loading page
    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <div className="hero_area">
                <HeaderSection isLoggedIn={isLoggedIn} />

                <section className="slider_section">
                    <Video />
                </section>

                <section className="slider_section">
                    <CustomCarousel carouselId="customCarousel1" />
                </section>

                {/* Second carousel with different data */}
                <section className="slider_section">
                    <CustomCarousel carouselId="customCarousel2" isDifferentData={true} />
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
