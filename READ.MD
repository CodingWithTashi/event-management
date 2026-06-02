# Event Management Platform — Task Breakdown

Each task below = one feature branch + one commit.

---

## Task 1 — Project Setup & Data

**Branch:** `feature/project-setup`

- Install dependencies: `react-router-dom`, `axios`, `json-server`
- Create `db.json` with sample events (multiple categories) and bookings
- Set up folder structure: `src/components`, `src/pages`, `src/context`, `src/hooks`, `src/types`
- Add `json-server` script to `package.json`
- Define TypeScript types for `Event`, `Booking`, `TicketType`, `Attendee`

**Commit message:** `feat: project setup, db.json data, folder structure, types`

---

## Task 2 — App Shell: Layout, Routing & Context

**Branch:** `feature/app-shell`

- Set up React Router with routes:
  - `/` → redirect to `/events`
  - `/events` → Events listing page
  - `/events/:id` → Event details page
  - `/bookings` → My Bookings page
- Create `ThemeContext` — light/dark mode, persisted in `localStorage`
- Create `BookingsContext` — global bookings state
- Build `Header` component with nav links (Events, My Bookings) + theme toggle button
- Active link highlight for current page

**React concepts covered:** Context API, conditional rendering, component composition

**Commit message:** `feat: routing, ThemeContext, BookingsContext, Header with theme toggle`

---

## Task 3 — Events Listing Page

**Branch:** `feature/events-listing`

- Fetch events from `GET /events` using `useEffect`
- Build `EventCard` component — shows title, date, location, price, category, favorite icon
- Render events in a responsive card grid
- Favorite/like toggle per card using `useState`
- Loading state, error state, empty state ("No events found")
- `useRef` to auto-focus search input on page load

**React concepts covered:** useEffect, useState, useRef, list rendering with keys, component props

**Commit message:** `feat: events listing page with EventCard, favorites, loading/error/empty states`

---

## Task 4 — Search, Filters & Sort

**Branch:** `feature/search-filters`

- Search events by title (controlled input, auto-focused via useRef)
- Filter by category (Technology, Music, Sports, Arts, etc.)
- Filter by date (Upcoming, This Week, This Month)
- Filter by price range (Free, Under $50, $50+)
- Sort by date or price
- `useMemo` to compute filtered + sorted list without re-running on every render

**React concepts covered:** useMemo (performance optimization), event handling, controlled inputs

**Commit message:** `feat: search, category/date/price filters, sort, useMemo optimization`

---

## Task 5 — Event Details Page

**Branch:** `feature/event-details`

- Fetch single event from `GET /events/:id` using `useEffect`
- Display full info: description, date, time, location, venue, organizer
- List available ticket types with pricing
- "Book Tickets" button → navigates to booking flow
- Loading state, error state

**React concepts covered:** useEffect, conditional rendering, props

**Commit message:** `feat: event details page with full info, ticket types, Book Tickets button`

---

## Task 6 — Booking Flow (3 Steps)

**Branch:** `feature/booking-flow`

- Manage all booking state with `useReducer`
- Progress indicator: "Step 1 of 3", "Step 2 of 3", "Step 3 of 3"
- **Step 1 — Select Tickets:** choose ticket type + quantity, real-time price total
- **Step 2 — Attendee Details:** Name, Email, Phone per ticket, full validation, inline error messages
- **Step 3 — Confirmation:** booking summary, generated reference number, "View My Bookings" button
- Back button on each step
- Block Next if current step is invalid
- `POST /bookings` on confirmation

**React concepts covered:** useReducer, form handling + validation, event handling, conditional rendering

**Commit message:** `feat: 3-step booking flow with useReducer, validation, POST to bookings`

---

## Task 7 — My Bookings Page

**Branch:** `feature/my-bookings`

- Fetch bookings from `GET /bookings?userId=user1` using `useEffect`
- List bookings: event name, date, tickets, total amount, status
- Filter tabs: Upcoming / Past
- Cancel button on upcoming bookings
- Confirmation dialog (built with React Portal) before cancellation
- `PATCH /bookings/:id` to update status to "cancelled"
- Empty state: "No bookings yet"

**React concepts covered:** Portals (modal/dialog), useEffect, list rendering, conditional rendering

**Commit message:** `feat: my bookings page, upcoming/past filter, cancel with portal dialog`

---

## Task 8 — Toast Notifications & Responsive Polish

**Branch:** `feature/notifications-polish`

- Build a `ToastNotification` component using React Portal
- Show success toast after booking is confirmed
- Show success toast after booking is cancelled
- Responsive layout check — works on mobile and desktop
- Final cleanup: consistent spacing, no broken states

**React concepts covered:** Portals, Context API (notification trigger)

**Commit message:** `feat: toast notifications via portal, responsive layout polish`

---

## Branch & Commit Flow Summary

```
main
 └── feature/project-setup
 └── feature/app-shell
 └── feature/events-listing
 └── feature/search-filters
 └── feature/event-details
 └── feature/booking-flow
 └── feature/my-bookings
 └── feature/notifications-polish
```

Merge each branch into `main` after completing and testing it.

---

## React Concepts Checklist (from assignment)

| Concept                        | Task         |
|-------------------------------|--------------|
| Component composition & props | Task 2, 3    |
| useState                      | Task 3       |
| useReducer                    | Task 6       |
| useEffect                     | Task 3, 5, 7 |
| Context API                   | Task 2       |
| useRef                        | Task 3, 4    |
| Portals                       | Task 7, 8    |
| useMemo (perf optimization)   | Task 4       |
| Conditional rendering         | Task 3, 5, 6 |
| List rendering with keys      | Task 3, 7    |
| Event handling                | Task 4, 6    |
| Form handling + validation    | Task 6       |

---

## Running the Project

```bash
# Start JSON server (port 3001)
npm run server

# Start React dev server (port 5173)
npm run dev
```
