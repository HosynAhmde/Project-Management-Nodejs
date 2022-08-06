const { body } = require("express-validator");
const { TeamModel } = require("../models/teams");

function createTeamValidator() {
  return [
    body("name").notEmpty().withMessage("نام نمیتواند خالی باشد."),
    body("description").notEmpty().withMessage("توضیحات نمیتواند خالی باشد."),
    body("username").custom(async (username) => {
      const regex = /^[a-z]+[a-z0-9\-\.]{3,}$/gim;
      if (regex.test(username)) {
        const team = await TeamModel.findOne({ username });
        if (team) throw "نام کاربری قبلا انتخاب شده است.";
        return true;
      }
      throw "نلم کاربری را به طور صحیح وارد کنید";
    }),
  ];
}

module.exports = createTeamValidator;
