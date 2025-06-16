# Atlanta Braves Take Home Project

This project is a full-stack web application for visualizing baseball player stats. It uses a Flask backend and a React frontend.

## Prerequisites

- Python 3.12.10+ - this was because this is the version I have and all the dependencies auto-installed the latest compatible with that version
- Node.js
- (Optional) `venv` for Python virtual environments

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **(Optional) Create and activate a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python app.py
   ```
   The backend will start on `http://localhost:5000`.

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Usage

- Open your browser and go to [http://localhost:5173](http://localhost:5173) to use the app.
- The frontend will communicate with the backend API for player data.

## Project Structure

```
backend/    # Flask API
frontend/   # React app
```