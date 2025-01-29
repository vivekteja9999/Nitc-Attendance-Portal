# Classroom & Cycle Management System

## Overview
The **Classroom & Cycle Management System** is a web application designed to streamline the process of borrowing classroom keys and cycles within an institution. The system provides role-based access for students and administrators, allowing them to manage resources efficiently.

## Features
- **User Authentication**: Users can log in as a student or admin.
- **User Dashboard**:
  - Search for available classroom keys or cycles.
  - View allocated and borrowed resources.
  - Submit borrow requests.
- **Admin Dashboard**:
  - Manage resource transactions.
  - Track borrowing history and user activity.
  - Approve or reject borrowing requests.
- **QR Code Borrowing**:
  - Scan QR codes to borrow and return cycles.
- **Notifications System**:
  - Real-time alerts for approvals, denials, and reminders.

## Tech Stack
### Frontend
- React.js
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security (for authentication and authorization)
- Hibernate (ORM for database interaction)
- PostgreSQL/MySQL (Database management)

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/)
- PostgreSQL/MySQL (for database setup)

### Steps to Run Locally
#### **1. Clone the repository:**
   ```sh
   git clone https://github.com/your-username/classroom-cycle-management.git
   cd classroom-cycle-management
   ```
#### **2. Backend Setup (Spring Boot):**
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/classroom_cycle_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Build and run the backend:
   ```sh
   mvn spring-boot:run
   ```

#### **3. Frontend Setup (React.js):**
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure
```
classroom-cycle-management/
│-- backend/
│   ├── src/
│   ├── pom.xml (Maven configuration)
│   ├── application.properties
│-- frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.js
│   ├── index.js
│   ├── package.json
│-- public/
│-- README.md
```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a pull request.


