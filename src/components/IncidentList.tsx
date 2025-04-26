import React from 'react';
import { Incident } from '../types';
import IncidentItem from './IncidentItem';

interface Props {
  incidents: Incident[];
}

const IncidentList: React.FC<Props> = ({ incidents }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {incidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;
