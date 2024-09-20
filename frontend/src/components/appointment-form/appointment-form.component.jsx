import { useEffect, useState } from "react";
import { doctors } from "../../constants/doctors.const";
import {About,AppointmentFormContainer,BookButton,BookingSection,BookingTitle,DoctorProfile,DropdownContainer,Experience,ProfileInfo,ProfilePicture,SlotButton,SlotSelector,VerifiedIcon,} from "./appointment-form.styles";
import {appointmentSlots,appointmentTypes,defaultAppointementFields,} from "../../constants/appointments.const";
import Calendar from "../UI/calendar/calendar.component";
import moment from "moment";
import axios from "axios";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment.utc().format("YYYY-MM-DD")
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [appointmentFields, setAppointmentFields] = useState(
    defaultAppointementFields
  );
  const [appointments, setAppointments] = useState([]);

  // Cargar citas desde el backend al montar el componente o cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      fetchAppointmentsByDate(selectedDate);
    }
  }, [selectedDate]);

  /* const fetchAppointmentsByDate = async (date) => {
    try {
      const response = await axios.get(`/appointments?date=${date}`);
      setAppointments(response.data); //se debe de recibir un array
    } catch (error) {
      console.error("Error al cargar las citas", error);
    }
  }; */

  const handleAppointmetSubmit = async () => {
    try {
      const newAppointment = { ...appointmentFields };
      await axios.post("api/cita/crear", newAppointment); // Guardar nueva cita
      alert("Cita reservada con éxito");
      /* fetchAppointmentsByDate(selectedDate); */ // Actualizar 
    } catch (error) {
      console.error("Error al reservar la cita", error);
      alert("Hubo un error al reservar la cita. Inténtalo nuevamente.");
    }
  };

  // Verificar cita
  /* const isSlotTaken = (slot) => {
    return appointments.some((appointment) => appointment.hora === slot);
  }; */

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
    setAppointmentFields({
      ...appointmentFields,
      motivo: e.target.value,
    });
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setAppointmentFields({
      ...appointmentFields,
      fecha: date,
    });
  };

  const handleSlotClick = (slot) => {
    
      setSelectedSlot(slot);
      setAppointmentFields({
        ...appointmentFields,
        hora: slot,
      });
    
  };

  return (
    <AppointmentFormContainer>
      <DoctorProfile>
        <ProfilePicture>
          <img src={doctors[4].picture} alt={doctors[4].name} />
        </ProfilePicture>
        <ProfileInfo>
          <h2>
            {doctors[4].name} <VerifiedIcon>✔️</VerifiedIcon>
          </h2>
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
            <option value="" disabled>
              Select a reason
            </option>
            {appointmentTypes.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </DropdownContainer>

        <Calendar onSelectDate={handleSelectDate} selected={selectedDate} />
        <SlotSelector>
          {appointmentSlots.map((slot) => (
            <SlotButton
              key={slot}
              selected={selectedSlot === slot}
              onClick={() => handleSlotClick(slot)}
              disabled={isSlotTaken(slot)} // Deshabilitar si el slot ya está tomado
            >
              {slot} {isSlotTaken(slot) ? "(Ocupado)" : ""}
            </SlotButton>
          ))}
        </SlotSelector>
        <BookButton
          onClick={handleAppointmetSubmit}
          disabled={!selectedDate || !selectedSlot || !selectedReason}
        >
          Reservar cita
        </BookButton>
      </BookingSection>
    </AppointmentFormContainer>
  );
};

export default AppointmentForm;
