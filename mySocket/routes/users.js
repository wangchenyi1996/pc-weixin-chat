const express = require('express');
const router = express.Router();
const md5 = require('md5');
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');

const multer = require('multer')
let storage = multer.diskStorage({
  destination: async (req, file, cb)=> {
    let day = sd.format(new Date(), 'YYYYMDD');
    let dir = path.join('public/uploads/',day);
    // 这是一个异步操作
    await mkdirp(dir);
    cb(null, dir)   // 上传前目录必须存在
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname);	 //获取文件的后缀名
    
    let filepath =  file.fieldname + extname
    cb(null, filepath)
  }
})

let upload = multer({ storage: storage })

let userModel = require('../db/schemas/users');

/**
 * 插入 单条数据 / 多条数据
 * params: data 可是是对象或者数组
 * 调用方式：insert({username:'张三', pwd: md5('123456'), email: '2825225@qq.com'})
 */
function insert(data) {
  return userModel.create(data)
}

/**
 * 查询
 * condition ：查询条件 可以使用正则表达式
 * options 表示 需要查找的字段 1需要展示 0不需要展示  没写的默认不查找
 * limit 可以用来分页
 */
function findAll(condition = {}, options = {}, limit = null) {
  return userModel.find(condition, options, limit)
}

/*
 *  查询单条数据 
 */
function findOne(whereStr) {
  return userModel.findOne(whereStr)
}

// 查找所有用户
router.get("/findUser", (req, res) => {
  findAll().then((data) => {
    // findAll({username:/王/},{ username:1,email:1,_id:0 }).then((data) => {
    // findAll({},{ username:1,email:1,_id:0 },{limit:3,skip:2}).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err);
  });
});

// 用户注册
router.post("/register", (req, res) => {
  console.log(req.body, 1111)
  let user = {
    username: req.body.username,
    pwd: md5(req.body.pwd),
    email: req.body.email,
    loginTime: new Date()
  }
  // 先判断用户是否存在
  findOne({ email: req.body.email })
    .then(result => {
      if (!result) {
        insert(user).then((data) => {
          // console.log('用户:', data);
          res.json({ code: 200, user: data, msg: '注册成功' })
        }).catch((err) => {
          console.log(err);
        });
      } else {
        res.json({
          code: 100,
          msg: '此邮箱已被占用'
        });
      }

    })
    .catch(err => {
      console.log('err:', err)
    })
});

// 用户登录
router.post("/login", (req, res) => {
  let user = {
    email: req.body.email,
    // pwd: md5(req.body.pwd)
  }
  findAll(user).then((data) => {
    let user = data[0]
    if (data.length > 0) {
      // 有这个用户，再去判断用户名 密码
      if (user.pwd !== md5(req.body.pwd)) {
        return res.json({ code: 100, msg: '密码错误' })
      }
      res.json({ code: 200, user, msg: '登录成功' })
    } else {
      res.json({ code: 100, msg: '不存在此用户' })
    }
  }).catch((err) => {
    console.log(err);
  });
});

// 更换头像（上传图片）
router.get('/upload', (req, res) => {
  res.render("upload");
})

router.post('/doUpload', upload.single('pic1'), (req, res, next) => {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  res.json(req.file)
  /**
   *  {
        fieldname: 'pic',
        originalname: 'vue.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'uploads/',
        filename: 'e2f5cecdaa7b1539a0f547e8be6cc9e6',
        path: 'uploads\\e2f5cecdaa7b1539a0f547e8be6cc9e6',
        size: 2828
      }
   */
})



//导出去暴露使用
module.exports = router;