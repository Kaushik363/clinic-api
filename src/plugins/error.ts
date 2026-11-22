import {Elysia} from 'elysia'

export const errors=new Elysia({name: 'errors'})
    .onError({as: 'global'},({code,error,set})=>{
        if(code==='VALIDATION'){
            set.status=422
            console.log('Validation failed:',error.all.map((e)=>e.summary?? e.message))
            return {message: 'Invalid data sent to the API'}
        }
        if(code==='NOT_FOUND'){
            set.status=404
             return { message: 'Route not found' }
        }
        console.error(error);
        set.status=500
        return {message: 'Internal server error'}
    })