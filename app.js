const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function validate(data) {
  if (!data.name) return "Name is required";
  if (!data.email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return "Email is invalid";
  if (!data.inquiry) return "Inquiry is required";
  return null;
}

app.post('/submit-inquiry', (req, res) => {
  const { name, email, inquiry } = req.body;
  const error = validate({ name, email, inquiry });
  if (error) {
    return res.status(406).json({
      status: 406,
      message: "Validation Error",
      error: error,
    });
  }

  res.status(200).json({
    status: 200,
    message: "Inquiry submitted successfully",
    data: { name, email, inquiry },
  });
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
