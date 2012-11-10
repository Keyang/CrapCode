var codeCol=require("../../../jpa").cols.code;

var ipTable={};

function likeDislike(param,cb){
    
}

function changeLike(hash,isLike,cb){
    codeCol.readByCol({hash:hash},function(err,res){
        if (err){
            cb(err);
        }else{
            if (!res.like){
                res.like=0;
            }
            if (isLike){
                res.like++;
            }else{
                res.like--;
            }
            codeCol.update(res,cb);
        }
    });
}

module.exports=likeDislike