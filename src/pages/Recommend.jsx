import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecommendPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const userRequest = {
        startDate: "2023-12-01",
        endDate: "2023-12-10",
        destination: "서울",
        groupSize: 3,
        travelIntensity: "여유롭게",
        activities: ["관광지관람", "먹방"],
      };

      const prompt = `
        다음은 사용자의 여행 요청입니다:
        - 출발: ${userRequest.startDate}
        - 도착: ${userRequest.endDate}
        - 여행지: ${userRequest.destination}
        - 인원: ${userRequest.groupSize}명
        - 여행 강도: ${userRequest.travelIntensity}
        - 관심 활동: ${userRequest.activities.join(", ")}

        위 요청을 기반으로 여행 추천을 생성해 주세요:
        1. 추천 교통수단
        2. 접근 가능한 숙소
        3. 관광지 및 명소
        4. 주의할 점
        5. 하루 또는 이틀 동안의 추천 일정 예시
      `;

      try {
        // 백엔드로 데이터 전송
        const response = await fetch("http://localhost:3307/api/generate-travel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: userRequest.startDate,
            endDate: userRequest.endDate,
            destination: userRequest.destination,
            groupSize: userRequest.groupSize,
            travelIntensity: userRequest.travelIntensity,
            activities: userRequest.activities,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        setRecommendation(data.recommendation);
        setLoading(false);
      } catch (error) {
        console.error("추천 데이터를 가져오거나 저장하는 중 오류 발생:", error);
        setRecommendation("추천 결과를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  return (
    <div>
      <h1>추천 결과</h1>
      {loading ? (
        <p>추천을 생성 중입니다...</p>
      ) : (
        <pre>{recommendation || "추천 결과를 가져오지 못했습니다."}</pre>
      )}
      <button onClick={() => navigate("/mypage")}>완료</button>
    </div>
  );
}
