import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호가 없으면 회원가입 페이지로 이동
    if (!email || !password) {
      alert("로그인 정보가 없습니다. 회원가입 페이지로 이동합니다.");
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
      return;
    }

    // 로그인 요청
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password
    });
        console.log('로그인 성공:', response.data.user);
        if (response.data.message === '로그인 성공') {
          navigate("/");
      }
    } catch (error) {
        console.error("로그인 오류:", error.response ? error.response.data : error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
};

  return (
    <div
      className="w-screen h-screen bg-cover bg-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid place-items-center"
      style={{ backgroundImage: "url('/Rectangle 189.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
