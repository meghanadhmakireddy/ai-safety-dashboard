import React, { useState, useEffect } from 'react';
import { Incident } from './types';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';

const mockData: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
];

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const stored = localStorage.getItem("incidents");
    return stored ? JSON.parse(stored) : mockData;
  });

  const [filter, setFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

 
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : true;  
  });

  useEffect(() => {
    localStorage.setItem("incidents", JSON.stringify(incidents));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [incidents, darkMode]);

  const handleAddIncident = (newIncident: Incident) => {
    setIncidents([newIncident, ...incidents]);
  };

  const filteredIncidents = incidents.filter((incident) =>
    (filter === 'All' ? true : incident.severity === filter) &&
    incident.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const total = incidents.length;
  const high = incidents.filter(i => i.severity === 'High').length;
  const medium = incidents.filter(i => i.severity === 'Medium').length;
  const low = incidents.filter(i => i.severity === 'Low').length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex bg-[#e0f2fe] dark:bg-gray-900 text-black dark:text-white">
  
       

<div className="w-[40%] h-screen flex flex-col px-6 pt-6 relative">


  <div className="w-full text-center mt-12">
    <h1 className="text-4xl font-orbitron text-gray-800 dark:text-white">
      AI - Safety Incident Dashboard
    </h1>
  </div>

  <div className="flex justify-end mt-8">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {darkMode ? "Light" : "Dark"} Mode
    </button>
  </div>

  <div className="flex-grow flex items-center justify-center mt-4">
  <img 
    // src="/Artificial-Intelligence-Depositphotos_605786810_S.jpg.webp" 
    src="dash2.webp"
    // src="dash.jpg"
    alt="AI Dashboard"
    className="w-[93%] h-[93%] object-cover rounded-md shadow-md" 
  />
</div>


</div>



  
        
        <div className="w-[60%] px-6 py-6">
  
     
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6 shadow-sm text-center text-sm">
            <p>
              <strong>{total}</strong> incidents reported —
              <span className="text-red-600 dark:text-red-400 font-semibold"> {high} High</span>,
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold"> {medium} Medium</span>,
              <span className="text-green-600 dark:text-green-400 font-semibold"> {low} Low</span>
            </p>
          </div>
  
        
          <IncidentForm onAdd={handleAddIncident} />
  
        
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <input
                type="text"
                placeholder="Search incidents by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded focus:outline-none focus:ring focus:border-blue-400 dark:focus:border-blue-500"
              />
  
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded"
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
  
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
  
       
          <IncidentList incidents={sortedIncidents} />
        </div>
      </div>
    </div>
  );
  
}

export default App;
