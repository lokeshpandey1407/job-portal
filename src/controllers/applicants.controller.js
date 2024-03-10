import JobsModel from "../models/jobs.model.js";
export default class ApplicantsController {
  getApplicantsPage(req, res) {
    let id = req.params.id;
    let applicants = JobsModel.getApplicants(id);
    res.render("applicants", {
      applicants: applicants,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
    });
  }
}
