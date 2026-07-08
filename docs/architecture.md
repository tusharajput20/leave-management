# Project Architecture

## Architecture

Client (Browser)
        │
        ▼
Frontend (Next.js)
        │
        ▼
API Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Repositories
        │
        ▼
MongoDB

---

## Folder Structure

app/
components/
features/
controllers/
services/
repositories/
models/
lib/
middleware/
validators/
utils/
types/
config/
docs/
public/

---

## Authentication Flow

User Login

↓

Validate Email

↓

Validate Password

↓

Generate JWT

↓

Store JWT

↓

Access Dashboard

---

## User Roles

ADMIN

- Manage Employees
- Manage Leave Types
- Approve Leaves
- Reject Leaves

EMPLOYEE

- Apply Leave
- View Leave History
- Cancel Pending Leave
- Edit Pending Leave

---

## Development Workflow

Requirement Analysis

↓

Database Design

↓

API Design

↓

Backend Development

↓

Frontend Development

↓

Testing

↓

Deployment