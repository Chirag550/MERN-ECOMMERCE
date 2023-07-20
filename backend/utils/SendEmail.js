const nodemailer = require("nodemailer");

const SendMail = async (options) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "chiragmunjal550@gmail.com",
      pass: "903433Rs@",
      clientId:
        "238216196348-cmvrggrnrt0bvls34sl8mjibv8dd2r1t.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04s-o7BKfLoZJCgYIARAAGAQSNwF-L9IrvXuab1LrjiGXjI3MaK1vYkQpbLzW4hyzOAWxwjiZn9d-GM1_c4hEtXYdSCH8I-f-mxY",
    },
  });

  let mailDetails = {
    from: "chiragmunjal550@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.Message,
  };
  await mailTransporter.sendMail(mailDetails);
};

module.exports = SendMail;
