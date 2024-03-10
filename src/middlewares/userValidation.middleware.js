import { body, validationResult } from "express-validator";

export const userValidation = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("User name cannot be empty"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must contain one capital letter, one number and one special character"
      ),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log(validationErrors.errors);
    return res.render("register", {
      errorMessages: validationErrors.errors,
    });
  }
  next();
};
