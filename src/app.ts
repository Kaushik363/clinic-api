import {Elysia,t} from 'elysia';
import { doctors,patients,appointments, nextAppointmentId, nextPatientId } from './data/store';

const createPatient=t.Object({
    name:t.String({minLength: 2}),
    age: t.Number({minimum: 0, maximum:120}),
    email: t.String({format: 'email'})
})

const createAppointment=t.Object({
    doctorId: t.Number(),
    patientId: t.Number(),
    slot: t.String({minLength: 10}),
    reason: t.Optional(t.String({maxLength: 200}))
})

export const app=new Elysia()
    .get('/health',()=>({status: 'ok'}))
    .get('/doctors',({query})=>{
        if(query.specialty){
            return doctors.filter(d=>d.specialty===query.specialty)
        }
        return doctors
    },{
        query: t.Object({
            specialty: t.Optional(t.String())
        })
    })
    .get('/doctors/:id',({params,status})=>{
        const doctor= doctors.find(d=>d.id===params.id)
        if(!doctor) return status(404,{error: 'Doctor not found'})
        return doctor
    },{
        params: t.Object({
            id: t.Numeric()
        })
    })
    .get('/patients',()=>{
        return patients
    })
    .post('/patients',({body,status})=>{
        const duplicate=patients.find(d=>d.email===body.email)
        if(duplicate) return status(409,{message:"Email already registered"})
        const newPatient={id: nextPatientId(),...body}
        patients.push(newPatient)
        return status(201,newPatient)
    },{body: createPatient})
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