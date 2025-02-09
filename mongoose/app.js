const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { Schema } = mongoose;

dotenv.config();

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    // Create a new Document

    // const newUser = await User.create({
    //   name: "Prashant",
    //   email: "email@gmail.com",
    //   age: 25,
    //   isActive: true,
    //   tags: ['developer','designer','manager'],
      
    // });

    const newUser = new User({
        name: "update User",
        email: "update@gmail.com",
        age: 55,
        isActive: true,
        tags: ['developer'],
        
      });

      await newUser.save()

      const getLastCreatedUser = await User.findById(newUser._id)

      console.log(getLastCreatedUser,"getLastCreatedUser")

    // const allusers = await User.find({})
    // console.log(allusers)

    // const inactiveUsers = await User.find({isActive:true})
    // console.log(inactiveUsers,'inactive')

    // const firstUser = await User.findOne({name:'John Doe'})
    // console.log(firstUser)

    // const selectedFields = await User.find().select('name email -_id')
    // console.log(selectedFields,"selectFields")

    // const limitedUsers = await User.find().limit(5).skip(1);
    // console.log(limitedUsers,"limitedUsers")

    // const sortedUsers = await User.find().sort({age:1})
    // console.log(sortedUsers,"sortedUsers")

    // const countDocuments = await User.countDocuments({isActive:true})

    // console.log(countDocuments,"count documents")

    // const deleteUser = await User.findByIdAndDelete(newUser._id);
    // console.log("delete user ->",deleteUser);

    const updatedUser = await User.findByIdAndUpdate(newUser._id,{
        $set:{age:100},$push:{tags:'updated'}
    },{new:true})
    console.log(updatedUser,"UpdatedUser")
  } catch (error) {
    console.log("error", error);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
