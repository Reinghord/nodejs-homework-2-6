const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT } = require("./configs");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
    process.exit(1);
  });
