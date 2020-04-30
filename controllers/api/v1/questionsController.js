const mongoose = require('mongoose');
const Question = require('../../../model/question');
const Option = require('../../../model/option');

//addQuestion Controller
module.exports.addQuestion = async function(req,res){

    try{
        let question = await Question.create(req.body);
        if(question){
        return  res.json({question, data:{"message": "Question Created Sucessfully!"}});
        }
    }catch(err){
        console.log('error in addQuestion controller->',err);
        return res.status(500).json({data:{
            message: "Internal Server Error"
            }
        });
    }
}

//view question controller
module.exports.viewQuestion= async function(req,res){

    try{
        let question= await Question.findById(req.params.id)
        .populate('options')

        return res.json({question:question});

    }catch(err){
        console.log('error in viewQuestion controller->',err);
        return res.status(500).json({data:{
            message: "Internal Server Error"
            }
        });
    }
    
}
  
//delete question controller
module.exports.delQuestion = async function(req,res){
        let question= await Question.findById(req.params.id);
        question.remove();
        await Option.deleteMany({question:req.params.id});
        
        return res.json({
            message: "Question with Options Deleted Sucessfully!",
        });
};