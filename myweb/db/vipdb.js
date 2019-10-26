//此模块处理vips的增删改查
var db = require("./conndb");

//1、创建模板
let vipSchema = new db.Schema({
    username:String,
    userpass:String
})

//2、创建模型（把模板和集合进行对应，建立通道）
let vipModel = db.model("loges",vipSchema);

module.exports = {
    addVip:function(obj,fn){
        //创建实体
        let vipEntity = new vipModel(obj);
        //用save函数，把实体存储到数据库中
        vipEntity.save((err,data)=>{
            if(!err){
                console.log("添加成功！");
                // console.log(data);
                fn(1);
            }else{
                fn(0);
            }
        });
    },

    //查询
    queryVip:function(queryObj,success,fail){
        vipModel.find(queryObj,(err,data)=>{
            if(err){
                fail();
            }else{
                console.log(data);
                success(data);
            }
        })
    }
    
}

















