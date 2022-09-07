const express = require('express');
const router = express.Router();
const getConnection = require('../mysql_connector');


// login
router.post('/login', function(req, res, next) {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const { webId, password } = req.body;

    getConnection((conn) => {
        const sql = `SELECT count(*) as cnt FROM member WHERE web_id='${webId}' and password='${password}'`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.redirect('/');
            }
            if (results[0].cnt === 1) {
                res.cookie('userId', webId);
                res.redirect('http://localhost:3000');
            } else {
                //res.send("아이디 혹은 비밀번호 잘못 입력");
                res.redirect('http://localhost:3000/signin');
            }
        });
        conn.release();
    });
});

router.get('/logout', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.clearCookie('userId');
    res.redirect('http://localhost:3000');
});

// id dup check
router.get('/check', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection((conn) => {
        let webId = req.query.webId;
        const sql = `SELECT count(*) as cnt FROM member WHERE web_id='${webId}'`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            res.send(results);
        });
        conn.release();
    });
})

// signup
router.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const { webId, password, email, phoneNumber, marketing } = req.body;
    const marketing_consent_email = (marketing ? email : null);
    const marketing_consent_sms = (marketing ? phoneNumber : null);

    getConnection((conn) => {
        const sql = `INSERT INTO member (web_id, password, email, phone_number, marketing_consent_email, marketing_consent_sms, createdAt) 
        VALUES ('${webId}', '${password}', '${email}', '${phoneNumber}', '${marketing_consent_email}', '${marketing_consent_sms}', sysdate());`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }

            res.redirect('http://localhost:3000');
        });
        conn.release();
    });
});

// update
router.put('/', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection((conn) => {
        const { webId, password, email, phoneNumber } = req.body;

        const sql = `UPDATE member SET password='${password}', email='${email}', phone_number='${phoneNumber}', marketing_consent_email='${email}', marketing_consent_sms='${phoneNumber}' WHERE web_Id='${webId}'`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            res.send(results);
            
        });
        conn.release();
    });
});

// mypage
router.get('/mypage', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    console.log(req.cookies);
    if (!req.cookies.userId) res.redirect('http://localhost:3000/login');
});

module.exports = router;