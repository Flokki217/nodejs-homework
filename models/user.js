const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const subscriptionEnum = ["starter", "pro", "business"];
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionEnum,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailRegexp),
  subscription: Joi.string()
    .default("starter")
    .valid(...subscriptionEnum),
  token: Joi.string().default(null),
});

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailRegexp),
  token: Joi.string().default(null),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = { schemas, User };
