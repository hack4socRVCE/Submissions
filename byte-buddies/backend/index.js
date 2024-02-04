const express = require("express");
const app = express();
const cors = require("cors");
const HealthMonitoringSystem = require("./val.js");

app.use(cors());
app.use(express.static("public"));

app.get("/events", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	const a = new HealthMonitoringSystem();

	// Send data to the client every 3 seconds

	const intervalId = setInterval(() => {
		const data = { message: "This is a message from the server." };
		const randomArray = Array.from({ length: 7 }, () =>
			getRandomNumber(1, 100),
		);
		const data1 = a.run();
		const i = a.monitorHealth(data1);

		res.write(`data: ${JSON.stringify(i)}\n\n`);
	}, 2000); // Send data every 1 second

	// Close the connection after 5 minutes (300,000 milliseconds)
	setTimeout(() => {
		clearInterval(intervalId);
		res.end();
	}, 500000);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
