import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true,
    unique:true,
  },
  image:{
    type:String,
    default:'https://tse4.explicit.bing.net/th?id=OIP.H0GEkaOcnGd6TV3UKrKZPgHaE7&pid=Api&P=0&h=180',
  },
  category:{
    type:String,
    default:'uncategorized'
  },
  slug:{
    type:String,
    required:true,
    unique:true,
  },

},{timestamps:true})

const Post = mongoose.model('Post',postSchema)
export default Post