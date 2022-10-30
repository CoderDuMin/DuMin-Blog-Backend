// src/controllers/user.ts
import { Context } from 'koa';
import {getManager} from 'typeorm'
import {Category} from '../../entity/category'
 
export default class CategoryController {
  //获取分类列表
  public static async getCategoryList(ctx: Context) {
    const categoryRepository = getManager().getRepository(Category);
    const categoryList = (await categoryRepository.find({where:{status:0}}))
    ctx.status = 200;
    ctx.body = {
      code:ctx.status,
      data:categoryList,
      total:categoryList.length,
      msg:'请求成功'
    };
  }

  // 删除分类
  public static async deleteCategory(ctx: Context) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne({where:{status:0,id:ctx.params.id}});
    if(!category){
      ctx.status = 400
      ctx.body = {
        msg:'没有找到该分类'
      }
    }
    else{
      await categoryRepository.update({id:ctx.params.id},{status:1})
      ctx.body = {
        code:'A0001',
        data:'',
        msg:'删除分类成功'
      }
    }
    
  }

  // 新增分类列表
  public static async addCategory(ctx: Context) {
    const categoryRepository = getManager().getRepository(Category);
    const params = ctx.request.body
    const newCategory = new Category()
    newCategory.type = params.type
    newCategory.status = 0
    const res = await categoryRepository.insert(newCategory);
    ctx.status = 200
    ctx.body = {
      code:'A0001',
      data:'',
      msg:'添加分类成功'
    }
  }
}