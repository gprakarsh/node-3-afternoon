const swag = require('./../models/swag')

module.exports={
    read:(req,res,next)=>{
        let {category} = req.query
        if(!category){
            res.status(200).send(swag)
        }
        else{
            let newArr = swag.filter((swag)=>{
                return swag.category===category
            })
            res.status(200).send(newArr)
        }
    }
}