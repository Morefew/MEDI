import { doctors } from "../../constants/doctors.const";

export const appointmentUtils = {
    // Here I want to create a function that will return the available appointment slots for a given date and doctor.
    getAvailableSlots: (date, doctorId) => {
        const doctor = doctors.find(doctor => doctor.id === doctorId);
        const lunchTime = doctor.lunchTime;
        const availableSlots = [];
        for (let i = 9; i < 18; i++) {
            if (i !== lunchTime) {
                availableSlots.push(`${i}:00`);
            }
        }
        return availableSlots;
    }
};
