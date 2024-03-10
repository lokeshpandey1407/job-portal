import nodeMailer from "nodemailer";
export const sendMailToApplicants = async (req, res, next) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "lokesh.pandey1407@gmail.com",
      pass: "tagfbblnbfvhcdmx",
    },
  });
  const mailOptions = {
    from: "lokesh.pandey1407@gmail.com",
    to: `${req.body.email}`,
    subject: "Acknowledgement of Your Application",
    text: `Dear ${req.body.name}

    I hope this email finds you well.
    
    I wanted to personally reach out to inform you that we have received your application for this position. We truly appreciate your interest in joining our team.
    
    Your application is currently under review, and we will carefully consider your qualifications and experience. We understand the time and effort it takes to apply for a position, and we want to assure you that we will give your application the attention it deserves.
    
    We will be in touch with you shortly to provide an update on the status of your application. In the meantime, if you have any questions or need further information, please feel free to reach out to us.
    
    Thank you once again for considering us as a potential employer. We appreciate your interest in joining our team.
    
    Best regards,
    Himanshu, CEO`,
  };

  //sending the mail
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("email sent successfully");
  } catch (err) {
    console.log(`Failed, Eamil cannot be sent because ${err} `);
  }
  next();
};
