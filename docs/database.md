# Database Design

## Database

MongoDB

---

# Collections

1. Users
2. Leave Types
3. Leave Requests

---

# Users Collection

Stores all users of the system.

Fields

- _id
- employeeId
- fullName
- email
- password
- role
- department
- designation
- joiningDate
- status
- createdAt
- updatedAt

Role Values

- ADMIN
- EMPLOYEE

Status Values

- ACTIVE
- INACTIVE

---

# Leave Types Collection

Stores different types of leave.

Fields

- _id
- name
- description
- maxDays
- isPaid
- createdAt
- updatedAt

Examples

- Annual Leave
- Sick Leave
- Casual Leave
- Maternity Leave
- Paternity Leave

---

# Leave Requests Collection

Stores employee leave applications.

Fields

- _id
- employeeId
- leaveTypeId
- fromDate
- toDate
- totalDays
- reason
- status
- approvedBy
- remarks
- approvedAt
- createdAt
- updatedAt

Status Values

- Pending
- Approved
- Rejected
- Cancelled

---

# Relationships

One User

↓

Many Leave Requests

One Leave Type

↓

Many Leave Requests

One Admin

↓

Approves Many Leave Requests