// src/routes.ts
import Router from '@koa/router';
import  Multer from 'koa-multer'
const fs=require("fs")
const path=require("path")

const uploadRouter = new Router();
let storage=Multer.diskStorage({
  destination:function(req:any,file:any,cb:any){
      cb(null,"src/upload")
  },
  filename:function(req:any,file:any,cb:any){
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
let upload=Multer({storage:storage})



uploadRouter.post("/upload/image",upload.single("image"),async (ctx:any,filename:any)=>{
  console.log("ctx.req:",ctx.req)
  ctx.body={
     errno:0,
     msg:"上传成功",
     data:{
       filename:ctx.req.file.filename
     }
  }
})

 
export {
  uploadRouter
}