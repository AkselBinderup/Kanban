import { useState } from 'react';
import './App.css';
import { Login } from './components/auth/LoginForm';
import { Navbar } from './components/layout/Navbar';
import { FilterBar } from './components/board/FilterBar';
import { TicketCard } from './components/board/TicketCard';
import { TicketModal } from './components/modals/TicketModal';
import type { Priority, Status, User } from './types/auth';
import type { Ticket } from './types/ticket';

const colmns: Status[] = ['backlog', 'blokeret', 'Igang', 'færdig'];
const prioVægt: Record<Priority, number> = { Høj: 3, Normal: 2, Lav: 1 };

const initTickets: Ticket[] = [
  {
    ticketId: 101,
    title: 'titel 1',
    description: 'test beskrivelse 1.',
    reporter: 'user',
    assignedSupporter: null,
    priority: 'Høj',
    status: 'backlog',
    blockedReason: null,
    createdAt: '2026-10-30T09:00',
  },
  {
    ticketId: 102,
    title: 'Ny skærm til kontoret',
    description: 'Den gamle skærm flimrer konstant.',
    reporter: 'admin',
    assignedSupporter: 'supporter',
    priority: 'Lav',
    status: 'blokeret',
    blockedReason: 'blocketreason 2',
    createdAt: '2026-10-31T10:30',
  },
];

export default function App() {
  const [bruger, sætBruger] = useState<User | null>(null);
  const [tickets, sætTickets] = useState<Ticket[]>(initTickets);
  const [filter, sætFilter] = useState<Status | 'Alle'>('Alle');
  const [sorter, sætSorter] = useState<'date' | 'priority'>('date');
  const [visModal, sætVisModal] = useState(false);
  const [aktivTicket, sætAktivTicket] = useState<Ticket | null>(null);

  if (!bruger) return <Login onLogin={sætBruger} />;

  const synligeTickets = tickets
    .filter((t) => (bruger.role === 'User' ? t.reporter === bruger.username : true))
    .sort((a, b) =>
      sorter === 'priority'
        ? prioVægt[b.priority] - prioVægt[a.priority]
        : b.createdAt.localeCompare(a.createdAt)
    );

  const skiftStatus = (id: number, nyStatus: Status) => {
    let grund: string | null = null;
    if (nyStatus === 'blokeret') {
      grund = window.prompt('Begrundelse for blokering:');
      if (!grund?.trim()) return alert('Afvist: Begrundelse mangler');
    }
    sætTickets((prev) =>
      prev.map((t) => (t.ticketId === id ? { ...t, status: nyStatus, blockedReason: grund } : t))
    );
  };

  const behandlTicket = (data: any) => {
    if (aktivTicket) {
      sætTickets((prev) =>
        prev.map((t) => (t.ticketId === aktivTicket.ticketId ? { ...t, ...data } : t))
      );
    } else {
      const nytId = tickets.length ? Math.max(...tickets.map((t) => t.ticketId)) + 1 : 101;
      sætTickets((prev) => [
        { ...data, ticketId: nytId, createdAt: new Date().toISOString().slice(0, 16) },
        ...prev,
      ]);
    }
    sætVisModal(false);
  };

  const sletTicket = (id: number) => {
    if (window.confirm('Slet sag?')) {
      sætTickets((prev) => prev.filter((t) => t.ticketId !== id));
      sætVisModal(false);
    }
  };

  const synligeKolonner = filter === 'Alle' ? colmns : [filter];

  return (
    <div>
      <Navbar
        bruger={bruger}
        logUd={() => sætBruger(null)}
        åbnNy={() => { sætAktivTicket(null); sætVisModal(true); }}
      />

      <FilterBar
        kolonner={colmns}
        filter={filter}
        sætFilter={sætFilter}
        sorter={sorter}
        sætSorter={sætSorter}
      />

      <main className="p-2 grid grid-cols-4 gap-2">
        {synligeKolonner.map((kol) => (
          <div key={kol} className="border p-2 bg-gray-100">
            <b>{kol}</b>
            <div className="flex flex-col gap-2 mt-2">
              {synligeTickets
                .filter((t) => t.status === kol)
                .map((t) => (
                  <TicketCard
                    key={t.ticketId}
                    ticket={t}
                    bruger={bruger}
                    kolonner={colmns}
                    skiftStatus={skiftStatus}
                    klikKort={(valgt) => { sætAktivTicket(valgt); sætVisModal(true); }}
                  />
                ))}
            </div>
          </div>
        ))}
      </main>

      {visModal && (
        <TicketModal
          bruger={bruger}
          kolonner={colmns}
          ticket={aktivTicket}
          lukModal={() => sætVisModal(false)}
          behandlTicket={behandlTicket}
          sletTicket={sletTicket}
        />
      )}
    </div>
  );
}