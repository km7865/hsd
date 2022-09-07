const express = require('express');
const router = express.Router();
const getConnection = require('../mysql_connector');

// menu_option(menuId) query
router.get('/:menuId', (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    let menuId = req.params.menuId;
    getConnection((conn) => {
        const sql = `SELECT * FROM \`menu_option\` mo, \`option\` o WHERE mo.option_id=o.option_id AND menu_id=${menuId}`;
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