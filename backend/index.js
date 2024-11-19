const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // POST 요청의 데이터를 처리하는 middleware
const session = require('express-session'); // 세션 관리

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// 세션 설정
app.use(session({
    secret: 'your_secret_key', // 세션 암호화에 사용할 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS를 사용할 경우 true로 설정
}));

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // MySQL 비밀번호
    database: 'app'   // 사용할 데이터베이스 이름
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 데이터베이스에 연결되었습니다.');
    }
    // 테이블이 존재하지 않을 때 생성
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;

    db.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('테이블 생성 실패:', err);
            return;
        }
        console.log('users 테이블이 성공적으로 생성되었습니다.');
    });
    // trips 테이블이 존재하지 않을 때 생성
    const createTripsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips (
            tid INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            destination VARCHAR(255) NOT NULL,
            start_date DATETIME NOT NULL,
            end_date DATETIME NOT NULL,
            travel_plan TEXT,
            user_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

    db.query(createTripsTableQuery, (err, results) => {
        if (err) {
            console.error('trips 테이블 생성 실패:', err);
            return;
        }
        console.log('trips 테이블이 성공적으로 생성되었습니다.');
    });
});



// 회원가입 API 처리
app.post('/api/signup', (req, res) => {
    console.log('회원가입 요청:', req.body);
    const { username, email, password } = req.body;

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
app.post('/users/login', (req, res) => {
    console.log('로그인 요청:', req.body);
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('로그인 오류:', err);
            return res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
        }

        if (result.length > 0) {
            const user = result[0];

            // 비밀번호 비교
            if (user.password === password) {
                // 로그인 성공: 세션에 사용자 정보 저장
                req.session.userId = user.id; // 사용자 ID를 세션에 저장
                req.session.username = user.username; // 사용자 이름을 세션에 저장

                return res.status(200).json({ message: '로그인 성공' });
            } else {
                return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
            }
        } else {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }
    });
});

// 로그아웃 API
app.post('/users/logout', (req, res) => {
    // 세션을 파기하여 로그아웃 처리
    req.session.destroy((err) => {
        if (err) {
            console.error('로그아웃 오류:', err);
            return res.status(500).json({ message: '로그아웃 처리 중 오류가 발생했습니다.' });
        }
        res.status(200).json({ message: '로그아웃 성공' });
    });
});


// 여행 생성 API
app.post('/trips', (req, res) => {
    const { title, destination, start_date, end_date, travel_plan } = req.body;

    // 세션에서 사용자 ID 확인
    if (!req.session.userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const userId = req.session.userId; // 사용자 ID 가져오기

    // 여행 생성 쿼리
    const query = 'INSERT INTO trips (title, destination, start_date, end_date, travel_plan, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, destination, start_date, end_date, travel_plan, userId], (err, result) => {
        if (err) {
            console.error('여행 생성 오류:', err);
            return res.status(500).json({
                isSuccess: false,
                code: 2000,
                message: '여행 생성 중 오류가 발생했습니다.'
            });
        }

        // 성공적으로 생성된 경우
        const createdTrip = {
            title,
            destination,
            start_date: new Date(start_date).toISOString(),
            end_date: new Date(end_date).toISOString(),
            created_at: new Date().toISOString(),
            travel_plan, // 사용자가 작성한 여행 계획 포함
            tid: result.insertId
        };

        return res.status(201).json({
            isSuccess: true,
            code: 1000,
            message: '요청에 성공하였습니다.',
            result: createdTrip
        });
    });
});

// 마이페이지 (여행 조회)
app.get('/mypage', (req, res) => {
    // 세션에서 사용자 ID를 확인
    if (!req.session.userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const userId = req.session.userId; // 세션에서 사용자 ID 가져오기

    // 사용자 ID에 해당하는 여행 조회 쿼리
    const query = `
        SELECT 
            tid, 
            title, 
            destination, 
            start_date, 
            end_date, 
            travel_plan  -- 여행계획 추가
        FROM trips
        WHERE user_id = ?  -- 사용자 ID로 필터링
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('여행 조회 오류:', err);
            return res.status(500).json({
                isSuccess: false,
                code: 2000,
                message: '여행 조회 중 오류가 발생했습니다.'
            });
        }

        return res.status(200).json({
            isSuccess: true,
            code: 1000,
            message: '요청에 성공하였습니다.',
            result: results // 결과 반환
        });
    });
});

/// 여행 삭제 API
app.delete('/trips/:tid', (req, res) => {
    // 세션에서 사용자 ID 확인
    if (!req.session.userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const userId = req.session.userId; // 세션에서 사용자 ID 가져오기
    const tripId = req.params.tid; // URL 파라미터에서 여행 ID 가져오기

    // 사용자 ID와 여행 ID를 기준으로 여행 삭제 쿼리
    const query = 'DELETE FROM trips WHERE tid = ? AND user_id = ?';

    db.query(query, [tripId, userId], (err, result) => {
        if (err) {
            console.error('여행 삭제 오류:', err);
            return res.status(500).json({
                isSuccess: false,
                code: 2000,
                message: '여행 삭제 중 오류가 발생했습니다.'
            });
        }

        // 삭제된 행의 수 확인
        if (result.affectedRows === 0) {
            return res.status(404).json({
                isSuccess: false,
                code: 4000,
                message: '해당 여행을 찾을 수 없습니다.'
            });
        }

        // 성공적으로 삭제된 경우
        return res.status(200).json({
            isSuccess: true,
            code: 1000,
            message: '여행이 성공적으로 삭제되었습니다.'
        });
    });
});


// 여행 상세보기 API
app.get('/trips/:tid', (req, res) => {
    // 세션에서 사용자 ID 확인
    if (!req.session.userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const userId = req.session.userId; // 세션에서 사용자 ID 가져오기
    const tripId = req.params.tid; // URL 파라미터에서 여행 ID 가져오기

    // 여행 상세 조회 쿼리
    const query = `
        SELECT 
            tid, 
            title, 
            destination, 
            start_date, 
            end_date, 
            travel_plan  -- 여행계획 내용
        FROM trips
        WHERE tid = ? AND user_id = ?  -- 여행 ID와 사용자 ID로 필터링
    `;

    db.query(query, [tripId, userId], (err, results) => {
        if (err) {
            console.error('여행 상세 조회 오류:', err);
            return res.status(500).json({
                isSuccess: false,
                code: 2000,
                message: '여행 상세 조회 중 오류가 발생했습니다.'
            });
        }

        // 결과가 없을 경우
        if (results.length === 0) {
            return res.status(404).json({
                isSuccess: false,
                code: 4000,
                message: '해당 여행을 찾을 수 없습니다.'
            });
        }

        // 성공적으로 조회된 경우
        return res.status(200).json({
            isSuccess: true,
            code: 1000,
            message: '여행 상세 조회에 성공하였습니다.',
            result: results[0].travel_plan 
        });
    });
});



// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
