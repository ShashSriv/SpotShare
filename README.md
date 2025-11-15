# ParkPanther Solutions

A residential finding platform that connects students with available housing in their university area. Users can browse, search, and connect with property owners and other students.

## Team Members
- **Scrum Master:** Shreyash Ranjan (codingshreyash)
- **Product Owner:** Shashwat Srivastava (ShashSriv)
- **Developers:** David Ejindu (davidejindu), Ryan Berry (rberry716), Lachlan McClymonds (LachlanMccly)

## Tech Stack
- **Frontend:** React 18, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Version Control:** GitHub

## Project Structure
```
parkpanther-solutions/
├── backend/          # Express.js API server
├── frontend/         # React application
├── README.md         # This file
└── .gitignore        # Git ignore rules
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Create environment file
npm run dev           # Start development server
```

### Frontend Setup
```bash
cd frontend
npm install
npm start             # Start React development server
```

## Deployment Plan
See `DEPLOYMENT.md` for UML deployment diagram and hosting strategy.

## Sprint Progress
- **Sprint 1:** Requirements Engineering ✓ (14.5/15)
- **Sprint 2:** System Design ✓ (15/15)
- **Sprint 3:** Deployment & Implementation (In Progress)
