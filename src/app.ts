import {Elysia,t} from 'elysia';
import { doctors,patients,appointments } from './data/store';

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