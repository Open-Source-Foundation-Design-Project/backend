import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import { TripContext } from "../TripContext";

export default function SearchPage() {
  const navigate = useNavigate();
  const { addTrip } = useContext(TripContext); 
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = () => {
    const tripData = {
      tripName,
      destination,
      startDate,
      endDate,
    };
    addTrip(tripData); 
    console.log("여행이 생성되었습니다.", tripData);
    navigate('/mypage'); 
  }
  
  const handleCreateTrip = () => {
    const tripData = {
      tripName,
      destination,
      startDate,
      endDate,
    };
    addTrip(tripData); 
    console.log("여행이 생성되었습니다.", tripData);
    navigate('/mypage'); 
  };

  return (
    <div className=" flex flex-col items-center justify-center  from-green-50 to-green-100">
      <Nav />
      <div className="bg-white p-8 mt-20 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl  font-bold mb-4">여행 만들기</h2>
        <p className="text-gray-600 mb-6">나의 여행 일정을 만들어보세요. 장소와 날짜를 직접 설정하고 일일 계획을 구성할 수 있습니다.</p>
        <div className="space-y-6">
          <div className="text-left">
            <label className="block font-semibold mb-1">여행 코스 이름</label>
            <input
              type="text"
              placeholder="여행 코스 이름"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </div>
          <div className="text-left">
            <label className="block font-semibold mb-1">어디로?</label>
            <input
              type="text"
              placeholder="장소"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="text-left">
            <label className="block font-semibold mb-1">언제?</label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button className="flex-1 py-2 bg-green-300 text-white font-bold rounded-md" onClick={() => navigate('/')}>취소</button>
          <button onClick={handleCreate} className="flex-1 py-2 bg-green-600 text-white font-bold rounded-md" onClick={handleCreateTrip}>여행 만들기</button>
        </div>
      </div>
    </div>
  );
}
