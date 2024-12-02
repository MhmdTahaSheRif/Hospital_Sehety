import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BookingConfirmationModal = ({ show, onHide, bookingData }) => {
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState('');
  const [comment, setComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Search medications
  const searchMedications = async (term) => {
    try {
      const response = await axios.get(
        `http://10.100.100.149:500/API/medications/search/?search=${term}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setMedications(response.data);
    } catch (error) {
      console.error('Error searching medications:', error);
    }
  };

  // Handle medication search input
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length >= 2) {
      searchMedications(term);
    } else {
      setMedications([]);
    }
  };

  // Handle medication selection
  const handleMedicationSelect = (medication) => {
    if (!selectedMedications.find(med => med.id === medication.id)) {
      setSelectedMedications([...selectedMedications, medication]);
    }
    setSearchTerm('');
    setMedications([]);
  };

  // Remove selected medication
  const handleRemoveMedication = (medicationId) => {
    setSelectedMedications(selectedMedications.filter(med => med.id !== medicationId));
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        'http://10.100.100.149:500/API/BookingConfirmation/',
        {
          booking: bookingData.id,
          diagnosis: diagnosis,
          comment: comment,
          medication: selectedMedications.map(med => med.id)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      if (response.data.message === "Booking confirmation created successfully") {
        alert('تم تأكيد الحجز بنجاح!');
        onHide();
        navigate('/tickets'); 
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage('فشل في تأكيد الحجز، يرجى المحاولة مرة أخرى.');
      console.error('Error confirming booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!bookingData) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>تفاصيل الحجز</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="booking-details">
          <p><strong>رقم الحجز:</strong> {bookingData.patient_number}</p>
          <p><strong>اسم المريض:</strong> {bookingData.patient}</p>
          <p><strong>اسم الدكتور:</strong> {bookingData.doctor}</p>
          <p><strong>تاريخ الحجز:</strong> {new Date(bookingData.booking_date).toLocaleString('ar')}</p>
          <p><strong>المستشفى:</strong> {bookingData.hospital}</p>
          <p><strong>التخصص:</strong> {bookingData.specialties}</p>
        </div>

        <Form.Group className="mb-3">
          <Form.Label><strong>التشخيص:</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>ملاحظات:</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>بحث عن الأدوية:</strong></Form.Label>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="اكتب اسم الدواء..."
          />
          {medications.length > 0 && (
            <div className="medication-search-results">
              {medications.map(med => (
                <div
                  key={med.id}
                  className="medication-item"
                  onClick={() => handleMedicationSelect(med)}
                  style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #eee' }}
                >
                  {med.ename}
                </div>
              ))}
            </div>
          )}
        </Form.Group>

        <div className="selected-medications">
          <strong>الأدوية المختارة:</strong>
          {selectedMedications.map(med => (
            <div key={med.id} className="selected-medication-item">
              {med.ename}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleRemoveMedication(med.id)}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>إغلاق</Button>
        <Button
          variant="primary"
          onClick={handleConfirmBooking}
          disabled={isLoading}
        >
          {isLoading ? 'جاري التأكيد...' : 'تأكيد الحجز'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingConfirmationModal;
