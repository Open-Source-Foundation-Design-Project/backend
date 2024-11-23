import React, { useContext } from "react";
import { TripContext } from "../TripContext";

export default function ProfilePage() {
  const { trips } = useContext(TripContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">내 프로필</h2>
        <p className="text-gray-600 mb-6">나의 여행 일정을 확인하세요.</p>
        <div className="space-y-4 text-left">
          {trips.map((trip, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-bold">{trip.tripName}</h3>
              <p>{trip.destination}</p>
              <p>{trip.startDate} - {trip.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
