const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

// Import models below
require("./models/Post");
require("./models/Comment");

const app = require("./app");
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
