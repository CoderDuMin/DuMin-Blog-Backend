import Router from '@koa/router';
 
import CategoryController from '../../controllers/category';

const categoryRouter = new Router();
 
// dream 相关的路由
categoryRouter.get('/category/list', CategoryController.getCategoryList);
categoryRouter.post('/category/add', CategoryController.addCategory);
categoryRouter.delete('/category/delete/:id', CategoryController.deleteCategory);

export {
  categoryRouter
}