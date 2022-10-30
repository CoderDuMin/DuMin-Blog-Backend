import Router from '@koa/router';
 
import articleController from '../../controllers/article';

const articleRouter = new Router();
 
// article 相关的路由
articleRouter.get('/article/publiclist', articleController.getArticleListByPage);
articleRouter.get('/article/selflist', articleController.getArticleSelfByPage);
articleRouter.get('/article/detail/:id', articleController.showArticleDetail);
articleRouter.post('/article/add', articleController.addArticle);
articleRouter.put('/article/update/:id', articleController.updateArticle);
articleRouter.delete('/article/delete/:id', articleController.deleteArticle);
articleRouter.post('/article/changePublic/:id', articleController.changeArticlePublic);

export {
  articleRouter
}