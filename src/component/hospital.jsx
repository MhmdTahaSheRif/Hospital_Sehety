import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import HeaderSection from "./HeaderSection";


const API_URL = "https://your-api-url.com/hospitals";

const HospitalSelector = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Fetch hospitals data from API
  const fetchHospitals = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response); // Check the entire response
      
      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setHospitals(response.data); // Set hospitals data if it's an array
      } else {
        console.error("Expected an array of hospitals, but received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Ensure that hospitals is an array before mapping over it
  const hospitalOptions = Array.isArray(hospitals)
    ? hospitals.map((hospital) => ({
        value: hospital.id,  // Unique ID for each hospital
        label: hospital.name,  // Name to display in the dropdown
      }))
    : [];

  const handleHospitalChange = (selectedOption) => {
    setSelectedHospital(selectedOption);
    console.log("Selected Hospital: ", selectedOption);
  };

  return (
    <div>
       <HeaderSection isLoggedIn={isLoggedIn} />
      <h1>Select a Hospital</h1>
      {Array.isArray(hospitals) && hospitals.length > 0 ? (
        <Select
          options={hospitalOptions}
          onChange={handleHospitalChange}
          value={selectedHospital}
          placeholder="Select a hospital"
        />
      ) : (
        <p>Loading hospitals...</p>
      )}
      {selectedHospital && (
        <div>
          <h3>Selected Hospital Details</h3>
          <p>ID: {selectedHospital.value}</p>
          <p>Name: {selectedHospital.label}</p>
        </div>
      )}
    </div>
  );
};

export default HospitalSelector;
