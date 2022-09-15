import { doSignup, doLogin } from "./userControllers.js";

export const signup = (req, res) => {
  doSignup(req.body)
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json(err);
    });
};

export const signin = (req, res) => {
  doLogin(req.body)
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json(err);
    });
};
