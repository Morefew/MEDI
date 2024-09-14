import { useEffect, useState } from "react";
import { doctors } from "../../constants/doctors.const";
import { About, AppointmentFormContainer, BookButton, BookingSection, BookingTitle, DoctorProfile, DropdownContainer, Experience, ProfileInfo, ProfilePicture, SlotButton, SlotSelector, VerifiedIcon } from "./appointment-form.styles";
import { appointmentSlots, appointmentTypes, defaultAppointementFields } from "../../constants/appointments.const";
import Calendar from "../UI/calendar/calendar.component";
import moment from "moment";


const AppointmentForm = () => {
    const [selectedDate, setSelectedDate] = useState(moment.utc().format('YYYY-MM-DD'));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [appointmentFields, setAppointmentFields] = useState(defaultAppointementFields);

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify({}));
    }, []);

    const handleAppointmetSubmit = async () => {
        await localStorage.setItem('appointments', JSON.stringify(appointmentFields));
    };

    const handleReasonChange = (e) => {
        setSelectedReason(e.target.value);
        setAppointmentFields({
            ...appointmentFields,
            motivo: e.target.value
        });
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setAppointmentFields({
            ...appointmentFields,
            fecha: date
        });
    };

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setAppointmentFields({
            ...appointmentFields,
            hora: slot
        });
    };

    return (
        <AppointmentFormContainer>
            <DoctorProfile>
                <ProfilePicture>
                    <img src={doctors[4].picture} alt={doctors[4].name} />
                </ProfilePicture>
                <ProfileInfo>
                    <h2>{doctors[4].name} <VerifiedIcon>✔️</VerifiedIcon></h2>
                    <p>{doctors[4].specialty}</p>
                    <Experience>{doctors[4].experience} Year</Experience>
                    <About>{doctors[4].about}</About>
                </ProfileInfo>
            </DoctorProfile>
            <BookingSection>
                <BookingTitle>Booking slots</BookingTitle>

                <DropdownContainer>
                    <label>Reason for Appointment:</label>
                    <select value={selectedReason} onChange={handleReasonChange}>
                        <option value="" disabled>Select a reason</option>
                        {appointmentTypes.map((reason, index) => (
                            <option key={index} value={reason}>
                                {reason}
                            </option>
                        ))}
                    </select>
                </DropdownContainer>

                <Calendar onSelectDate={handleSelectDate} selected={selectedDate} />
                <SlotSelector>
                    {appointmentSlots.map(slot => (
                        <SlotButton
                            key={slot}
                            selected={selectedSlot === slot}
                            onClick={() => handleSlotClick(slot)}
                        >
                            {slot}
                        </SlotButton>
                    ))}
                </SlotSelector>
                <BookButton
                    onClick={handleAppointmetSubmit}
                    disabled={!selectedDate || !selectedSlot || !selectedReason}
                >Book an appointment</BookButton>
            </BookingSection>
        </AppointmentFormContainer>
    );
};

export default AppointmentForm
