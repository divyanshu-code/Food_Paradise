import jwt from 'jsonwebtoken'

const authMiddleware = (req , res , next)=>{

    const token = req.header('Authorization')?.replace('bearer ', '');
    if (!token) {
        return res.status(401).json({ success : false , message: 'authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        console.log(err);
        
        res.status(401).json({success : false , message: 'Token is not valid' });
    }

}

export default authMiddleware