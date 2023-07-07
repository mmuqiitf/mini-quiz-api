const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

const corsOptions = {
	origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

require("./routes/auth")(app);
require("./routes/user")(app);
// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to mini quiz apps." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
