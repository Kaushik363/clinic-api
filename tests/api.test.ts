import { describe, expect, test } from 'bun:test'
import { app } from '../src/app'

const call = (path: string, init?: RequestInit) =>
    app.handle(new Request('http://localhost' + path, init))

describe('Clinic API', () => {
    test('GET /health returns 200', async () => {
        const res = await call('/health')
        expect(res.status).toBe(200)
    })

    test('GET /doctors/99 returns 404', async () => {
        const res = await call('/doctors/99')
        expect(res.status).toBe(404)
    })

    test('GET /doctors/abc returns 422', async () => {
        const res = await call('/doctors/abc')
        expect(res.status).toBe(422)
    })

    test('POST /patients creates a patient (201)', async () => {
        const res = await call('/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Jane Doe',
                age: 28,
                email: 'jane@example.com'
            })
        })
        expect(res.status).toBe(201)
    })

    test('POST /patients rejects duplicate email (409)', async () => {
        const res = await call('/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Jane Duplicate',
                age: 30,
                email: 'jane@example.com'
            })
        })
        expect(res.status).toBe(409)
    })

    test('POST /appointments books a slot (201)', async () => {
        const res = await call('/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                doctorId: 1,
                patientId: 1,
                slot: '2026-11-20T10:00',
                reason: 'Regular checkup'
            })
        })
        expect(res.status).toBe(201)
    })

    test('POST /appointments rejects double booking (409)', async () => {
        const res = await call('/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                doctorId: 1,
                patientId: 1,
                slot: '2026-11-20T10:00',
                reason: 'Another checkup'
            })
        })
        expect(res.status).toBe(409)
    })
})