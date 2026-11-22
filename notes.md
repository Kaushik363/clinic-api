21/11/2026 => Day 1: Elysia Basics

---

### 3. Paste this into `notes.md` (based on the real issues you solved today)
```markdown
# Day 1 Notes — Top 3 Errors & Fixes

1. **`Attempting to change configurable attribute of unconfigurable property` on `GET /doctors/:id`**
   - **Cause:** A bug in Elysia `1.4.31`/`1.4.32` when using `t.Numeric()` on route `params` with Bun.
   - **Fix:** Downgraded Elysia to `1.4.30` (`bun add elysia@1.4.30`), which resolved the crash while keeping `t.Numeric()` working cleanly.

2. **TypeScript comparison error (`number` vs `string`) & accidental assignment (`=` vs `===`)**
   - **Cause:** Switching `id` to `t.String()` caused `d.id === params.id` to fail type checking, and using `p.id = body.patientId` inside `.find()` overwrote the ID instead of comparing it.
   - **Fix:** Kept `id: t.Numeric()` (on Elysia `1.4.30`) and always used strict equality (`===`) inside `.find()` and `.some()`.

3. **Validation & `NaN` edge cases in `POST /appointments`**
   - **Cause:** `Date.parse(body.slot) === NaN` always evaluates to `false` in JavaScript, and `reason` accidentally used `minLength: 200` instead of `maxLength: 200`.
   - **Fix:** Used `Number.isNaN(Date.parse(body.slot))` with status `422`, and updated `reason` to `maxLength: 200`.