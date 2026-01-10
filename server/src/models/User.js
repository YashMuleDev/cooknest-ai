import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },

        email:{
            type: String,
            required: true,
            unique:true,
            lowercase: true,
        },

        password:{
            type: String,
            required: true, 
            minLength: 6,
            select: false,
        },

        role: { 
            type: String,
            enum:["user","admin"],
            default:"user",
        },

        prefrences:{
            diet: String,
            allergies:[String],
            budget: Number,
            health: String,
            cookingSkill: String,
        },
    },
    {timestamps: true}
);

//hashing the password to hide details before use
UserSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password, 10);
    next();
});

//Compare password method
UserSchema.methods.matchPassword = async function (enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);