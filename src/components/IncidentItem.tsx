import React, { useState } from 'react';
import { Incident } from '../types';

interface Props {
  incident: Incident;
}

const IncidentItem: React.FC<Props> = ({ incident }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg transition hover:shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold dark:text-white">{incident.title}</h3>
        <span className={`text-sm px-2 py-1 rounded ${getSeverityColor(incident.severity)}`}>
          {incident.severity}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Reported on: {new Date(incident.reported_at).toLocaleDateString()}
      </p>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-blue-600 dark:text-blue-400 text-sm underline hover:text-blue-800 dark:hover:text-blue-300"
      >
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {incident.description}
        </p>
      )}
    </div>
  );
};

export default IncidentItem;
