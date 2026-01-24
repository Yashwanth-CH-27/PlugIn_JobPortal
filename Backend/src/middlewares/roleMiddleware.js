const restrictTo = (...role) => {
    return (req, res, next) => {
        if(!req.user || !role.includes(req.user.role)){
            res.status(401).json({message: "Access Denied"})
        }
        next()
    }
}

module.exports = restrictTo