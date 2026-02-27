import {asyncHandler} from "../utils/asycHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler ( async (req, res) => {
   // get user details from frontend 
   // validation - not empty,correct format ,etc.
   // check if user already exist : by using email,usrename
   // check for images , check for avatar
   // upload them to cloudinary, avatar
   // create user object - create entry in DB
   // remove password and refresh token field frok response
   // check for user creation.
   // return response.


    // get user details from frontend 

  const{ fullName, email, username, password} =  req.body;
  console.log("Email : " , email);

    //to check all fields  are there

  if([fullName, email, username, password].some((field) => field?.trim() === ""))
  {
    throw new ApiError(400,"All fields are required")
  }

    // check if user already exist : by using email,usrename

  const existedUser = User.findOne({
    $or : [{username} , { eamil }]
  })

  if(existedUser){
    throw new ApiError(409, "User with this Email or Username ALREADY EXIST! ")
  }


  // check for images , check for avatar

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
 }


  // upload them to cloudinary, avatar

 const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverImage = await uploadOnCloudinary(coverImageLocalPath);

 if(!avatar){
    throw new ApiError(400, "Avatar file is required")
 }


    // create user object - create entry in DB

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage : coverImage?.url ||"",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"    // remove password and refresh token field frok response
    )

    if(!createdUser){
        throw new ApiError(500,"Something went Wrong while registering the user")
    }

       // return response.

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registerd Successfully")
    )
    






} )


export {registerUser}