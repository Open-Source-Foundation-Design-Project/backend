const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // POST 요청의 데이터를 처리하는 middleware

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

// 미들웨어 설정
app.use(cors());
app.use(express.json());  // JSON 형식의 요청 본문 처리

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',  // MySQL 비밀번호
    database: 'app'    // 사용할 데이터베이스 이름
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 데이터베이스에 연결되었습니다.');
    }
});

// 회원가입 API 처리
app.post('/api/signup', (req, res) => {
    console.log('회원가입 요청:', req.body);  // 요청 데이터 확인

    const { username, email, password } = req.body;

    // 데이터베이스에 저장 (예시)
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('회원가입 오류:', err);
            return res.status(500).json({ message: '회원가입 처리 중 오류가 발생했습니다.' });
        }
        res.status(200).json({ message: '회원가입 성공' });
    });
});

// 로그인 API
app.post('/api/login', (req, res) => {
    console.log('로그인 요청:', req.body);
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('로그인 오류:', err);
            return res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
        }

        if (user.password === password) {
            // 로그인 성공: is_logged_in 상태를 업데이트
            const updateQuery = 'UPDATE users SET is_logged_in = 1 WHERE email = ?';
            db.query(updateQuery, [email], (updateErr) => {
                if (updateErr) {
                    console.error('로그인 상태 업데이트 오류:', updateErr);
                    return res.status(500).json({ message: '로그인 상태 업데이트 중 오류가 발생했습니다.' });
                }
                return res.status(200).json({ message: '로그인 성공', user });
            });
        } else {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }
    });
});


// 로그아웃 API
app.post('/api/logout', (req, res) => {
    const { email } = req.body;

    const query = 'UPDATE users SET is_logged_in = 0 WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('로그아웃 오류:', err);
            return res.status(500).json({ message: '로그아웃 처리 중 오류가 발생했습니다.' });
        }
        res.status(200).json({ message: '로그아웃 성공' });
    });
});


// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
