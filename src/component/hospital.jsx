import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import HeaderSection from "../component/HeaderSection";
import { hospitalsData } from "./hospitalData";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import "../css/HospitalSelector.css";

// تعريف أيقونة العلامة
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const HospitalSelector = () => {
  const [filteredHospitals, setFilteredHospitals] = useState(hospitalsData);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSpecialtiesChange = (specialty) => {
    const newSelected = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(item => item !== specialty)
      : [...selectedSpecialties, specialty];
    setSelectedSpecialties(newSelected);
  };

  useEffect(() => {
    let filtered = hospitalsData;
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(hospital =>
        hospital.specialties.some(spec => selectedSpecialties.includes(spec))
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredHospitals(filtered);
  }, [selectedSpecialties, searchTerm]);

  const defaultCenter = { lat: 31.2497, lng: 30.6359 };
  const specialtiesList = [
    "جراحة",
    "طب الباطنة",
    "طب الأطفال",
    "نسائية وتوليد",
    "جراحة العظام",
    "طب القلب",
    "طوارئ",
    "عيون",
    "أسنان",
    "مسالك بولية",
    "أنف وأذن وحنجرة",
    "صدر",
    "أمراض صدرية",
    "علاج طبيعي",
    "جراحة عامة",
    "باطنة"
  ];


  return (
    <div className="hospital-selector">
      <HeaderSection isLoggedIn={true} />
      <h1 style={{ textAlign: "center", paddingTop: "10px" }}>المستشفيات المتواجدة في محافظة البحيرة </h1>
      <div className="hospital-content">

        <div className="map-container">
          <MapContainer
            center={selectedHospital?.coordinates || defaultCenter}
            zoom={11}
            className="map"
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              attribution='&copy; Google Maps'
            />
            {filteredHospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                position={hospital.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedHospital(hospital)
                }}
              >
                <Popup>
                  <div className="hospital-marker">
                    <h4>{hospital.name}</h4>
                    <p>{hospital.address}</p>
                    <div className="specialties-tags">
                      {hospital.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <button
                      className="view-details-btn"
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            {selectedHospital && <MapController center={selectedHospital.coordinates} />}
          </MapContainer>
        </div>

        <div className="sidebar">
          <div className="search-section">
            <input
              type="text"
              placeholder="ابحث عن مستشفى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="specialties-section">
            <h3>التخصصات</h3>
            <div className="specialties-grid">
              {specialtiesList.map((specialty) => (
                <div key={specialty} className="specialty-item">
                  <input
                    type="checkbox"
                    id={specialty}
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => handleSpecialtiesChange(specialty)}
                  />
                  <label htmlFor={specialty}>{specialty}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="hospitals-section">
            <h3>المستشفيات</h3>
            <div className="hospitals-list">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className={`hospital-card ${selectedHospital?.id === hospital.id ? 'selected' : ''}`}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <h4>{hospital.name}</h4>
                  <p>{hospital.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSelector;
