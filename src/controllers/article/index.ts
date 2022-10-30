// src/controllers/user.ts
import { Context } from 'koa';
import {getManager} from 'typeorm'
import {Article} from '../../entity/article'
 
export default class ArticleController {
  public static async getArticleListByPage(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const total = (await articleRepository.find({where:{status:0,isPublic:0}})).length
    const articles = await articleRepository.find({where:{status:0,isPublic:0},skip:ctx.request.query.pageNum,take:ctx.request.query.pageSize});
    console.log(ctx.request.query)
 
    ctx.status = 200;
    ctx.body = {
      code:ctx.status,
      data:articles,
      total:total,
      msg:'请求成功'
    };
  }
  // 查询自己发布的
  public static async getArticleSelfByPage(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const total = (await articleRepository.find({where:{status:0,userId:ctx.state.user.id}})).length
    const articles = await articleRepository.find({where:{status:0,userId:ctx.state.user.id},skip:ctx.request.query.pageNum,take:ctx.request.query.pageSize});
 
    ctx.status = 200;
    ctx.body = {
      code:ctx.status,
      data:articles,
      total:total,
      msg:'请求成功'
    };
  }
  // 显示文章详情
  public static async showArticleDetail(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const article = await articleRepository.findOne({where:{status:0,id:ctx.params.id}});
    if(!article){
      ctx.status = 400
      ctx.body = {
        msg:'没有找到该文章'
      }
    }else{
      ctx.status = 200
      ctx.body = {
        code:'A0001',
        data:article,
        msg:'请求成功'
      }
    }
  }
  // 更新文章
  public static async updateArticle(ctx: Context) {
    const params = ctx.request.body
    const articleRepository = getManager().getRepository(Article);
    const dream = await articleRepository.findOne({where:{status:0,id:params.id}});
    if(!dream){
      ctx.status = 400
      ctx.body = {
        msg:'没有找到该文章'
      }
    }else if(dream.userId !== +ctx.state.user.id){
      ctx.status = 403
      ctx.body = {
        msg:'没有权限修改该文章'
      }
    }else{
      
      await articleRepository.update({id:params.id},{
        title:params.title,
        editTime:new Date(),
        content:params.content,
        type:params.type,
        keywords:params.keywords
      })
      ctx.status = 200
      ctx.body = {
        code:'A0001',
        data:'',
        msg:'修改成功'
      }
    }
  }
 
  public static async deleteArticle(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const article = await articleRepository.findOne({where:{status:0,id:ctx.params.id}});
    if(!article){
      ctx.status = 400
      ctx.body = {
        msg:'没有找到该文章'
      }
    }else if(article.userId !== +ctx.state.user.id){
      ctx.status = 403
      ctx.body = {
        msg:'没有权限删除该文章'
      }
    }else{
      await articleRepository.update({id:ctx.params.id},{status:1})
      ctx.body = {
        code:'A0001',
        data:'',
        msg:'删除成功'
      }
    }
    
  }

  public static async addArticle(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const params = ctx.request.body
    const newArticle = new Article()
    newArticle.createTime = new Date()
    newArticle.content = params.content
    newArticle.title = params.title
    newArticle.type = params.type || 0
    newArticle.isPublic = params.isPublic || 0
    newArticle.userId = ctx.state.user.id
    newArticle.status = 0
    newArticle.keywords = params.keywords
    const res = await articleRepository.insert(newArticle);
    ctx.status = 200
    ctx.body = {
      code:'A0001',
      data:'',
      msg:'添加文章成功'
    }
  }

  public static async changeArticlePublic(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const article = await articleRepository.findOne({where:{status:0,id:ctx.params.id}});
    if(!article){
      ctx.status = 400
      ctx.body = {
        msg:'没有找到该文章'
      }
    }else if(article.userId !== +ctx.state.user.id){
      ctx.status = 403
      ctx.body = {
        msg:'没有权限修改该文章'
      }
    }else{
      await articleRepository.update({id:ctx.params.id},{
        isPublic:article.isPublic == 0 ? 1 : 0
      })
      ctx.status = 200
      ctx.body = {
        code:'A0001',
        data:'',
        msg:'修改公开状态成功'
      }
    }
  }

}