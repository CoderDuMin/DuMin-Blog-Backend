import Router from '@koa/router';
 
import powerController from '../../controllers/powerscreen';

const powerRouter = new Router();
powerRouter.prefix('/api') 
 
// dream 相关的路由
powerRouter.get('/powerScreen/allData', powerController.getPowerData);

export {
  powerRouter
}