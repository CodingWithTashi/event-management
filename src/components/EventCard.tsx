import { Link } from 'react-router-dom';
import type { Event } from '../types';

interface Props {
  event: Event;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function getMinPrice(event: Event): string {
  const prices = event.ticketTypes.map(t => t.price);
  const min = Math.min(...prices);
  return min === 0 ? 'Free' : `$${min}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ event, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 flex flex-col">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            {event.category}
          </span>
          <button
            onClick={() => onToggleFavorite(event.id)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          >
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white leading-snug">
          {event.title}
        </h3>

        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>{formatDate(event.date)} · {event.time}</p>
          <p>{event.location}</p>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            From {getMinPrice(event)}
          </span>
          <Link
            to={`/events/${event.id}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
