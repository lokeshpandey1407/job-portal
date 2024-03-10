import ApplicantModel from "./applicants.model.js";

export default class JobsModel {
  constructor(
    id,
    company,
    role,
    profile,
    location,
    locationType,
    jobType,
    minSalary,
    maxSalary,
    numberOfOpenings,
    lastDateOfApplication,
    applicants,
    technologies,
    postedDate
  ) {
    this.id = id;
    this.company = company;
    this.role = role;
    this.profile = profile;
    this.location = location;
    this.locationType = locationType;
    this.jobType = jobType;
    this.minSalary = minSalary;
    this.maxSalary = maxSalary;
    this.numberOfOpenings = numberOfOpenings;
    this.lastDateOfApplication = lastDateOfApplication;
    this.applicants = applicants;
    this.technologies = technologies;
    this.postedDate = postedDate;
  }

  static getAllJobs() {
    return jobs;
  }

  static getJobDetails(id) {
    let job = jobs.find((job) => {
      return job.id == id;
    });
    return job;
  }

  static getJobById(id) {
    let job = jobs.find((job) => {
      return job.id == id;
    });
    return job;
  }

  static postNewJob(jobDetails) {
    let id = jobs.length + 1;
    let applicants = [];
    if (typeof jobDetails.technologies == "string") {
      jobDetails.technologies = [jobDetails.technologies];
    }
    let newJob = new JobsModel(
      id,
      jobDetails.company,
      jobDetails.role,
      jobDetails.profile,
      jobDetails.location,
      jobDetails.locationType,
      jobDetails.jobType,
      jobDetails.minSalary,
      jobDetails.maxSalary,
      jobDetails.numberOfOpenings,
      jobDetails.lastDateOfApplication,
      applicants,
      jobDetails.technologies,
      jobDetails.postedDate
    );
    jobs.push(newJob);
  }

  static getUpdateJob(id) {
    let job = jobs.find((job) => {
      return job.id == id;
    });
    return job;
  }

  static postUpdateJob(data) {
    let { id, technologies } = data;
    if (typeof technologies == "string") {
      data.technologies = [technologies];
    }
    let index = jobs.findIndex((job) => job.id == id);
    let applicants = jobs[index].applicants;
    data.applicants = applicants;
    jobs[index] = data;
  }

  static postApply(id, name, email, contact, docUrl) {
    let index = jobs.findIndex((job) => {
      return job.id == id;
    });
    let applicantId = jobs[index].applicants.length + 1;
    let applicantObj = new ApplicantModel(
      applicantId,
      name,
      email,
      contact,
      docUrl
    );
    let job = jobs[index];
    job.applicants.push(applicantObj);
    jobs[index] = job;
  }

  static getApplicants(id) {
    let job = jobs.find((job) => job.id == id);
    return job.applicants;
  }
  static searchJobs(query) {
    query = query.toLowerCase();
    const result = jobs.filter((job) =>
      job.profile.toLowerCase().startsWith(query)
    );
    return result;
  }
  static deleteJob(id) {
    let index = jobs.findIndex((job) => job.id == id);
    jobs.splice(index, 1);
  }
}
const jobs = [
  {
    id: 1,
    company: "Coding ninja",
    role: "Non-Tech",
    profile: "IT trainer",
    location: "Pune",
    locationType: "On - site",
    jobType: "Full time",
    minSalary: 10,
    maxSalary: 15,
    numberOfOpenings: 5,
    lastDateOfApplication: "2024-06-02",
    applicants: [],
    technologies: ["SQL", "NodeJs", "Vue.js"],
    postedDate: "2024-06-02",
  },
  {
    id: 2,
    company: "Coding ninja",
    role: "Tech",
    profile: "Game developer",
    location: "Mumbai",
    locationType: "Remote",
    jobType: "Full time",
    minSalary: 10,
    maxSalary: 15,
    numberOfOpenings: 5,
    lastDateOfApplication: "2024-06-02",
    applicants: [],
    technologies: ["JavaScript", "NodeJs", "HTML", "CSS", "MongoDB", "Express"],
    postedDate: "2024-06-02",
  },
  {
    id: 3,
    company: "Coding ninja",
    role: "Tech",
    profile: "Web developer",
    location: "Bangalore",
    locationType: "Work from home",
    jobType: "Full time",
    minSalary: 10,
    maxSalary: 15,
    numberOfOpenings: 5,
    lastDateOfApplication: "2024-06-02",
    applicants: [],
    technologies: ["React", "NodeJs", "MongoDB"],
    postedDate: "2024-06-02",
  },
];
