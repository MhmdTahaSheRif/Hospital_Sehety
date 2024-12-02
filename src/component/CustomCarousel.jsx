import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import slider_img from '../images/1.jpg';
import slider_img2 from '../images/2.jpg';
import slider_img3 from '../images/3.jpg';
import next from '../images/next.png';
import prev from '../images/prev.png';
import '../css/style.css';

const CustomCarousel = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease'
    });
  }, []);

  return (
    <section className="slider_section" style={{ direction: "rtl" }}>
      <Carousel id="customCarousel1" controls={false} indicators={false}>
        <Carousel.Item>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-left">
                <div className="detail-box">
                  <div className="play_btn">
                    <button>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </button>
                  </div>
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    منصـــة <br />
                    <span>صحتـــي</span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="200">
                    هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.
                  </p>
                  <a href="/contact" className="carousel-link" data-aos="fade-up" data-aos-delay="300">
                    تواصــل معنــا
                  </a>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-right">
                <div className="img-box">
                  <img src={slider_img} alt="slider-img" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-left">
                <div className="detail-box">
                  <div className="play_btn">
                    <button>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </button>
                  </div>
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    منصـــة <br />
                    <span>صحتـــي</span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="200">
                    هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.
                  </p>
                  <a href="/contact" className="carousel-link" data-aos="fade-up" data-aos-delay="300">
                    تواصــل معنــا
                  </a>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-right">
                <div className="img-box">
                  <img src={slider_img2} alt="slider-img" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-left">
                <div className="detail-box">
                  <div className="play_btn">
                    <button>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </button>
                  </div>
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    منصـــة <br />
                    <span>صحتـــي</span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="200">
                    هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.
                  </p>
                  <a href="/contact" className="carousel-link" data-aos="fade-up" data-aos-delay="300">
                    تواصــل معنــا
                  </a>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-right">
                <div className="img-box">
                  <img src={slider_img3} alt="slider-img" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Carousel Controls */}
      <div className="carousel_btn-box" data-aos="fade-up">
        <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
          <img src={next} alt="Next" />
          <span className="sr-only">التالي</span>
        </a>
        <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
          <img src={prev} alt="Previous" />
          <span className="sr-only">السابق</span>
        </a>
      </div>
    </section>
  );
};

export default CustomCarousel;
