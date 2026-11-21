import {Elysia,t} from 'elysia';
import { doctors,patients,appointments, nextAppointmentId, nextPatientId } from './data/store';

const createPatient=t.Object({
    name:t.String({minLength: 2}),
    age: t.Number({minimum: 0, maximum:120}),
    email: t.String({format: 'email'})
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