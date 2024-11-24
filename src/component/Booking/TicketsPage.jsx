import React, { useState, useEffect ,useContext } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import HeaderSection from '../HeaderSection';
import BookingConfirmationModal from './BookingConfirmationModal';
import { useUser } from '../UserContext.js';
import Footer from '../../component/Footer'; // Upload icon image

const TicketsPage = () => {
  const { userData, loading } = useUser();
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState(2); 

  useEffect(() => {
    const fetchBookingData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get('http://10.100.100.149:500/API/Booking/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setBookingData(response.data.reverse());
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  const columns = [
    {
      name: 'رقم الحجز',
      selector: (row) => row.patient_number,
      sortable: true,
    },
    {
      name: 'اسم المريض',
      selector: (row) => row.patient,
      sortable: true,
    },
    {
      name: 'اسم الدكتور',
      selector: (row) => row.doctor,
      sortable: true,
    },
    {
      name: 'تاريخ الحجز',
      selector: (row) => new Date(row.booking_date).toLocaleString('ar'),
      sortable: true,
    },
    {
      name: 'المستشفى',
      selector: (row) => row.hospital,
      sortable: true,
    },
    {
      name: 'التخصص',
      selector: (row) => row.specialties,
      sortable: true,
    },
    userData?.role === 2 && (
    {
      name: 'إجراءات',
      cell: (row) => (
          <button
            className="btn btn-success"
            onClick={() => handleConfirmClick(row)}
          >
            تأكيد الحجز
          </button>
      ),
    }  ),

  ];

  const handleConfirmClick = (booking) => {
    setSelectedBooking(booking);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedBooking(null);
  };

  const customStyles = {
    // Add your custom styles here
  };

  if (isLoading) {
    return <div style={styles.loadingSpinner}>جاري التحميل....</div>;
  }

  if (isError) {
    return <div style={styles.errorMessage}>فشل في تحميل بيانات الحجز.</div>;
  }

  return (
    <div>
      <HeaderSection isLoggedIn={isLoggedIn} />
      <div style={{ marginLeft: '8%', marginRight: '8%' }}>
        <br />
        <h1 style={{ textAlign: 'center' }}>الحجوزات الخاصة بالمريض</h1>
        <div style={styles.bookingDetailsContainer} dir="rtl">
          {bookingData.length === 0 ? (
            <p>لا توجد بيانات حجوزات متاحة.</p>
          ) : (
            <DataTable
              columns={columns}
              data={bookingData}
              pagination
              highlightOnHover
              striped
              customStyles={customStyles}
              noHeader
            />
          )}
        </div>
      </div>

      <Footer/>
      {selectedBooking && (
        <BookingConfirmationModal
          show={modalShow}
          onHide={handleCloseModal}
          bookingData={selectedBooking}
        />
      )}
    </div>
  );
};

const styles = {
  bookingDetailsContainer: {
    margin: '20px',
    color: '#000',
  },
  loadingSpinner: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#00c6a9',
    fontWeight: 'bold',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default TicketsPage;
