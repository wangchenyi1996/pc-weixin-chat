/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-08 13:19:06
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-16 10:14:05
 */
var express = require('express');
var router = express.Router();
var axios = require('axios')

// 机器人聊天
router.get('/robot', function (req, res) {
  let datas = {
    key: 'free',
    appid: 0,
    msg: req.query.content
  };
  // http://api.qingyunke.com/api.php?key=free&appid=0&msg=你好
  axios.get('http://api.qingyunke.com/api.php', {
    params: datas
  })
    .then(function (response) {
      // console.log(response.data)
      return res.json(response.data)
    })
    .catch(function () {
      return res.json({
        "result": 500,
        "content": "机器人出问题了~~"
      })
    });
});

module.exports = router;
