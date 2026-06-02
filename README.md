# Event Management Platform

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios
- **Backend:** JSON Server (mock REST API)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the backend (mock API on port 3001):

```bash
npm run server
```

Run the frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Frontend Features

### Events Listing (`/events`)

- Browse all events in a responsive card grid
- Search events by title (search input auto-focuses on page load)
- Filter by **category**, **date** (Upcoming / This Week / This Month), and **price** (Free / Under $50 / $50+)
- Sort by date or price
- Mark events as favorites (heart icon)
- Loading, error, and empty states

### Theme Toggle

- Light/Dark mode toggle in the header
- Preference persisted in `localStorage`

## Project Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Route-level pages
├── context/      # React Context providers (theme, bookings)
├── hooks/        # Custom hooks
└── types/        # TypeScript type definitions
```
