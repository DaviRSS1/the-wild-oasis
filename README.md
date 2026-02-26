# 🏨 The Wild Oasis – Admin Panel

**The Wild Oasis – Admin Panel** is a full-stack React application built for **study purposes**, developed while following an advanced React course and expanded with additional custom features.

This application represents the **administrative dashboard** of The Wild Oasis platform, allowing staff members to manage cabins, bookings, and guests in a professional hotel management interface.

It works together with the customer-facing application:

🌐 **Customer Website (Next.js App Router)**  
👉 https://the-wild-oasis-website-ruddy-beta.vercel.app/

Together, both projects simulate a real-world SaaS architecture with separated **admin** and **client** environments connected to the same Supabase backend.

---

🌐 Live Demo (Admin Panel)

👉 https://the-wild-oasis-27em.vercel.app/

---

## 🔗 Related Project

🏕️ **The Wild Oasis – Customer Website (Next.js)**  
👉 https://github.com/DaviRSS1/the-wild-oasis-website

The customer application allows guests to:

- Browse cabins
- Create reservations
- Manage their bookings
- Authenticate with NextAuth

Both apps share the same database and simulate a production-style booking ecosystem.

---

## 🔐 Test Login

You can use the following credentials to test the application:

- **Email:** test@example.com
- **Password:** pass1234

> These credentials are for demonstration and testing purposes only.

---

## 🚀 Features

### 🏠 Cabins Management

- Create new cabins
- Edit existing cabins
- Delete cabins
- Duplicate cabins
- Upload cabin images to Supabase Storage

### 📅 Bookings Management

- Create bookings (custom feature implemented)
- Check-in guests
- Add optional breakfast
- Check-out bookings
- Delete bookings
- API-side filtering
- API-side sorting
- Server-side pagination
- Prefetching with React Query

### 👥 Guests Management (Custom Feature)

- Dedicated Guests page
- Guests table
- Create new guest
- Update guest
- Delete guest
- Country flag rendering using dynamic country codes
- URL state synchronization for sorting and filtering

### 📊 Dashboard

- Display statistics
- Recent bookings and stays
- Line chart (Recharts)
- Pie chart (Recharts)
- Current day activity overview

### 🔐 Authentication & Authorization

- User sign up
- User login
- User logout
- Protected routes
- Row Level Security (RLS) with Supabase
- Update user data and password

### 🎨 UI & UX

- Styled Components architecture
- Reusable component system
- Compound component pattern
- Render props pattern
- Reusable table system
- Reusable pagination component
- Reusable context menu
- Dark mode with CSS variables
- Modal built with React Portal
- Click outside detection
- Toast notifications
- Error boundaries

---

## 🧠 Concepts Practiced

This project was built to deeply reinforce advanced React architecture and real-world SaaS patterns:

- Advanced React Router patterns
- URL search params synchronization
- Compound Component Pattern
- Render Props Pattern
- Higher Order Components (HOC)
- Custom Hooks abstraction
- TanStack React Query v4
  - Queries
  - Mutations
  - Prefetching
  - Cache invalidation
- Server-side pagination
- API-side filtering and sorting
- Form handling with React Hook Form
- Styled Components with global styles
- Dark mode using CSS variables
- React Portals
- Performance optimization
- Supabase integration
- Database modeling and relationships
- Row Level Security (RLS)
- File uploads with Supabase Storage
- Clean component architecture
- Separation of concerns
- Production-level folder structure

---

## 🛠️ Built With

- React
- React Router
- Styled Components
- TanStack React Query v4
- React Hook Form
- Supabase (Database + Auth + Storage)
- Recharts
- date-fns
- Vite
- Vercel (Deployment)

---

## 🗄️ Backend & Database

The backend is powered by **Supabase**, shared with the Customer Website project:

- Relational database structure
- Foreign key relationships
- Secure Row Level Policies (RLS)
- Authentication system
- File storage buckets
- Shared cabin and booking system between apps

Both the Admin Panel and Customer Website operate on the same database, simulating a real booking platform architecture.

---

## 🎯 Purpose of the Project

This application was developed for **advanced React practice**, focusing on building a real-world, production-style admin dashboard.

The goal was to simulate a SaaS-level architecture while strengthening knowledge in:

- Server state vs UI state management
- Data synchronization
- Backend integration
- Component reusability
- Performance optimization
- Scalable frontend architecture

Additional features like full Guests CRUD and booking creation were implemented independently to go beyond the course scope and solidify backend + frontend integration skills.

Together with the Next.js Customer Website, this project represents a complete booking ecosystem.

---

## 👤 Author

Developed by **Davi Reghim**

🔗 LinkedIn:  
https://www.linkedin.com/in/davi-reghim-13b995272/

💻 GitHub:  
https://github.com/DaviRSS1
