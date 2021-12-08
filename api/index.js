var express = require('express');
var cors = require('cors')
var app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 

/**
 * validate the incoming req Body
 */
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res
    .status(400)
    .json({ status: 0, message: "put a valid request body" }); // Bad request
    }

   });


var categoryRouter = require('./routes/category.route');

app.use('/api/v1/category', categoryRouter);

app.use((req, res, next) => {
  res.status("404").json({
    status: 0,
    message: "404 No routes found",
  });
});

var env = require('./cred/env');
module.exports = app
