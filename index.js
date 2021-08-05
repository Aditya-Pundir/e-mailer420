const app = require("express")();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const { sender } = req.query;
  const { password } = req.query;
  const { receiver } = req.query;
  const { subject } = req.query;
  const { body } = req.query;

  var transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    auth: {
      user: sender,
      pass: password,
    },
  });

  var mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
  res.send("Email has been sent to " + receiver);
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
