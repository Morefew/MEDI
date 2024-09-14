export const appointmentTypes = [
    "New Patient",
    "Follow-Up Visit",
    "Results Receivement",
    "Pre-Ops",
    "Post-Ops"
];

export const appointmentSlots = [
    "08:00 a.m.",
    "08:30 a.m.",
    "09:00 a.m.",
    "09:30 a.m.",
    "10:00 a.m.",
    "10:30 a.m.",
    "11:00 a.m.",
    "11:30 a.m.",
    "12:00 p.m.",
    "12:30 p.m.",
    "01:00 p.m.",
    "01:30 p.m.",
    "02:00 p.m.",
    "02:30 p.m.",
    "03:00 p.m.",
    "03:30 p.m.",
];

export const defaultAppointementFields = {
    doctor_id: 0,
    patient_id: 1,
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente',
    Notification: false
};