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
        "1//04auaONy5fYSZCgYIARAAGAQSNwF-L9IrGvxZpUSEf7grGGNkEZ_PYe0SkntzFApppJQ3gR-frY6551edDQagq6KrIXnSPrnaDCs",
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
