function chekData(req, res, next) {
  try {
    let data = req.body;
    console.log(data.skills);
    const fields = ["first_name", "last_name", "skills"];
    const badValue = ["undefined", "NaN", "true", "false"];
    Object.entries(data).forEach(([key, vlaue]) => {
      if (!fields.includes(key)) delete data[key];
      if (badValue.includes(vlaue)) delete data[key];
    });
    req.body = data;
    let skills = data.skills;
    let result = [];
    skills.forEach((item) => {
      if (!badValue.includes(item)) {
        result.push(item);
      }
    });
    req.body.skills = result;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = chekData;
