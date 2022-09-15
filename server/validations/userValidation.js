import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const signupValidation = (data) => {
  const Schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return Schema.validate(data);
};
