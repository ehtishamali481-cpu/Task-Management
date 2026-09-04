# 🚀 Next.js Task Management System

A modern full-stack **Task Management Web Application** built with **Next.js 14, MongoDB, and JWT Authentication**.  
This application allows users to create, manage, and track tasks efficiently with **Role-Based Access Control (Admin & User)**, interactive task analytics, and a fully responsive UI.

---

## 📌 Key Features

- **🔐 Secure Authentication:** JWT-based user authentication with encrypted passwords using bcrypt.js.
- **👥 Role-Based Access Control (RBAC):** Distinct dashboards and access rules for **Admin** and **User** roles.
- **📋 Task CRUD Operations:** Create, read, update, and delete tasks with ease.
- **⚡ Status & Priority Management:** Track tasks by status (*Pending / Completed*) and priority levels (*Low / Medium / High*).
- **📊 Modern Dashboard:** Visual statistics and overview of pending/completed tasks.
- **📱 Fully Responsive UI:** Optimized for all screen sizes (mobile, tablet, and desktop).
- **🛡 Protected API Routes:** Built-in Next.js middleware to guard private views and endpoints.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React.js](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications:** [React-Toastify](https://www.npmjs.com/package/react-toastify)

### Backend & Database
- **API Routes:** Next.js Serverless Functions
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ODM:** [Mongoose](https://mongoosejs.com/)
- **Auth:** JSON Web Tokens (JWT) & bcrypt.js

---

## 🖼 Screenshots

| Admin Dashboard | Task Overview |
| :---: | :---: |
| <img width="933" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/ae437474-3c95-4b0e-b30b-2b7ce2fdfb74" /> | <img width="951" alt="Task Table" src="https://github.com/user-attachments/assets/2b32ff52-3e9b-4b33-a141-7392f6fbceea" /> |

| User Dashboard | Registration Screen |
| :---: | :---: |
| <img width="942" alt="User Dashboard" src="https://github.com/user-attachments/assets/ce681705-ddca-45b6-b4da-4dda86a90167" /> | <img width="932" alt="Register Screen" src="https://github.com/user-attachments/assets/95136644-c613-4424-a897-53ecb0ddc5f0" /> |

| Login Screen |
| :---: |
| <img width="954" alt="Login Screen" src="https://github.com/user-attachments/assets/a5b3b7c3-5d7d-4572-bc46-190a11588c6c" /> |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   ├── me/
│   │   └── tasks/
│   ├── dashboard/
│   │   ├── admin/
│   │   └── user/
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib/
│   └── dbconnect.js
├── schema/
│   ├── userSchema.js
│   └── todoSchema.js
└── middleware.js
