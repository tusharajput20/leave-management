# 🌟 Employee Leave Management System

A modern, full-stack web-based application designed to digitize, streamline, and automate the employee leave request and approval process. Built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Detailed Documentation](#-detailed-documentation)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)

---

## 📋 Project Overview

The Employee Leave Management System eliminates manual paperwork and spreadsheet tracking by providing a unified digital portal. It implements robust role-based access control (RBAC) to offer distinct functionalities for **Employees** and **Admins**.

- **Employees** can request time off, monitor approval statuses, manage pending requests, and view their leave history.
- **Admins** receive a dashboard to track company-wide metrics, manage employee profiles, customize leave types, and process incoming leave requests.

---

## ✨ Key Features

### 👤 Employee Panel
- **Apply for Leave:** Submit new leave requests specifying dates, leave type, and reason.
- **Leave Status & History:** Track approval states (Pending, Approved, Rejected, Cancelled) and view past logs.
- **Edit/Cancel Requests:** Modify or retract pending applications before they are processed by an admin.
- **Dashboard:** Personal statistics and leave summary.

### 🔑 Admin Panel
- **Leave Request Management:** Approve or reject leave applications with optional feedback remarks.
- **Employee Management:** Complete CRUD operations (Create, Read, Update, Delete) on employee accounts.
- **Leave Type Customization:** Define custom leave types (e.g., Annual, Sick, Casual, Parental leaves) and assign maximum allowance days.
- **Dashboard:** Interactive statistics, summary charts, and real-time pending request counters.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Next.js Server Actions & API Routes, JWT-based Authentication
- **Database:** [MongoDB](https://www.mongodb.com/) (using Mongoose ODM)
- **Deployment & Dev Tools:** Docker, Git, GitHub

---

## 📂 Detailed Documentation

For in-depth technical blueprints, refer to the documentation files in the `docs/` folder:

*   📄 **[Project Scope](docs/project_scope.md)** - High-level overview, target audience, and business goals.
*   📄 **[Features List](docs/feature.md)** - Bulleted breakdown of user and admin capabilities.
*   📄 **[Architecture & Folder Structure](docs/architecture.md)** - Code directory organization, MVC/Services layout, and auth flow.
*   📄 **[Database Design](docs/database.md)** - Detailed MongoDB schemas, fields, collections, and relationship mappings.
*   📄 **[API Specifications](docs/api.md)** - HTTP routes, endpoints, methods, and authorization requirements.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas URI)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tusharajput20/leave-management.git
   cd leave-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 💻 Development Workflow

To maintain a clean and professional repository history:

1. **Create a branch** for your task/feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Commit changes** using clear and descriptive messages conforming to Conventional Commits:
   ```bash
   git commit -m "feat: implement database connection and user schema"
   ```
3. **Push the branch** to remote:
   ```bash
   git push -u origin feature/your-feature-name
   ```
4. **Open a Pull Request (PR)** on GitHub to merge it into the `main` branch.
