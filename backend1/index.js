const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3307;

app.use(cors());
app.use(express.json());

// 세션 설정
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "student100!", // MySQL 비밀번호
  database: "travel", // 데이터베이스 이름
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 데이터베이스에 연결되었습니다.");
  }
});

// OpenAI 설정
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// OpenAI를 이용해 여행 추천 데이터 생성 API
app.post("/api/generate-travel", async (req, res) => {
  const { startDate, endDate, destination, groupSize, travelIntensity, activities } = req.body;

  // OpenAI 프롬프트
  const prompt = `
    다음은 사용자의 여행 요청입니다:
    - 출발: ${startDate}
    - 도착: ${endDate}
    - 여행지: ${destination}
    - 인원: ${groupSize}명
    - 여행 강도: ${travelIntensity}
    - 관심 활동: ${activities.join(", ")}

    위 요청을 기반으로 여행 추천을 생성해 주세요:
    1. 추천 교통수단
    2. 접근 가능한 숙소
    3. 관광지 및 명소
    4. 주의할 점
    5. 하루 또는 이틀 동안의 추천 일정 예시
  `;

  try {
    // OpenAI 호출
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
    });

    const travelRecommendation = response.data.choices[0].text.trim();

    // MySQL에 추천 결과 저장
    const query = `
      INSERT INTO travel_recommendations (destination, recommendation)
      VALUES (?, ?)
    `;

    db.query(query, [destination, travelRecommendation], (err, result) => {
      if (err) {
        console.error("추천 데이터 저장 오류:", err);
        return res.status(500).json({
          code: 5000,
          message: "추천 데이터를 저장하는 중 오류가 발생했습니다.",
        });
      }

      // 성공 응답
      return res.status(200).json({
        code: 1000,
        message: "추천 데이터 생성 및 저장 성공",
        recommendation: travelRecommendation,
      });
    });
  } catch (error) {
    console.error("OpenAI 호출 실패:", error);
    return res.status(500).json({
      code: 5001,
      message: "OpenAI 호출 중 오류가 발생했습니다.",
    });
  }
});

// 추천 여행 리스트 API
app.get("/api/travel-list", (req, res) => {
  console.log("추천 여행 리스트 요청이 들어왔습니다.");

  // MySQL 쿼리 실행
  const query = `
    SELECT 
        id AS pid, 
        destination AS title, 
        recommendation AS description
    FROM travel_recommendations
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("추천 여행 리스트 조회 오류:", err);
      return res.status(500).json({
        code: 5000,
        message: "추천 여행 리스트 조회 중 오류가 발생했습니다.",
      });
    }

    // 데이터가 없는 경우 처리
    if (results.length === 0) {
      return res.status(404).json({
        code: 4004,
        message: "추천 여행 리스트가 존재하지 않습니다.",
      });
    }

    // 성공 응답
    return res.status(200).json({
      result: results,
      code: 1000,
      message: "추천 여행 리스트 조회 성공",
    });
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
