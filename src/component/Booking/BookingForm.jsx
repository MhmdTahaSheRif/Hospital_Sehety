// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SelectField from './SelectField';
// import BookingModal from './BookingModal';

// const BookingForm = () => {
//     const [selectedCenter, setSelectedCenter] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [selectedHospital, setSelectedHospital] = useState('');
//     const [selectedDepartment, setSelectedDepartment] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const [centers, setCenters] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [hospitals, setHospitals] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [loadingHospitals, setLoadingHospitals] = useState(false);
//     const [loadingCenters, setLoadingCenters] = useState(true);
//     const [loadingDistricts, setLoadingDistricts] = useState(false);
//     const [loadingDepartments, setLoadingDepartments] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [waitingList, setWaitingList] = useState([]);
//     const [loadingWaitingList, setLoadingWaitingList] = useState(false);
//     const [selectedDoctor, setSelectedDoctor] = useState('');  // Hidden state for doctor

//     const fetchWaitingList = async () => {
//         if (!selectedHospital || !selectedDepartment) return;
//         setLoadingWaitingList(true);
//         try {
//             const response = await axios.post(
//                 'http://10.100.100.149:500/API/DoctorsView/',
//                 {
//                     hospital: selectedHospital,
//                     specialties: selectedDepartment
//                 },
//                 {
//                     headers: {
//                         Authorization: getAuthToken()
//                     }
//                 }
//             );
//             setWaitingList(response.data); // Assuming response contains an array of doctors
    
//             // Automatically select the first doctor if available
//             if (response.data.length > 0) {
//                 setSelectedDoctor(response.data[0].id); // Automatically select the first doctor
//             }
//         } catch (error) {
//             console.error('Error fetching waiting list:', error);
//             setWaitingList([]); // Set to empty if error occurs
//         } finally {
//             setLoadingWaitingList(false);
//         }
//     };
    
    
//     // Trigger fetch for waiting list whenever hospital or department changes
//     useEffect(() => {
//         fetchWaitingList();
//     }, [selectedHospital, selectedDepartment]);

//     const getAuthToken = () => {
//         const token = localStorage.getItem('accessToken');
//         return token ? `Bearer ${token}` : '';
//     };

//     const errorMessages = {
//         "You can only make one booking per day for the same hospital and specialty.": "يمكنك حجز موعد واحد فقط يوميًا لنفس المستشفى والتخصص.",
//         "Maximum number of bookings reached for today.": "الحجز اكتمل اليوم اختار مستشفي أخري .",
//         "Hospital not found.": "المستشفى غير موجود.",
//         "Specialty is required.": "يجب اختيار التخصص."
//     };

//     // Fetch centers
//     useEffect(() => {
//         fetchCenters();
//     }, []);

//     // Fetch districts when center changes
//     useEffect(() => {
//         if (selectedCenter) {
//             fetchDistricts();
//         } else {
//             setDistricts([]);
//         }
//     }, [selectedCenter]);

//     // Fetch departments when district changes
//     useEffect(() => {
//         if (selectedDistrict) {
//             fetchDepartments();
//         } else {
//             setDepartments([]);
//         }
//     }, [selectedDistrict]);

//     // Fetch hospitals when district and department change
//     useEffect(() => {
//         if (selectedDistrict && selectedDepartment) {
//             fetchHospitals();
//         } else {
//             setHospitals([]);
//         }
//     }, [selectedDistrict, selectedDepartment]);

//     const fetchCenters = async () => {
//         setLoadingCenters(true);
//         try {
//             const response = await axios.get('http://10.100.100.149:500/API/Sec', {
//                 headers: {
//                     Authorization: getAuthToken()
//                 }
//             });
//             const formattedCenters = response.data.map(center => ({
//                 value: center.code,
//                 label: center.name
//             }));
//             setCenters(formattedCenters);
//         } catch (error) {
//             console.error('Error fetching centers:', error);
//         } finally {
//             setLoadingCenters(false);
//         }
//     };

