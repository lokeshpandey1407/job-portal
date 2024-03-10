export default class HomeController {
  showHomePage(req, res) {
    res.render("home", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
    });
  }
}
