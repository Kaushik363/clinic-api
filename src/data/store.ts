export type Doctor={
    id: number,
    name: string,
    specialty: string
}

export type Patient={
    id: number,
    name: string,
    age: number,
    email: string
}

export type Appointment={
    id: number,
    doctorId: number,
    patientId: number,
    slot: string,
    reason?:string 
}

export const doctors: Doctor[]=[
    { id: 1, name: "Dr. Smith", specialty: "cardiology" },
    { id: 2, name: "Dr. Dhoni", specialty: "dermatology" },
    { id: 3, name: "Dr. Raina", specialty: "pediatrics" }
]

export const patients: Patient[]=[]

export const appointments: Appointment[]=[]

let patientId=1
export function nextPatientId(): number{
    return patientId++
}

let appointmentId=1;
export function nextAppointmentId(): number{
    return appointmentId++
}