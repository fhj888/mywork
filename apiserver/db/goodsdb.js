var db = require("./dbconn");

let goodsSchema = new db.Schema({
    goodsid:String,
    goodsname:String,
    goodsprice:Number
})

let goodsModel = db.model("goods",goodsSchema);

module.exports = {
    addgoods:function(obj,fn){
        let goodsEntity = new goodsModel(obj);
        goodsEntity.save((err,data)=>{
            if(!err){
                console.log("添加成功");
                fn("success");
            }else{
                fn("fail");
            }
        });
    },
    //查询
    querygoods:function(queryObj,success,fail){
        goodsModel.find(queryObj,(err,data)=>{
            if(err){
                fail();
            }else{
                success(data);
                console.log(data);
            }
        });
    }
}