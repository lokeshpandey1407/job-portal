import JobsModel from "../models/jobs.model.js";
import { jobProfiles, jobSkills } from "../../public/json/job-data.js";
export default class JobsController {
  showJobsPage(req, res) {
    let jobs = JobsModel.getAllJobs();
    res.render("jobs", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
    });
  }

  getJobDetailsPage(req, res) {
    const job = JobsModel.getJobDetails(req.params.id);
    if (job) {
      res.render("job-details", {
        job: job,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
        lastVisit: req.session.lastVisit,
      });
    } else {
      res.send("Job is not available");
    }
  }

  getPostNewJobPage(req, res) {
    res.render("new-job", {
      errorMessages: null,
      jobProfile: jobProfiles,
      jobSkills: jobSkills,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
      errorMessages: [],
    });
  }

  postNewJob(req, res) {
    let formData = req.body;
    JobsModel.postNewJob(formData);
    let jobs = JobsModel.getAllJobs();
    res.redirect("/jobs");
  }

  getUpdateJobPage(req, res) {
    let id = req.params.id;
    const job = JobsModel.getUpdateJob(id);
    if (job) {
      res.render("update-job", {
        job: job,
        jobProfile: jobProfiles,
        jobSkills: jobSkills,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
        lastVisit: req.session.lastVisit,
        errorMessages: [],
      });
    } else {
      res.send("Job not find, Please try again later");
    }
  }

  postUpdateJobData(req, res) {
    const data = req.body;
    JobsModel.postUpdateJob(data);
    res.redirect("/jobs");
  }

  deleteJob(req, res) {
    let id = req.params.id;
    let job = JobsModel.getJobById(id);
    if (!job) {
      return res
        .status(401)
        .send("Product not found, Please try again with different products");
    }
    JobsModel.deleteJob(id);
    res.redirect("/jobs");
  }

  postJobApply(req, res) {
    const { id, name, email, contact } = req.body;
    const docUrl = "documents/" + req.file.filename;
    JobsModel.postApply(id, name, email, contact, docUrl);
    res.redirect("/jobs");
  }

  searchJob(req, res) {
    const query = req.query.query;
    let searchResults = JobsModel.searchJobs(query);
    res.render("jobs", {
      jobs: searchResults,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
    });
  }
}
