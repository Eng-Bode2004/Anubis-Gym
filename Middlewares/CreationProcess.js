module.exports = function validateRoleCreation(req, res, next) {

    const {name,description,imageUrl}= req.body;

    if(!name){
        return res.status(400).json({
            message:"Name is required",
            status:400,
        });
    }


    if(!description){
        return res.status(400).json({
            message:"Description is required",
        })
    }

    if(!imageUrl){
        return res.status(400).json({
            message:"Image is required",
        })
    }


    next();
}