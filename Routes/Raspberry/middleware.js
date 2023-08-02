import { Raspberry, User } from "../../db/Sequelize.js"

export const verifyOwning = (req,res,next)=>{

    const rbpid = req.body.rbpid
    const userId = req.body.userId
    if(!rbpid || !userId){
        return res.status(404).json({msg : 'not found'})
    }
    User.findByPk(userId , {include : Raspberry}).then(user => {
        if(!user){
            return res.status(404).json({msg : 'user not found'})
        }
        console.log('req.user', req.user)
        if(req.user.userId !== userId){
            return res.status(406).json({msg : 'you are not allowed'})
        }

        if(req.user.rbpid !== user.Raspberry.id){
            return res.status(403).json({msg : 'you are not allowed, wrong ownership'})
        }
        
        next()
    }).catch(err => {
        return res.status(400).json({msg : 'something went wrong' , err})
    })
}