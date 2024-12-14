import mongoose from 'mongoose';

//schema : blue print for data object

// Define the user schema
const userSchema = new mongoose.Schema({
  _id:{
    type: Number,              
    required: true

  },
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"]
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true
    //validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false
  }
},{
  collection: 'users', // Specify the collection name if it's not plural of model name
  timestamps: true // Automatically adds createdAt and updatedAt fields

});

// Create the user model
//Collection : user, 
const UserModel = mongoose.model('user', userSchema);

export default UserModel;
