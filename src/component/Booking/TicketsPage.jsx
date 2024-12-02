import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import HeaderSection from '../HeaderSection';
import BookingConfirmationModal from './BookingConfirmationModal';
import { useUser } from '../UserContext.js';
import Footer from '../../component/Footer';
import LoadingPage from '../LoadingPage';

const TicketsPage = () => {
    const [bookingData, setBookingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const { userData, loading } = useUser();

    useEffect(() => {
        fetchBookingData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, dateFilter, bookingData]);

    const fetchBookingData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://10.100.100.149:500/API/Booking/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setBookingData(response.data.reverse());
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching booking data:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    const handleConfirmClick = (booking) => {
      setSelectedBooking(booking);
      setModalShow(true);
  };
  
    const filterData = () => {
        let filtered = bookingData;

        if (searchTerm) {
            filtered = filtered.filter(item =>
                Object.values(item).some(val =>
                    val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (dateFilter) {
            filtered = filtered.filter(item =>
                item.booking_date.includes(dateFilter)
            );
        }

        setFilteredData(filtered);
    };

    const columns = [
        {
            name: 'رقم الحجز',
            selector: row => row.patient_number,
            sortable: true,
        },
        {
            name: 'اسم المريض',
            selector: row => row.patient,
            sortable: true,
        },
        {
            name: 'اسم الدكتور',
            selector: row => row.doctor,
            sortable: true,
        },
        {
            name: 'تاريخ الحجز',
            selector: row => new Date(row.booking_date).toLocaleString('ar'),
            sortable: true,
        },
        {
            name: 'المستشفى',
            selector: row => row.hospital,
            sortable: true,
        },
        {
            name: 'التخصص',
            selector: row => row.specialties,
            sortable: true,
        },
        userData?.role === 2 && {
            name: 'إجراءات',
            cell: row => (
                <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleConfirmClick(row)}
                >
                    تأكيد الحجز
                </button>
            ),
        },
    ].filter(Boolean);

    const customStyles = {
        table: {
            style: {
                minWidth: '100%',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                backgroundColor: '#f8f9fa',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    if (!userData && !loading) return <LoadingPage />;
    if (isLoading) return <div className="loading-spinner">جاري التحميل....</div>;
    if (isError) return <div className="error-message">فشل في تحميل بيانات الحجز.</div>;

    return (
        <div>
            <HeaderSection isLoggedIn={true} />
            <div className="container container_Post my-4" style={{background: '#00c6a929',height: '80vh'}}>
                <h1 className="text-center mb-4">الحجوزات الخاصة بالمريض</h1>
                
                <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="بحث..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type="date"
                            className="form-control"
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive" dir="rtl">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                        customStyles={customStyles}
                        noDataComponent="لا توجد بيانات متاحة"
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 20, 30, 50]}
                    />
                </div>
            </div>

            
            <Footer />
            <BookingConfirmationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                bookingData={selectedBooking}
            />
        </div>
    );
};

export default TicketsPage;
