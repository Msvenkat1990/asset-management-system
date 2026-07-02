const express = require("express");
const session = require("express-session");
const ensureDatabase = require("./config/db-init");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "asset_secret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.set("view engine", "jade");
app.use(express.static("public"));

// Routes
app.use(require("./routes/employeeRoutes"));
app.use(require("./routes/categoryRoutes"));
app.use(require("./routes/assetRoutes"));
app.use(require("./routes/issueRoutes"));
app.use(require("./routes/returnRoutes"));
app.use(require("./routes/scrapRoutes"));
app.use(require("./routes/stockRoutes"));
app.use(require("./routes/historyRoutes"));

// START SERVER ONLY AFTER DB IS READY
ensureDatabase().then(() => {
  const sequelize = require("./config/database");

  sequelize
    .sync()
    .then(() => {
      console.log("Application Database Synced");

      app.listen(3000, () => {
        console.log("Application Server is running on port 3000");
      });
    })
    .catch((err) => {
      console.error("Application Sync error:", err);
    });
});
