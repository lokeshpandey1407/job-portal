export const setCurrentVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  } else {
    res.cookie("lastVisit", null, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
  }

  res.cookie("currentVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  req.session.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  next();
};
