// src/controllers/user.ts
import { Context } from 'koa';
import { powerData } from '../../localdata/powerScreen'
 
export default class powerController {
  public static async getPowerData(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
      code:ctx.status,
      data:(powerData as any)?.data || [],
      msg:'请求成功'
    };
  }
}