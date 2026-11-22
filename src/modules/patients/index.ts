import {Elysia,t} from 'elysia';
import { patients,nextPatientId } from '../../data/store';

const createPatient=t.Object({
    name:t.String({minLength: 2}),
    age: t.Number({minimum: 0, maximum:120}),
    email: t.String({format: 'email'})
})

export const patientsModule=new Elysia()
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