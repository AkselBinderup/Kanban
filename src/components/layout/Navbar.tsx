//FK05
import type { User } from '../../types/auth';

export function Navbar({ bruger, logUd, åbnNy }: { bruger: User; logUd: () => void; åbnNy: () => void }) {
  return (
    <header className="border-b p-2 flex justify-between">
      <div>
        <b>Kanban</b> | {bruger.username} ({bruger.role})
      </div>
      <div className="flex gap-2">
        <button onClick={åbnNy} className="border px-2">+ Ny sag</button>
        <button onClick={logUd} className="border px-2">Log ud</button>
      </div>
    </header>
  );
}