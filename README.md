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
<img width="1359" height="651" alt="Screenshot 2026-09-04 060543" src="https://github.com/user-attachments/assets/45880807-5b94-4450-b75d-6103be1e9711" />
<img width="1344" height="639" alt="Screenshot 2026-09-04 061120" src="https://github.com/user-attachments/assets/2ff662be-e489-4bb1-a7cf-bdd939c95f3e" />
<img width="1348" height="637" alt="Screenshot 2026-09-04 061102" src="https://github.com/user-attachments/assets/01b6bdeb-037a-4faf-bcdc-14c38a329039" />
<img width="1365" height="637" alt="Screenshot 2026-09-04 060937" src="https://github.com/user-attachments/assets/c4b67758-0673-44b5-97bb-4c134d40be7d" />
<img width="1345" height="646" alt="Screenshot 2026-09-04 060810" src="https://github.com/user-attachments/assets/a1e2a5d2-a0a0-4080-b9f4-c17160213b87" />


| Admin Dashboard | Task Overview |
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
