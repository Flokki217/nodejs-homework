const app = require("./app");

app.listen(3000, () => {
  const message = "Hello yo "
  console.log("Server running. Use our API on port: 3000");
  console.log(message)
});
