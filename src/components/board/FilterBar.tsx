//FK43-45

// import type { Status } from '../../types/auth';

export function FilterBar({ kolonner, filter, sætFilter, sorter, sætSorter }: any) {
  return (
    <div className="border-b p-2 flex justify-between">
      <div className="flex gap-1">
        Filter:
        {(['Alle', ...kolonner] as const).map((s) => (
          <button
            key={s}
            onClick={() => sætFilter(s)}
            className={`border px-2 ${filter === s ? 'font-bold bg-gray-300' : ''}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div>
        Sorter:
        <select value={sorter} onChange={(e) => sætSorter(e.target.value)} className="border ml-1">
          <option value="date">Dato</option>
          <option value="priority">Prioritet</option>
        </select>
      </div>
    </div>
  );
}