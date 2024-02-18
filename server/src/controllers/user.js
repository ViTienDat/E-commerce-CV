const User = require("../models/user")
const asyncHandler = require("express-async-handler")

const register = asyncHandler( async(req, res) => {
    const {name, email, mobile, password} = req.body
    if( !name || !email || !mobile || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing input"
        })
    }
    const response = await User.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        message: "register is success",
        data: response
    })
})

const login = asyncHandler( async(req, res) => {
    const {email, password} = req.body
    if(  !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing input"
        })
    }
    const response = await User.findOne()
    return res.status(200).json({
        success: response ? true : false,
        message: "register is success",
        data: response
    })
})

module.exports = {
    register,
    login
}