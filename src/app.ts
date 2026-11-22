import {Elysia,t} from 'elysia';
import { doctorsModule } from './modules/doctors';
import { patientsModule } from './modules/patients';
import { appointmentsModule } from './modules/appointments';
import { logger } from './plugins/logger';
import { errors } from './plugins/error';
export const app=new Elysia()
    .use(logger)
    .use(errors)
    .get('/health',()=>({status: 'ok'}))
    .use(doctorsModule)
    .use(patientsModule)
    .use(appointmentsModule)
    