import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  const SignUp = () => {
    navigate("/signup");
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid place-items-center"
      style={{
        backgroundImage: "url('/Rectangle 189.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 left-0 w-full p-4 flex justify-end items-center gap-6">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V7.125A4.125 4.125 0 0 0 12.375 3h-0.75A4.125 4.125 0 0 0 7.5 7.125V10.5M6.75 18.75h10.5c1.05 0 1.5-1.2 1.5-2.25v-6c0-1.05-0.45-2.25-1.5-2.25h-10.5c-1.05 0-1.5 1.2-1.5 2.25v6c0 1.05 0.45 2.25 1.5 2.25z"
            />
          </svg>
          <span
            onClick={goToLogin}
            className="font-pretendard text-[20px] font-extralight leading-[23.87px] text-[#595555]"
          >
            로그인
          </span>{" "}
          |
          <span
            onClick={SignUp}
            className="font-pretendard text-[20px] font-extralight leading-[23.87px] text-[#595555]"
          >
            회원가입
          </span>
        </div>
      </div>

      <div className="p-20">
        <div className="flex justify-center">
          <img src="/traveler_logo_ 1.png" alt="Logo" />
        </div>

        <div className="p-20 flex justify-center gap-8">
          <div className="rounded-xl border bg-[#D9FAFF] w-36 h-36 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 opacity-50 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p className="text-center text-sm font-medium">여행 찾기</p>
          </div>

          <div className="rounded-xl border bg-[#FFD1D1] w-36 h-36 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 opacity-50 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <p className="text-center text-sm font-medium">스토리</p>
          </div>

          <div className="rounded-xl border bg-[#D8FFD8] w-36 h-36 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 opacity-50 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <p className="text-center text-sm font-medium">나의 노트</p>
          </div>

          <div className="rounded-xl border bg-[#F9FFDF] w-36 h-36 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 opacity-50 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-center text-sm font-medium">나의 여행</p>
          </div>
        </div>
      </div>
    </div>
  );
}