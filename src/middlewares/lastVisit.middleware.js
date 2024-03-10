export const setLastVisit = (req, res, next) => {
  if (req.cookies.currentVisit) {
    res.locals.lastVisit = new Date(req.cookies.currentVisit).toLocaleString();

    res.cookie("lastVisit", req.cookies.currentVisit, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};
