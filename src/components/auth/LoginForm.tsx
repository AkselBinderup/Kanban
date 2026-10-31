//FK01

//Håndterer login med brugernavn og adgangskode og viser en fejlmeddelelse, 
// hvis login mislykkes.
import React, { useState } from 'react';
import type { User } from '../../types/auth';

interface Properties {
  onLogin: (user: User) => void;
}
 
// Temp
const testbrugere: Record<string, { pass: string; user: User }> = {
  admin: { pass: '1234', user: { username: 'admin', role: 'Admin' } },
  supporter: { pass: '1234', user: { username: 'supporter', role: 'Supporter' } },
  user: { pass: '1234', user: { username: 'user', role: 'User' } },
};

export function Login({ onLogin }: Properties) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const fundetbruger = testbrugere[username.toLowerCase()];

    if (fundetbruger && fundetbruger.pass === password) {
      onLogin(fundetbruger.user);
    } else {
      setError('forkert brugernavn eller adgangskode :/');
    }

 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Brugernavn</label>
          <input
            className="w-full border p-2 "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Indtast brugernavn"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Adgangskode</label>
          <input
            type="password"
            className="w-full border p-2 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Indtast adgangskode"
          />
        </div>

        <button className="w-full
         bg-green-600 
         text-white 
         p-2 
        hover:bg-green-500">
          Log ind
        </button>
      </form>
    </div>
  );
}