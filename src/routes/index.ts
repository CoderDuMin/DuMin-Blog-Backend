// src/routes.ts
import Router from '@koa/router';

import { authRouter } from './auth'
import { userRouter } from './user';
import { categoryRouter } from './category';
import { articleRouter } from './article';
import { uploadRouter } from './upload';
import { powerRouter } from './article'

const protectedRouter = new Router();

protectedRouter.prefix('/api')
// users 相关的路由
protectedRouter.use(userRouter.routes()).use(userRouter.allowedMethods())
// category 相关的路由
protectedRouter.use(categoryRouter.routes()).use(categoryRouter.allowedMethods())
// article 相关的路由
protectedRouter.use(articleRouter.routes()).use(articleRouter.allowedMethods())
// 文件上传
protectedRouter.use(uploadRouter.routes()).use(uploadRouter.allowedMethods())

export { protectedRouter, authRouter };