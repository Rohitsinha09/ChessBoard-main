const Chess_Model = require('../Models/Chess')

async function handleGenerateCode(req,res){
    try{
        const { nanoid } = await import('nanoid');
        const short_id = nanoid(5); 
        await Chess_Model.create({
            GameCode:short_id
        });
        return res.status(201).send(short_id); 
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: err.message || err,
            error: true
          });
    }
   
 
}
async function handleEnterCode(req,res){
    try{
        const EnterCode = await req.params.EnterCode;
    const details_Player = await Chess_Model.findOne({
        GameCode:EnterCode
    })
    if(!details_Player)  throw new Error("Invalid GameCode")
    return res.status(201).json({
        success: true,
        message: "Game Started",
        error: false
      });

    }
catch(err){
    return res.status(400).json({
        success: false,
        message: err.message || err,
        error: true
      });
}
  

}

module.exports = {handleGenerateCode,handleEnterCode}