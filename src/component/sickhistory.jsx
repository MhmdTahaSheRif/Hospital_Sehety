import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import HeaderSection from './HeaderSection'; // Assuming HeaderSection component exists
import Footer from './Footer'; // Assuming Footer component exists

const PatientList = () => {
    const [data, setData] = useState([]); // Store fetched data
    const [filteredData, setFilteredData] = useState([]); // Store filtered data for search and date
    const [loading, setLoading] = useState(true); // Handle loading state
    const [errorMessage, setErrorMessage] = useState(''); // Error state
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [dateFilter, setDateFilter] = useState(''); // Date filter for booking date

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    useEffect(() => {
        filterData(); // Filter data when search term or date filter changes
    }, [searchTerm, dateFilter, data]);

    // Function to fetch data from the API
    const fetchData = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setErrorMessage("No access token found");
                setLoading(false);
                return;
            }

            const response = await axios.get('http://10.100.100.149:500/API/SickHistory/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Authorization header
                },
            });

            setData(response.data); // Set fetched data
            setFilteredData(response.data); // Set the initial filtered data
        } catch (error) {
            setErrorMessage('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    // Function to filter data based on search term and date filter
    const filterData = () => {
        let filtered = data;

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

        setFilteredData(filtered); // Set filtered data
    };

    const columns = [
        {
            name: 'اسم المريض',
            selector: row => row.patient,
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
        {
            name: 'الدكتور',
            selector: row => row.doctor,
            sortable: true,
        },
        {
            name: 'تاريخ الحجز',
            selector: row => new Date(row.booking_date).toLocaleString('ar'),
            sortable: true,
        },
        {
            name: 'التشخيص',
            selector: row => row.confirmations ? row.confirmations.diagnosis : '-',
            sortable: true,
            cell: row => (
                <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                    {row.confirmations ? row.confirmations.diagnosis : '-'}
                </div>
            ),
        },
        {
            name: 'التعليق',
            selector: row => row.confirmations ? row.confirmations.comment : '-',
            sortable: true,
            cell: row => (
                <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                    {row.confirmations ? row.confirmations.comment : '-'}
                </div>
            ),
        },
        {
            name: 'الأدوية',
            selector: row => (
                row.confirmations && row.confirmations.medication.length > 0
                    ? row.confirmations.medication.map((med, index) => <div key={index}>{med.ename}</div>)
                    : '-'
            ),
            sortable: true,
            cell: row => (
                <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                    {row.confirmations && row.confirmations.medication.length > 0
                        ? row.confirmations.medication.map((med, index) => <div key={index}>{med.ename}</div>)
                        : '-'}
                </div>
            ),
        },
    ];

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

    if (loading) return <div className="loading-spinner">جاري التحميل....</div>;
    if (errorMessage) return <div className="error-message">{errorMessage}</div>;

    return (
        <div>
            <HeaderSection isLoggedIn={true} />

            <div className="container my-4" 
    style={{
        maxWidth: '1350px',
        background: '#00c6a929',  
        padding: '40px',
        borderRadius: '20px'  
        ,height:'60vh'
    }}>

                <h1 className="text-center mb-4">قائمة المرضى</h1>

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
        </div>
    );
};

export default PatientList;
