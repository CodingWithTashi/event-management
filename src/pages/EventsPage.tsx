import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import type { Event } from '../types';

type DateFilter = 'all' | 'upcoming' | 'week' | 'month';
type PriceFilter = 'all' | 'free' | 'under50' | '50plus';
type SortBy = 'date' | 'price';

function getMinPrice(event: Event): number {
  return Math.min(...event.ticketTypes.map(t => t.price));
}

function matchesDate(event: Event, filter: DateFilter): boolean {
  if (filter === 'all') return true;
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (filter === 'upcoming') return eventDate >= today;

  if (filter === 'week') {
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= weekFromNow;
  }

  if (filter === 'month') {
    return (
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  }

  return true;
}

function matchesPrice(event: Event, filter: PriceFilter): boolean {
  const price = getMinPrice(event);
  if (filter === 'all') return true;
  if (filter === 'free') return price === 0;
  if (filter === 'under50') return price > 0 && price < 50;
  if (filter === '50plus') return price >= 50;
  return true;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    axios
      .get<Event[]>('http://localhost:3001/events')
      .then(res => setEvents(res.data))
      .catch(() => setError('Failed to load events. Make sure the server is running.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(events.map(e => e.category)));
  }, [events]);

  const visibleEvents = useMemo(() => {
    const filtered = events.filter(event => {
      if (search && !event.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (category !== 'all' && event.category !== category) return false;
      if (!matchesDate(event, dateFilter)) return false;
      if (!matchesPrice(event, priceFilter)) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'price') return getMinPrice(a) - getMinPrice(b);
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [events, search, category, dateFilter, priceFilter, sortBy]);

  function toggleFavorite(id: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const selectCls =
    'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search events by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-80 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={selectCls}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value as DateFilter)}
            className={selectCls}
          >
            <option value="all">Any Date</option>
            <option value="upcoming">Upcoming</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <select
            value={priceFilter}
            onChange={e => setPriceFilter(e.target.value as PriceFilter)}
            className={selectCls}
          >
            <option value="all">Any Price</option>
            <option value="free">Free</option>
            <option value="under50">Under $50</option>
            <option value="50plus">$50+</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className={selectCls}
          >
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {visibleEvents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isFavorite={favorites.has(event.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
