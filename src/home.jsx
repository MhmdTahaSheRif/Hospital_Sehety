import React, { useState } from 'react';
import HeaderSection from './component/HeaderSection';
import CustomCarousel from './component/CustomCarousel';
import AboutSection from './component/AboutSection';
import Footer from './component/Footer';
const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <div>
            <div className="hero_area">
                {/* Header section */}
                <HeaderSection isLoggedIn={isLoggedIn} />

                {/* Slider section */}
                <section className="slider_section">
                    <CustomCarousel />
                </section>
            </div>
            <AboutSection />
            <Footer />
        </div>
    );
};

export default Home;
