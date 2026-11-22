import {Elysia,t} from 'elysia';
import { doctors,patients,appointments,nextAppointmentId } from '../../data/store';

const createAppointment=t.Object({
    doctorId: t.Number(),
    patientId: t.Number(),
    slot: t.String({minLength: 10}),
    reason: t.Optional(t.String({maxLength: 200}))
})

export const appointmentsModule=new Elysia()
    .get('/appointments',()=>{
        return appointments
    })
    .post('/appointments',({body,status})=>{
        if(Number.isNaN(Date.parse(body.slot))) return status(422,{message: "slot must be valid date-time"})
        const doctor=doctors.find(d=>d.id===body.doctorId)
        if(!doctor) return status(404, {message: "Doctor not found"})
        const patient=patients.find(p=>p.id===body.patientId)
        if(!patient) return status(404, {message: "Patient not found"})
        const isTaken=appointments.some(
            a=>a.doctorId===body.doctorId&&a.slot===body.slot
        )
        if(isTaken) return status(409,{message: 'Slot already booked'})
        const newAppointment={id: nextAppointmentId(),...body}
        appointments.push(newAppointment)
        return status(201,newAppointment)
    },{
        body: createAppointment
    })