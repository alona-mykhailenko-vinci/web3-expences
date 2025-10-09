# Expense Tracker

A full-stack expense tracking application built with React (frontend) and Express.js (backend).

## Features

- Add random expenses with automatic ID generation
- View all expenses in a clean, centered layout
- Reset all expenses to initial state
- Responsive design with Tailwind CSS
- Real-time data persistence with JSON file storage

## Tech Stack

### Frontend
- **React 19.1.1** with TypeScript
- **Tailwind CSS 4.1.14** for styling and components
- **Vite 7.1.6** for development and building
- **React Router Dom 7.9.3** for routing

### Backend
- **Express.js** for REST API
- **CORS** for cross-origin requests
- **JSON file storage** for data persistence

## Project Structure

```
web3/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── types/      # TypeScript type definitions
│   │   └── ...
│   ├── package.json
│   └── .env           # Environment variables
├── backend/           # Express.js backend API
│   ├── routes/        # API route handlers
│   ├── services/      # Business logic layer
│   ├── data/          # JSON data storage
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web3
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:3000
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### API Endpoints

- `GET /api/expenses` - Fetch all expenses
- `POST /api/expenses` - Add a new expense
- `POST /api/expenses/reset` - Reset expenses to initial state

## Frontend-Backend Connection

The frontend connects to the backend through:

1. **Environment Configuration**: API URL defined in `.env` file
2. **CORS Setup**: Backend configured to accept requests from frontend origin
3. **Fetch API**: Frontend uses fetch() for HTTP requests
4. **Error Handling**: Comprehensive error handling on both ends

### Connection Flow
```
Frontend (React) ←→ Backend (Express) ←→ Data Storage (JSON)
   Port 5173           Port 3000           expenses.json
```

## Development Notes

- **Tailwind CSS**: Uses utility-first CSS framework for styling
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Centered layout that works on all screen sizes
- **State Management**: React hooks for local state management
- **Data Persistence**: JSON file storage for simplicity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes.