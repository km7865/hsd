const express = require('express');
const router = express.Router();
const getConnection = require('../mysql_connector');


// create order, order_option
router.post('/', (req, res) => {
    let { userId, menuId, options } = req.body;
    options = options.split(',');
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");

    if (typeof req.cookies.userId == 'undefined') {
        res.send("/");
    }

    getConnection((conn) => {
        let memberId = 0;

        let sql = `SELECT member_id FROM member WHERE web_id=?`;
        conn.query(sql, userId, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            memberId = results[0].member_id;

            sql = `INSERT INTO \`order\`(member_id, menu_id, order_date) VALUES (?, ?, sysdate())`;
            conn.query(sql, [memberId, menuId], function(err, results, fields) {
                if (err) {
                    res.send(err);
                }
                
                let orderId = results.insertId;
                let sqls = ""; 
                options.forEach((option) => {
                    sqls += `INSERT INTO \`order_option\`(order_id, option_id) VALUES (${orderId}, ${parseInt(option)});`;
                });

                conn.query(sqls, function(err, results, fields) {
                    res.send("/");
                });
            });
        });
        
        conn.release();
    });
})


// delete order
router.get('/delete/:orderId', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    getConnection((conn) => {
        let orderId = req.params.orderId;
        let sqls = `DELETE FROM \`order_option\` WHERE order_id=${orderId};`;
        sqls += `DELETE FROM \`order\` WHERE order_id=${orderId};`;
        conn.query(sqls, function(err, results, fields) {
            if (err) {
                console.error(err);
                res.send("Delete order failed.");
            }
            res.send("/mypage/" + req.cookies.userId);
        });

        conn.release();
    });
});

// select order list
router.get('/:userId', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    getConnection ((conn) => {
        let userId = req.params.userId;
        let memberId = 0;

        let sql = `SELECT member_id FROM member WHERE web_id=?`;
        conn.query(sql, userId, function(err, results, fields) {
            if (err) {
                res.send(err);
            }
            memberId = results[0].member_id;

            sql = `SELECT O.order_id, O.order_date, M.name, M.price,
                        (SELECT sum(price) FROM order_option OO, \`order\` O1, \`option\` O2 
                            WHERE OO.order_id=O1.order_id 
                            AND OO.option_id=O2.option_id 
                            AND OO.order_id = O.order_id) AS option_sum
                    FROM \`order\` O, menu M where O.menu_id = M.menu_id AND O.member_id=?`;
            conn.query(sql, memberId, function(err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send("Select order list failed.");
                }
                res.send(results);
            });
        });

        conn.release();
    });
});

module.exports = router;