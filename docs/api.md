# API Design

## Authentication

### Login

POST /api/auth/login

Description:
Authenticate user and return JWT token.

---

### Logout

POST /api/auth/logout

Description:
Logout user.

---

# Users

### Get All Employees

GET /api/users

---

### Get Employee By ID

GET /api/users/:id

---

### Create Employee

POST /api/users

---

### Update Employee

PUT /api/users/:id

---

### Delete Employee

DELETE /api/users/:id

---

# Leave Types

### Get All Leave Types

GET /api/leave-types

---

### Create Leave Type

POST /api/leave-types

---

### Update Leave Type

PUT /api/leave-types/:id

---

### Delete Leave Type

DELETE /api/leave-types/:id

---

# Leave Requests

### Apply Leave

POST /api/leaves

---

### Get My Leaves

GET /api/leaves/my

---

### Get All Leaves

GET /api/leaves

---

### Get Leave By ID

GET /api/leaves/:id

---

### Update Pending Leave

PUT /api/leaves/:id

---

### Cancel Leave

PATCH /api/leaves/:id/cancel

---

### Approve Leave

PATCH /api/leaves/:id/approve

---

### Reject Leave

PATCH /api/leaves/:id/reject