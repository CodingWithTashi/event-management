export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  organizerName: string;
  ticketTypes: TicketType[];
}

export interface Attendee {
  name: string;
  email: string;
  phone: string;
}

export interface BookingTicket {
  type: string;
  quantity: number;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  tickets: BookingTicket[];
  attendees: Attendee[];
  totalAmount: number;
  status: 'confirmed' | 'cancelled';
  bookingDate: string;
  referenceNumber: string;
}
