//FK16 og FK17

import type { Status, User } from '../../types/auth';
import type { Ticket } from '../../types/ticket';

export function TicketCard({ ticket, bruger, kolonner, skiftStatus, klikKort }: {
  ticket: Ticket;
  bruger: User;
  kolonner: Status[];
  skiftStatus: (id: number, s: Status) => void;
  klikKort: (t: Ticket) => void;
}) {
  const erStaff = bruger.role !== 'User';

  return (
    <div onClick={() => klikKort(ticket)} className="bg-white border p-2 cursor-pointer">
      <div className="flex justify-between text-xs">
        <span>#{ticket.ticketId}</span>
        <b>{ticket.priority}</b>
      </div>

      <div className="font-bold">{ticket.title}</div>
      <div className="text-sm">{ticket.description}</div>

      {ticket.status === 'blokeret' && ticket.blockedReason && (
        <div className="text-xs text-red-600">Blokeret: {ticket.blockedReason}</div>
      )}

      <div className="text-xs mt-1 border-t pt-1">
        <div>Fra: {ticket.reporter}</div>
        <div>Supporter: {ticket.assignedSupporter || 'Ikke tildelt'}</div>
      </div>

      {erStaff && (
        <select
          value={ticket.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => skiftStatus(ticket.ticketId, e.target.value as Status)}
          className="border w-full mt-1 text-xs"
        >
          {kolonner.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )}
    </div>
  );
}