//     const fetchDistricts = async () => {
//         setLoadingDistricts(true);
//         try {
//             const response = await axios.get(`http://10.100.100.149:500/API/Ssec/${selectedCenter}`, {
//                 headers: {
//                     Authorization: getAuthToken()
//                 }
//             });
//             const formattedDistricts = response.data.map(district => ({
//                 value: district.code,
//                 label: district.name,
//                 code: district.code || district.ssec
//             }));
//             setDistricts(formattedDistricts);
//         } catch (error) {
//             console.error('Error fetching districts:', error);
//         } finally {
//             setLoadingDistricts(false);
//         }
//     };

//     const fetchDepartments = async () => {
//         setLoadingDepartments(true);
//         try {
//             const response = await axios.get(
//                 `http://10.100.100.149:500/API/Hospitalspecialties/${selectedDistrict}`,
//                 {
//                     headers: {
//                         Authorization: getAuthToken()
//                     }
//                 }
//             );
//             const formattedDepartments = response.data.map(department => ({
//                 value: department.id,
//                 label: department.name
//             }));
//             setDepartments(formattedDepartments);
//         } catch (error) {
//             console.error('Error fetching specialties:', error);
//             setDepartments([]);
//         } finally {
//             setLoadingDepartments(false);
//         }
//     };

//     const fetchHospitals = async () => {
//         setLoadingHospitals(true);
//         try {
//             const response = await axios.post(
//                 `http://10.100.100.149:500/API/HospitalsViws/`,
//                 {
//                     ssec: selectedDistrict,
//                     specialties: selectedDepartment
//                 },
//                 {
//                     headers: {
//                         Authorization: getAuthToken()
//                     }
//                 }
//             );
//             if (response.data === "Not Found This code!") {
//                 setHospitals([]);
//                 return;
//             }
//             const formattedHospitals = response.data.map(hospital => ({
//                 value: hospital.id,
//                 label: hospital.name,
//                 contact_number: hospital.contact_number
//             }));
//             setHospitals(formattedHospitals);

//             if (formattedHospitals.length > 0 && selectedDepartment) {
//                 setSelectedHospital(formattedHospitals[0].value);
//                 fetchDoctors(formattedHospitals[0].value, selectedDepartment);
//             }
//         } catch (error) {
//             console.error('Error fetching hospitals:', error);
//             setHospitals([]);
//         } finally {
//             setLoadingHospitals(false);
//         }
//     };

//     const fetchDoctors = async (hospitalId, departmentId) => {
//         try {
//             const response = await axios.post(
//                 'http://10.100.100.149:500/API/DoctorsView/',
//                 {
//                     hospital: hospitalId,
//                     specialties: departmentId
//                 },
//                 {
//                     headers: {
//                         Authorization: getAuthToken()
//                     }
//                 }
//             );
//             if (response.data && response.data.length > 0) {
//                 // Automatically select the first doctor
//                 setSelectedDoctor(response.data[0].name);  // Save doctor name
//             }
//         } catch (error) {
//             console.error('Error fetching doctors:', error);
//         }
//     };

//     const handleBooking = async () => {
//         try {
//             if (!selectedDoctor) {
//                 setErrorMessage("لا يوجد طبيب");
//                 setShowModal(true);
//                 return;
//             }

//             const response = await axios.post('http://10.100.100.149:500/API/Booking/',
//                 {
//                     hospital: selectedHospital,
//                     specialties: selectedDepartment,
//                     doctor: selectedDoctor 
//                 }, {
//                     headers: {
//                         Authorization: getAuthToken()
//                     }
//                 }
//             );
//             setSuccess(true);
//             setErrorMessage('');
//             setShowModal(true);
//         } catch (error) {
//             setSuccess(false);
//             setShowModal(true);
//             if (error.response) {
//                 const serverMessage = error.response.data.message || 'حدث خطأ أثناء عملية الحجز. حاول مرة أخرى.';
//                 const translatedMessage = errorMessages[serverMessage] || 'لا يوجد طبيب في الوقت الحالي';
//                 setErrorMessage(translatedMessage);
//             } else if (error.request) {
//                 setErrorMessage('لا يمكن الاتصال بالخادم. تحقق من اتصالك بالإنترنت.');
//             } else {
//                 setErrorMessage('حدث خطأ غير متوقع. حاول مرة أخرى.');
//             }
//         }
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <>
            
