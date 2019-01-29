const swag = require ('./../models/swag')

module.exports={
    add:(req,res,next)=>{
        let {id} = req.query
        let index = req.session.user.cart.findIndex((item)=>{
            return item.id==id
        })
        if(index!==-1){
            res.status(200).send(req.session.user)
        }
        else{
            req.session.user.cart.push(swag[id])
            req.session.user.total+=swag[id].price
            res.status(200).send(req.session.user)
        }
    },
    delete:(req,res,next)=>{
        let {id} = req.query;
        let index = req.session.user.cart.findIndex((item,i)=>{
            return item.id==id
        })
        if(index!==-1){
            res.status(200).send(req.session.user)
        }
        else{
            req.session.user.cart.splice(index,1)
            req.session.user.total-=swag[id].price
            res.status(200).send(req.session.user)
        }
    },
    checkout:(req,res,next)=>{
        req.session.user.cart=[];
        req.session.user.total=0;
        res.status(200).send(req.session.user)
    }
}