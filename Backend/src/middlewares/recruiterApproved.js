const recruiterApporved = (req,res,next) => {
    if(req.user.role !== "recruiter"){
        return res.status(401).json({message: "Only recuiter can access this"})
    }
    if(!req.user.isApproved){
        return res.status(401).json({message: "Recruiter not approved yet"})
    }
    next()
}

module.exports = recruiterApporved