//             <div className="col-md-8 col-lg-6 mt-4 mt-md-0">
//                 {errorMessage && (
//                     <div className="alert alert-danger mt-3">
//                         {errorMessage}
//                     </div>
//                 )}
//                 {loadingWaitingList ? (
//                     <div className="text-center mt-4">
//                         <div className="spinner-border text-primary" role="status">
//                             <span className="visually-hidden"></span>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         {waitingList && waitingList.length > 0 ? (
//                             <div className="mt-4">
//                                 <p className="text-muted">
//                                     {`عدد المرضى في قائمة الانتظار: ${waitingList.length}`}
//                                 </p>
//                                 <ul className="list-group">
//                                     {waitingList.map((doctor, index) => (
//                                         <li key={index} className="list-group-item">
//                                      دكتور /  {doctor.name }    
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ) : (
//                             <p className="text-muted mt-4">لا توجد بيانات في قائمة الانتظار.</p>
//                         )}
//                     </>
//                 )}
//                 <br />
//             </div>
//             <div className="col-md-8 col-lg-6">
//                 <div className="card shadow-lg rounded-lg">
//                     <div className="card-body">
//                         <h4 className="card-title text-center text-primary mb-4">حجز التذكرة</h4>
//                         <form>
//                             <SelectField
//                                 label="المركز"
//                                 value={selectedCenter}
//                                 onChange={(e) => setSelectedCenter(e.target.value)}
//                                 options={centers}
//                                 isLoading={loadingCenters}
//                             />
//                             <SelectField
//                                 label="الشياخة"
//                                 value={selectedDistrict}
//                                 onChange={(e) => setSelectedDistrict(e.target.value)}
//                                 options={districts}
//                                 isLoading={loadingDistricts}
//                             />
//                             <SelectField
//                                 label="التخصص"
//                                 value={selectedDepartment}
//                                 onChange={(e) => setSelectedDepartment(e.target.value)}
//                                 options={departments}
//                                 isLoading={loadingDepartments}
//                             />
//                             <SelectField
//                                 label="المستشفى"
//                                 value={selectedHospital}
//                                 onChange={(e) => setSelectedHospital(e.target.value)}
//                                 options={hospitals}
//                                 isLoading={loadingHospitals}
//                             />
//                             {/* Hidden doctor select  style={{ display: 'none' }} */}
//                             <div >
//                                 <SelectField
//                                     label="الدكتور"
//                                     value={selectedDoctor}
//                                     onChange={(e) => setSelectedDoctor(e.target.value)} 
//                                     options={waitingList.map((doctor) => ({
//                                         value: doctor.id,  
//                                         label: doctor.name  
//                                     }))}
//                                     isLoading={loadingWaitingList} 
//                                 />
//                             </div>
    
//                             <button
//                                 style={{ width: '100%' }}
//                                 type="button"
//                                 onClick={handleBooking}
//                                 className="btn btn-success"
//                             >
//                                 احجز الآن
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//                 <br />
//             </div>

    
//             {showModal && (
//                 <BookingModal
//                     isOpen={showModal}
//                     success={success}
//                     errorMessage={errorMessage}
//                     onClose={() => setShowModal(false)} // Close modal on button click
//                 />
//             )}
//         </>
//     );
// }
// export default BookingForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectField from './SelectField';
import BookingModal from './BookingModal';

const BookingForm = () => {
    const [selectedCenter, setSelectedCenter] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedHospital, setSelectedHospital] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [centers, setCenters] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loadingHospitals, setLoadingHospitals] = useState(false);
    const [loadingCenters, setLoadingCenters] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingDepartments, setLoadingDepartments] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [waitingList, setWaitingList] = useState([]);
    const [loadingWaitingList, setLoadingWaitingList] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState('');  // Hidden state for doctor

    const fetchWaitingList = async () => {
        if (!selectedHospital || !selectedDepartment) return;
        setLoadingWaitingList(true);
        try {
            const response = await axios.post(
                'http://10.100.100.149:500/API/DoctorsView/',
                {
                    hospital: selectedHospital,
                    specialties: selectedDepartment
                },
                {
                    headers: {
                        Authorization: getAuthToken()
                    }
                }
            );
            setWaitingList(response.data); // Assuming response contains an array of doctors
    
            // Automatically select the first doctor if available
            if (response.data.length > 0) {
                setSelectedDoctor(response.data[0].id); // Automatically select the first doctor
            } else {
                setSelectedDoctor(''); // Reset doctor selection if no doctors available
            }
        } catch (error) {
            console.error('Error fetching waiting list:', error);
            setWaitingList([]); // Set to empty if error occurs
            setSelectedDoctor(''); // Reset doctor selection on error
        } finally {
            setLoadingWaitingList(false);
        }
    };
    
    // Trigger fetch for waiting list whenever hospital or department changes
    useEffect(() => {
        fetchWaitingList();
    }, [selectedHospital, selectedDepartment]);

    const getAuthToken = () => {
        const token = localStorage.getItem('accessToken');
        return token ? `Bearer ${token}` : '';
    };

    const errorMessages = {
        "You can only make one booking per day for the same hospital and specialty.": "يمكنك حجز موعد واحد فقط يوميًا لنفس المستشفى والتخصص.",
        "Maximum number of bookings reached for today.": "الحجز اكتمل اليوم اختار مستشفي أخري .",
        "Hospital not found.": "المستشفى غير موجود.",
        "Specialty is required.": "يجب اختيار التخصص."
    };

    // Fetch centers
    useEffect(() => {
        fetchCenters();
    }, []);

    // Fetch districts when center changes
    useEffect(() => {
        if (selectedCenter) {
            fetchDistricts();
        } else {
            setDistricts([]);
        }
    }, [selectedCenter]);

    // Fetch departments when district changes
    useEffect(() => {
        if (selectedDistrict) {
            fetchDepartments();
        } else {
            setDepartments([]);
        }
    }, [selectedDistrict]);

    // Fetch hospitals when district and department change
    useEffect(() => {
        if (selectedDistrict && selectedDepartment) {
            fetchHospitals();
        } else {
            setHospitals([]);
        }
    }, [selectedDistrict, selectedDepartment]);

    const fetchCenters = async () => {
        setLoadingCenters(true);
        try {
            const response = await axios.get('http://10.100.100.149:500/API/Sec', {
                headers: {
                    Authorization: getAuthToken()
                }
            });
            const formattedCenters = response.data.map(center => ({
                value: center.code,
                label: center.name
            }));
            setCenters(formattedCenters);
        } catch (error) {
            console.error('Error fetching centers:', error);
        } finally {
            setLoadingCenters(false);
        }
    };

    const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
            const response = await axios.get(`http://10.100.100.149:500/API/Ssec/${selectedCenter}`, {
                headers: {
                    Authorization: getAuthToken()
                }
            });
            const formattedDistricts = response.data.map(district => ({
                value: district.code,
                label: district.name,
                code: district.code || district.ssec
            }));
            setDistricts(formattedDistricts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoadingDistricts(false);
        }
    };

    const fetchDepartments = async () => {
        setLoadingDepartments(true);
        try {
            const response = await axios.get(
                `http://10.100.100.149:500/API/Hospitalspecialties/${selectedDistrict}`,
                {
                    headers: {
                        Authorization: getAuthToken()
                    }
                }
            );
            const formattedDepartments = response.data.map(department => ({
                value: department.id,
                label: department.name
            }));
            setDepartments(formattedDepartments);
        } catch (error) {
            console.error('Error fetching specialties:', error);
            setDepartments([]);
        } finally {
            setLoadingDepartments(false);
        }
    };

    const fetchHospitals = async () => {
        setLoadingHospitals(true);
        try {
            const response = await axios.post(
                'http://10.100.100.149:500/API/HospitalsViws/',
                {
                    ssec: selectedDistrict,
                    specialties: selectedDepartment
                },
                {
                    headers: {
                        Authorization: getAuthToken()
                    }
                }
            );
            if (response.data === "Not Found This code!") {
                setHospitals([]);
                return;
            }
            const formattedHospitals = response.data.map(hospital => ({
                value: hospital.id,
                label: hospital.name,
                contact_number: hospital.contact_number
            }));
            setHospitals(formattedHospitals);

            setSelectedHospital('');
            setSelectedDoctor('');  // Reset doctor selection when hospital is changed
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            setHospitals([]);
        } finally {
            setLoadingHospitals(false);
        }
    };

    const handleBooking = async () => {
        try {
            if (!selectedDoctor) {
                setErrorMessage("لا يوجد طبيب");
                setShowModal(true);
                return;
            }

            const response = await axios.post('http://10.100.100.149:500/API/Booking/',
                {
                    hospital: selectedHospital,
                    specialties: selectedDepartment,
                    doctor: selectedDoctor 
                }, {
                    headers: {
                        Authorization: getAuthToken()
                    }
                }
            );
            setSuccess(true);
            setErrorMessage('');
            setShowModal(true);
        } catch (error) {
            setSuccess(false);
            setShowModal(true);
            if (error.response) {
                const serverMessage = error.response.data.message || 'حدث خطأ أثناء عملية الحجز. حاول مرة أخرى.';
                const translatedMessage = errorMessages[serverMessage] || 'لا يوجد طبيب في الوقت الحالي';
                setErrorMessage(translatedMessage);
            } else if (error.request) {
                setErrorMessage('لا يمكن الاتصال بالخادم. تحقق من اتصالك بالإنترنت.');
            } else {
                setErrorMessage('حدث خطأ غير متوقع. حاول مرة أخرى.');
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            
            <div className="col-md-8 col-lg-6 mt-4 mt-md-0">
                {errorMessage && (
                    <div className="alert alert-danger mt-3">
                        {errorMessage}
                    </div>
                )}
                {loadingWaitingList ? (
                    <div className="text-center mt-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                ) : (
                    <>
                        {waitingList && waitingList.length > 0 ? (
                            <div className="mt-4">
                                <p className="text-muted">
                                    {`عدد المرضى في قائمة الانتظار: ${waitingList.length}`}
                                </p>
                                <ul className="list-group">
                                    {waitingList.map((doctor, index) => (
                                        <li key={index} className="list-group-item">
                                     دكتور /  {doctor.name }    
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-muted mt-4">لا توجد بيانات في قائمة الانتظار.</p>
                        )}
                    </>
                )}
                <br />
            </div>
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg rounded-lg">
                    <div className="card-body">
                        <h4 className="card-title text-center text-primary mb-4">حجز التذكرة</h4>
                        <form>
                            <SelectField
                                label="المركز"
                                value={selectedCenter}
                                onChange={(e) => setSelectedCenter(e.target.value)}
                                options={centers}
                                isLoading={loadingCenters}
                            />
                            <SelectField
                                label="الشياخة"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                options={districts}
                                isLoading={loadingDistricts}
                            />
                            <SelectField
                                label="التخصص"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                options={departments}
                                isLoading={loadingDepartments}
                            />
                            <SelectField
                                label="المستشفى"
                                value={selectedHospital}
                                onChange={(e) => setSelectedHospital(e.target.value)}
                                options={hospitals}
                                isLoading={loadingHospitals}
                            />
                            <div style={{ display: 'none' }}>
                                <SelectField 
                                    label="الدكتور"
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)} 
                                    options={waitingList.map((doctor) => ({
                                        value: doctor.id,  
                                        label: doctor.name  
                                    }))}
                                    isLoading={loadingWaitingList} 
                                />
                            </div>
    
                            <button
                                style={{ width: '100%' }}
                                type="button"
                                onClick={handleBooking}
                                className="btn btn-success"
                            >
                                احجز الآن
                            </button>
                        </form>
                    </div>
                </div>
                <br />
            </div>

    
            {showModal && (
                <BookingModal
                    isOpen={showModal}
                    success={success}
                    errorMessage={errorMessage}
                    onClose={() => setShowModal(false)} // Close modal on button click
                />
            )}
        </>
    );
}
export default BookingForm;


