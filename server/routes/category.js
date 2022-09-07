const express = require('express');
const router = express.Router();
const getConnection = require('../mysql_connector');


// category, sub_category join
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection((conn) => {
        const sql = 'SELECT c1.title, c2.sub_category_id, c2.title as title2 FROM category AS c1 JOIN sub_category AS c2 ON c1.category_id = c2.category_id ORDER BY c1.category_id ASC';
        conn.query(sql, function(err, results, fields) {
            if (err) {
                res.send(err);
            }

            let cur = results[0].title;
            let tmp = [];
            let categoryList = [];
            results.map((item, i) => {
                if (cur == item.title) {
                    tmp = [...tmp, item];
                } else {
                    categoryList = [...categoryList, tmp];
                    cur = item.title;
                    tmp = [item];
                }
            });
            categoryList = [...categoryList, tmp];

            res.send(categoryList);
        });
        conn.release();
    });
})

module.exports = router;