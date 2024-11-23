import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const BookingConfirmationModal = ({ show, onHide, bookingData }) => {
  // إضافة حالة لحفظ التشخيص
  const [diagnosis, setDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // دالة لمعالجة التغيير في التشخيص
  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };

  // دالة لإرسال تأكيد الحجز إلى API
  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setErrorMessage('');  // إعادة تعيين الرسالة عند الضغط على التأكيد
    try {
      // إرسال البيانات إلى API
      const response = await axios.post(
        'http://10.100.100.149:500/API/Booking/confirm',  // تغيير الرابط إلى الرابط المناسب
        {
          booking_id: bookingData.id,  // استخدم id الحجز من البيانات
          diagnosis: diagnosis,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,  // إضافة التوكن إذا لزم الأمر
          },
        }
      );

      // التحقق من الرد والتعامل مع التأكيد
      if (response.status === 200) {
        alert('تم تأكيد الحجز بنجاح!');
        onHide();  // إغلاق المودال بعد التأكيد
      }
    } catch (error) {
      setErrorMessage('فشل في تأكيد الحجز، يرجى المحاولة مرة أخرى.');
      console.error('Error confirming booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!bookingData) {
    return null;  // إذا كانت البيانات غير موجودة، لا تعرض الموديول
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>تفاصيل الحجز</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>رقم الحجز:</strong> {bookingData.patient_number}</p>
        <p><strong>اسم المريض:</strong> {bookingData.patient}</p>
        <p><strong>اسم الدكتور:</strong> {bookingData.doctor}</p>
        <p><strong>تاريخ الحجز:</strong> {new Date(bookingData.booking_date).toLocaleString('ar')}</p>
        <p><strong>المستشفى:</strong> {bookingData.hospital}</p>
        <p><strong>التخصص:</strong> {bookingData.specialties}</p>

        {/* إضافة مربع نص لكتابة التشخيص */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="diagnosis"><strong>التشخيص:</strong></label>
          <textarea
            id="diagnosis"
            value={diagnosis}
            onChange={handleDiagnosisChange}
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>

        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>إغلاق</Button>
        <Button 
          variant="primary" 
          onClick={handleConfirmBooking} 
          disabled={isLoading}  // تعطيل الزر أثناء التحميل
        >
          {isLoading ? 'جاري التأكيد...' : 'تأكيد الحجز'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingConfirmationModal;
