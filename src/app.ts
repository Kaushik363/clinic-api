import {Elysia,t} from 'elysia';
import { doctorsModule } from './modules/doctors';
import { patientsModule } from './modules/patients';
import { appointmentsModule } from './modules/appointments';
export const app=new Elysia()
    .get('/health',()=>({status: 'ok'}))
    .use(doctorsModule)
    .use(patientsModule)
    .use(appointmentsModule)
    