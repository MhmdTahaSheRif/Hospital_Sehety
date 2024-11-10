import React from 'react';
import { Carousel } from 'react-bootstrap';
import slider_img from '../images/1.jpg'
import slider_img2 from '../images/2.jpg'
import slider_img3 from '../images/3.jpg'
import next from '../images/next.png'
import prev from '../images/prev.png'

import '../css/style.css'
const CustomCarousel = () => {
  return (
    <section className="slider_section" style={{ direction: "rtl" }}>
      {/* <div className="dot_design">
        <img src={dots} alt="dots" />
      </div> */}
      <Carousel id="customCarousel1" controls={false} indicators={false}>
        <Carousel.Item>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="play_btn">
                    <button>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </button>
                  </div>
                  <h1>
                    منصـــة <br />
                    <span>صحتـــي</span>
                  </h1>
                  <p>
                    هي منصة خدمية تقدمها     محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات  .
                  </p>
                  <a style={{ textDecoration: 'none' }} href="#">تواصــل معنــا</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src={slider_img} alt="slider-img" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="play_btn">
                    <button>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </button>
                  </div>
                  <h1>
                    منصـــة <br />
                    <span>صحتـــي</span>
                  </h1>
                  <p>
                    هي منصة خدمية تقدمها     محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات  .
                  </p>
                  <a style={{ textDecoration: 'none' }} href="#">تواصــل معنــا</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src={slider_img2} alt="slider-img" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="play_btn">
                    <button>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </button>
                  </div>
                  <h1>
                    منصـــة <br />
                    <span>صحتـــي</span>
                  </h1>
                  <p>
                    هي منصة خدمية تقدمها     محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات  .
                  </p>
                  <a style={{ textDecoration: 'none' }} href="#">تواصــل معنــا</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src={slider_img3} alt="slider-img" />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

      </Carousel>

      <div className="carousel_btn-box">
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
