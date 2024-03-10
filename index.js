import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import HomeController from "./src/controllers/home.controller.js";
import JobsController from "./src/controllers/jobs.controller.js";
import { jobCreationValidation } from "./src/middlewares/jobValidation.middleware.js";
import { jobUpdationValidation } from "./src/middlewares/jobUpdation.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import ErrorController from "./src/controllers/error.controller.js";
import { userValidation } from "./src/middlewares/userValidation.middleware.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
import ApplicantsController from "./src/controllers/applicants.controller.js";
import { sendMailToApplicants } from "./src/middlewares/sendMail.middleWare.js";
import { setCurrentVisit } from "./src/middlewares/currentVisit.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
const app = express();

//setting up express session
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//controllers
const homeController = new HomeController();
const jobsController = new JobsController();
const userController = new UserController();
const errorController = new ErrorController();
const applicantsController = new ApplicantsController();

//setting static files
app.use(express.static("public"));

//configure templeate engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve("src", "views")));

//configure url encoded data
app.use(express.urlencoded({ extended: true }));

//setting up cookie parser
app.use(cookieParser());

//configure ejs layouts
app.use(expressEjsLayouts);

//home route
app.get("/", homeController.showHomePage);

//job route
app.get("/jobs", jobsController.showJobsPage);
app.get("/job-details/:id", jobsController.getJobDetailsPage);
app.get("/new-job", auth, jobsController.getPostNewJobPage);
app.post("/new-job", auth, jobCreationValidation, jobsController.postNewJob);
app.get("/update-job/:id", auth, jobsController.getUpdateJobPage);
app.post(
  "/update-job",
  auth,
  jobUpdationValidation,
  jobsController.postUpdateJobData
);
app.post("/delete/:id", jobsController.deleteJob);

//user route
app.get("/login", userController.getLoginPage);
app.post("/login", setCurrentVisit, userController.postLogin);
app.get("/register", userController.getRegisterPage);
app.post("/register", userValidation, userController.postUserRegister);

//job apply route
app.post(
  "/apply",
  uploadFile,
  sendMailToApplicants,
  jobsController.postJobApply
);

//show applicants route
app.get("/job-details/applicants/:id", applicantsController.getApplicantsPage);

//show search result route
app.get("/search-jobs", jobsController.searchJob);

//logout route
app.get("/logout", setLastVisit, userController.logout);

//error page route
app.get("/404Error", errorController.showErrorPage);
app.listen(3001, () => {
  console.log("Application is listening at port 3001");
});
