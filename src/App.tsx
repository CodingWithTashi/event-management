import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BookingsProvider } from './context/BookingsContext';
import Header from './components/Header';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import BookingsPage from './pages/BookingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <BookingsProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
            <Header />
            <main className="max-w-5xl mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/events" replace />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </BookingsProvider>
    </ThemeProvider>
  );
}
