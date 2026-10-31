// FK13 og FK24


import { useState } from 'react';
import type { Priority, Status } from '../../types/auth';

const supporterListe = ['supporter', 'admin', 'Rasmus', 'Aksel'];

export function TicketModal({ bruger, kolonner, ticket, lukModal, behandlTicket, sletTicket }: any) {
  const [titel, sætTitel] = useState(ticket?.title || '');
  const [beskrivelse, sætBeskrivelse] = useState(ticket?.description || '');
  const [opretter, sætOpretter] = useState(ticket?.reporter || bruger.username);
  const [prio, sætPrio] = useState<Priority>(ticket?.priority || 'Normal');
  const [status, sætStatus] = useState<Status>(ticket?.status || kolonner[0]);
  const [supporter, sætSupporter] = useState(ticket?.assignedSupporter || '');
  const [blokGrund, sætBlokGrund] = useState(ticket?.blockedReason || '');
  const [fejl, sætFejl] = useState('');

  const erStaff = bruger.role !== 'User';

  const gemForm = (e: any) => {
    e.preventDefault();
    if (!titel.trim()) return sætFejl('Titel skal udfyldes');
    if (!beskrivelse.trim()) return sætFejl('Beskrivelse skal udfyldes');
    if (!opretter.trim()) return sætFejl('Indmelder skal udfyldes');
    if (status === 'blokeret' && !blokGrund.trim()) return sætFejl('Begrundelse mangler');

    behandlTicket({
      title: titel,
      description: beskrivelse,
      reporter: opretter,
      priority: prio,
      status: ticket && erStaff ? status : kolonner[0],
      assignedSupporter: erStaff && supporter ? supporter : null,
      blockedReason: status === 'blokeret' ? blokGrund : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={gemForm} className="bg-white border p-4 w-80 flex flex-col gap-2">
        <b>{ticket ? `Rediger #${ticket.ticketId}` : 'Ny sag'}</b>
        {fejl && <div className="text-red-600 text-sm">{fejl}</div>}

        <input className="border p-1" placeholder="Titel" value={titel} onChange={(e) => sætTitel(e.target.value)} />
        <textarea className="border p-1" placeholder="Beskrivelse" value={beskrivelse} onChange={(e) => sætBeskrivelse(e.target.value)} />
        <input className="border p-1" placeholder="Indmelder" value={opretter} onChange={(e) => sætOpretter(e.target.value)} />

        <select className="border p-1" value={prio} onChange={(e) => sætPrio(e.target.value as Priority)}>
          <option value="Lav">Lav</option>
          <option value="Normal">Normal</option>
          <option value="Høj">Høj</option>
        </select>

        {erStaff && (
          <>
            <select className="border p-1" value={supporter} onChange={(e) => sætSupporter(e.target.value)}>
              <option value="">Ikke tildelt</option>
              {supporterListe.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {ticket && (
              <select className="border p-1" value={status} onChange={(e) => sætStatus(e.target.value as Status)}>
                {kolonner.map((k: Status) => <option key={k} value={k}>{k}</option>)}
              </select>
            )}
          </>
        )}

        {ticket && status === 'blokeret' && (
          <input className="border p-1" placeholder="Blokeringsgrund *" value={blokGrund} onChange={(e) => sætBlokGrund(e.target.value)} />
        )}

        <div className="flex justify-between mt-2">
          {ticket && <button type="button" onClick={() => sletTicket(ticket.ticketId)} className="border px-2 text-red-600">Slet</button>}
          <div className="flex gap-1 ml-auto">
            <button type="button" onClick={lukModal} className="border px-2">Luk</button>
            <button type="submit" className="border px-2 font-bold">Gem</button>
          </div>
        </div>
      </form>
    </div>
  );
}