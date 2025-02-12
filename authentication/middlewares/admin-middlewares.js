const isAdminUser = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success:false,
            message:'Access denied! Admin rights required.'
        })
    }
    next()
}

//67ac21d1d431715b28d1a542

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FjMjFkMWQ0MzE3MTViMjhkMWE1NDIiLCJ1c2VybmFtZSI6InByYXNoYW50MjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5MzM0MTU0LCJleHAiOjE3MzkzMzUwNTR9.zCYgBpIhs8VmdCNl388d0MaAjSxaqTa-UMsX2FperIA
module.exports = isAdminUser