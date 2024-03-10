import UserModel from "../models/users.model.js";
export default class UserController {
  getLoginPage(req, res) {
    res.render("login", { errorMessage: null });
  }

  getRegisterPage(req, res) {
    res.render("register", {
      errorMessages: [],
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
    });
  }

  postUserRegister(req, res) {
    const data = req.body;
    UserModel.addUser(data);
    res.redirect("/login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    let user = UserModel.isValidUser(email, password);
    if (!user) {
      return res
        .status(500)
        .render("login", { errorMessage: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    req.session.userName = user.name;
    res.status(200).redirect("/jobs");
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
}
