const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const movieRouter = require("./routes/movie");
const cors = require('cors');

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", movieRouter);
app.use("/movies", movieRouter);
app.use("/movie", movieRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(config.PORT, () => {
  console.log(`Server is running at port ${config.PORT}`);
})