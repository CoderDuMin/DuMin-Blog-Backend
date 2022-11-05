import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import {createConnection} from 'typeorm';
import 'reflect-metadata';
import jwt from'koa-jwt';
import 'reflect-metadata';

import { JWT_SECRET } from './constants';
import {logger} from './logger'
import {protectedRouter,authRouter} from './routes'

const koaStatic = require('koa-static')
const path = require('path')




createConnection().then(()=>{
  // 初始化 Koa 应用实例
  const app = new Koa();

  const staticPath = path.join(__dirname, '/upload') // 根目录
  app.use(koaStatic(staticPath))

  //日志中间件
  app.use(logger())
  // 注册中间件
  app.use(cors());
  app.use(bodyParser());



  // 无需校验token
  app.use(authRouter.routes()).use(authRouter.allowedMethods());

  // 注册 JWT 中间件
  app.use(jwt({ secret: JWT_SECRET })
  // .unless({ method: 'GET' })
  );
  // 需要校验token的路由
  app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

  // 运行服务器
  app.listen(5002,()=>{
    console.log('端口5002成功启动服务')
  });
})
.catch((err: string) => console.log('TypeORM connection error:', err))


