import React, { useState } from 'react';
import { Incident, Severity } from '../types';

interface Props {
  onAdd: (incident: Incident) => void;
}

const IncidentForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Low');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('All fields are required.');
      return;
    }

    const newIncident: Incident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };

    onAdd(newIncident);
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Report New Incident</h2>

      {error && <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1 dark:text-gray-200">Title</label>
        <input
          type="text"
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1 dark:text-gray-200">Description</label>
        <textarea
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:focus:border-blue-500"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1 dark:text-gray-200">Severity</label>
        <select
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:focus:border-blue-500"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Incident
      </button>
    </form>
  );
};

export default IncidentForm;
