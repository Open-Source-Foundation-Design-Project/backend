import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // 폼 제출 기본 동작 방지

        // 디버깅: formData 로그 찍어보기
        console.log('Form Data:', formData);

        // 필수 필드가 모두 채워졌는지 확인
        if (formData.username && formData.email && formData.password) {
            try {
                // axios를 사용하여 서버로 데이터 전송
                const response = await axios.post('http://localhost:5000/api/signup', formData);
                
                // 디버깅: axios 응답 확인
                console.log('응답 데이터:', response);

                // 서버에서 성공 메시지 받으면 리디렉션
                if (response.data.message === '회원가입 성공') {
                    setTimeout(() => {
                        navigate("/"); // 성공 후 홈 페이지로 이동
                    }, 2000); // 2초 후 이동
                } else {
                    console.error('회원가입 실패:', response.data.message);
                }
            } catch (error) {
                console.error('회원가입 오류:', error);
            }
        } else {
            alert('모든 필드를 입력해주세요!');  // 필드가 비어 있을 때 경고
        }
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid place-items-center"
            style={{ backgroundImage: "url('/Rectangle 189.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold text-center text-gray-900">Sign Up</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit" // 'submit' 버튼 타입으로 설정
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
