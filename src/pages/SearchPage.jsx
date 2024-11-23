import React, { useState } from "react";
import Nav from "../components/Nav/Nav";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [destination, setDestination] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [travelIntensity, setTravelIntensity] = useState(null);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const handleRecommendClick = () => {
    console.log({
      departureDate,
      arrivalDate,
      destination,
      numberOfPeople,
      selectedGroup,
      travelIntensity,
      activities,
    });
    navigate("/search/recommend");
  };  
  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  const handleTravelIntensitySelection = (intensity) => {
    setTravelIntensity(intensity);
  };

  const handleActivitySelection = (activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter((a) => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };


  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center p-6  from-green-100 to-white min-h-screen">
        <div className="flex flex-col w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">언제?</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-gray-600">출발</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-2/3 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="출발 날짜를 선택하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600">도착</label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-2/3 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="도착 날짜를 선택하세요"
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">어디로?</h3>
          <div className="flex items-center">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="여행지를 선택해주세요"
              className="flex-grow p-2 mr-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">누구와?</h3>
          <div className="flex items-center justify-between mb-2">
            <button
              className="w-10 h-10 text-2xl text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => setNumberOfPeople(Math.max(0, numberOfPeople - 1))}
            >
              -
            </button>
            <span className="text-xl font-semibold text-gray-700">
              {numberOfPeople}명
            </span>
            <button
              className="w-10 h-10 text-2xl text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => setNumberOfPeople(numberOfPeople + 1)}
            >
              +
            </button>
          </div>
          <div className="flex space-x-2">
            {["친구와", "가족과", "연인과", "혼자서"].map((label) => (
              <button
                key={label}
                className={`px-4 py-2 text-sm rounded-full focus:outline-none focus:ring focus:ring-gray-400 ${
                  selectedGroup === label
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleGroupSelection(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">여행강도</h3>
          <div className="flex space-x-2">
            {["여유롭게", "보통", "바쁘게"].map((intensity) => (
              <button
                key={intensity}
                className={`px-4 py-2 text-sm rounded-full focus:outline-none focus:ring focus:ring-gray-400 ${
                  travelIntensity === intensity
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleTravelIntensitySelection(intensity)}
              >
                {intensity}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">무엇을?</h3>
          <div className="flex flex-wrap gap-2">
            {["관광지관람", "먹방", "액티비티", "체험", "카페"].map(
              (activity) => (
                <button
                  key={activity}
                  className={`px-4 py-2 text-sm rounded-full focus:outline-none focus:ring focus:ring-gray-400 ${
                    activities.includes(activity)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handleActivitySelection(activity)}
                >
                  {activity}
                </button>
              )
            )}
          </div>
        </div>
        <button
          onClick={handleRecommendClick}
          className="px-8 py-3 mt-4 text-lg font-bold text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
        >
          여행 추천 받기
        </button>
      </div>
    </div>
  );
}
