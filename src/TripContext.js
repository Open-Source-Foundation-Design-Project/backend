import React, { createContext, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  const addTrip = (trip) => {
    setTrips([...trips, trip]);
  };

  return (
    <TripContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripContext.Provider>
  );
};
