const express = require('express');
const router = express.Router();
const getConnection = require('../mysql_connector');


// sub_category query
router.get('/title/:title', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection((conn) => {
        let title = req.params.title;
        const sql = `SELECT menu_id, name, price, img_url FROM menu WHERE sub_category_id = (SELECT sub_category_id FROM sub_category WHERE title='${title}')`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            res.send(results);
        });
        conn.release();
    });
})

// menu_id query
router.get('/:menuId', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection((conn) => {
        let menuId = req.params.menuId;
        const sql = `SELECT m.*, sc.title FROM menu m, sub_category sc WHERE m.sub_category_id=sc.sub_category_id AND menu_id=${menuId}`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            res.send(results[0]);
        });
        conn.release();
    });
})

// menu list query
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection((conn) => {
        const sql = `SELECT menu_id, name, price, img_url FROM menu`;
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            res.send(results);
        });
        conn.release();
    });
})

module.exports = router;