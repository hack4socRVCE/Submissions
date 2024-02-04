class HealthMonitoringSystem {
	constructor() {
		// Initialize thresholds for health parameters
		this.thresholds = {
			"Heart Rate": [60, 100],
			Systol: [90, 120],
			Diastol: [60, 80],
			"Respiratory Rate": [12, 20],
			"Body Temperature": [36.5, 37.5],
			"Oxygen Saturation": [95, 100],
			"Nutrient Intake": [1500, 3000],
			"Hydration Level": [80, 100],
			"Muscle Mass Index": [18, 25],
		};
	}

	generateSampleData(outOfRangeFrequency = 4) {
		// Generate random sample data within normal ranges
		const data = {
			"Heart Rate": this.getRandomInt(60, 100),
			Systol: this.getRandomInt(90, 120),
			Diastol: this.getRandomInt(60, 80),
			"Respiratory Rate": this.getRandomInt(12, 20),
			"Body Temperature": this.getRandomFloat(36.5, 37.5),
			"Oxygen Saturation": this.getRandomInt(95, 100),
			"Hydration Level": this.getRandomInt(80, 100),
			"Muscle Mass Index": this.getRandomFloat(18, 25),
		};

		// Introduce an out-of-range value every fourth generation
		if (Math.floor(Math.random() * outOfRangeFrequency) === 0) {
			const parameter = this.getRandomKey(this.thresholds);
			const [minThreshold, maxThreshold] = this.thresholds[parameter];
			const outOfRangeValue = this.getRandomFloat(
				minThreshold - 10,
				maxThreshold + 10,
			);
			data[parameter] = parseFloat(outOfRangeValue.toFixed(2));
		}

		return data;
	}

	monitorHealth(data) {
		// Check if each parameter is within the normal range
		for (const [parameter, value] of Object.entries(data)) {
			if (this.thresholds[parameter]) {
				const [minThreshold, maxThreshold] = this.thresholds[parameter];
				if (value < minThreshold || value > maxThreshold) {
					console.log(`Alert! ${parameter} out of normal range: ${value}`);
					data[
						`${parameter}_alert`
					] = `Alert! ${parameter} out of normal range: ${value}`;
				}
			}
		}
		return data;
	}

	run() {
		// setInterval(() => {
		// Simulate continuous monitoring by generating new data
		const healthData = this.generateSampleData();
		console.log("\nHealth Data:");
		for (const [parameter, value] of Object.entries(healthData)) {
			console.log(`${parameter}: ${value}`);
		}

		// Monitor the health parameters
		this.monitorHealth(healthData);
		return healthData;
		// }, 1000); // Pause for a while before the next data update (5 seconds)
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	getRandomKey(obj) {
		const keys = Object.keys(obj);
		return keys[Math.floor(Math.random() * keys.length)];
	}
}

const monitoringSystem = new HealthMonitoringSystem();

module.exports = HealthMonitoringSystem;
