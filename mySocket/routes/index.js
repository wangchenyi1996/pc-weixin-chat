var express = require('express');
var router = express.Router();
var axios = require('axios')

const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

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



// 更换头像（上传图片）
router.get('/upload',(req,res) => {
  res.render("upload");
})

// 上传单张
// router.post('/doUpload',upload.single('pic'),(req,res,next) => {
//   // req.file 是 `avatar` 文件的信息
//   // req.body 将具有文本域数据，如果存在的话
//   res.json(req.file)
//   /**
//    *  {
//         fieldname: 'pic',
//         originalname: 'vue.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: 'uploads/',
//         filename: 'e2f5cecdaa7b1539a0f547e8be6cc9e6',
//         path: 'uploads\\e2f5cecdaa7b1539a0f547e8be6cc9e6',
//         size: 2828
//       }
//    */
// })

// 上传多张
var cpUpload = upload.fields([{ name: 'pic1', maxCount: 1 }, { name: 'pic2', maxCount: 1 }])
router.post('/doUpload', cpUpload, function (req, res, next) {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  console.log( req.files)
})

module.exports = router;
