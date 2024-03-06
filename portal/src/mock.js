import Mock from 'mockjs';

Mock.mock('/#/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);

  // 假设用户名为 'jackson'，密码为 'Solution@123' 时登录成功

  if (username === 'jackson' && password === 'Solution@123') {
    return Mock.mock({
      isSuccess: true,
      data: {
        accessToken: Mock.Random.guid()
      }
    });
  } else {
    return Mock.mock({
      isSuccess: false,
      message: '用户名或密码错误'
    });
  }
});

// 模拟路由跳转
Mock.mock('/#/home', 'get', {
  isSuccess: true,
  message: '成功跳转到首页'
});
