import { body, validationResult } from "express-validator";
import { jobProfiles, jobSkills } from "../../public/json/job-data.js";

export const jobUpdationValidation = async (req, res, next) => {
  const rules = [
    body("minSalary")
      .isFloat({ gt: 0 })
      .withMessage("Min salary should be a positive number"),
    body("maxSalary")
      .custom((value, { req }) => {
        const minSalary = parseFloat(req.body.minSalary);
        const maxSalary = parseFloat(value);
        if (!isNaN(minSalary) && !isNaN(maxSalary)) {
          return maxSalary > minSalary;
        }
        return false;
      })
      .withMessage("Max salary should be greater than min Salary"),
    body("numberOfOpenings")
      .isFloat({ gt: 0 })
      .withMessage("Number of openings should be greater than 0"),
    body("lastDateOfApplication")
      .isDate()
      .withMessage("Number of openings should be greater than 0"),
    body("technologies").custom((value, { req }) => {
      if (req.body.technologies.length > 0) {
        return true;
      } else throw new Error("Please selecte at least 1 Skill for the job");
    }),
    body("postedDate").isDate().withMessage("Posted Date should be valid"),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors.errors);
    return res.render("update-job", {
      errorMessages: validationErrors.errors,
      jobProfile: jobProfiles,
      jobSkills: jobSkills,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      lastVisit: req.session.lastVisit,
    });
  }
  next();
};
