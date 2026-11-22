import {Elysia,t} from 'elysia';

export const logger=new Elysia({name: 'logger'})
    .derive({as: 'global'},()=>({startedAt: Date.now()}))
    .onAfterResponse({as: 'global'},({request,set,startedAt})=>{
        const path=new URL(request.url).pathname
        const ms=startedAt? Date.now()-startedAt : 0
        console.log(`{request.method} ${path} -> ${set.status ?? 200} (${ms})`)
    })