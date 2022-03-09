

const router = require('koa-router')()
const User = require('../models/userSchema')
const util = require('../utils/util')
const md5 = require('md5')

router.prefix('/users')


router.post('/login', async (ctx) => {
  try {
    const {userName, userPwd} = ctx.request.body;

    const res = await User.findOne({
      userName,
      userPwd: userPwd
    }, 'userId userName userEmail state role deptId roleList')

    if (res) {
      ctx.body = util.success(res)
    } else {
      ctx.body = util.fail('账号或密码不正确')
    }
  } catch(error) {
    ctx.body = util.fail(error)
  }
})


module.exports = router
