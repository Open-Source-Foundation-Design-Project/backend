import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SearchPage from "./pages/SearchPage.jsx"; //여행추천
import PlanPage from "./pages/PlanPage.jsx"; //여행계획
import StoryPage from "./pages/StoryPage.jsx"; //여행커뮤니티
import MyPage from "./pages/MyPage.jsx"; //나의여행
import RecommendPage from "./pages/Recommend.jsx";

function App() {
  useEffect(() => {
    // 페이지 전역 배경 이미지 설정
    document.body.style.backgroundImage = "url('/Rectangle 189.png')";
    document.body.style.backgroundSize = "cover"; // 필요에 따라 이미지 크기 설정
    document.body.style.backgroundRepeat = "no-repeat"; // 반복 방지
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/planpage" element={<PlanPage />} />
        <Route path="/storypage" element={<StoryPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search/recommend" element={<RecommendPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
