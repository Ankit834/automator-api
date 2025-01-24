require('dotenv').config();

const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const mongoose = require('mongoose');
const Script = require('./models/script.model.js');
const scriptRoute = require('./routes/script.route.js');
const app = express();

const port = process.env.PORT || 3002;

app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/scripts', scriptRoute);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Updated');
});

// Endpoint to execute recorded scripts
app.post('/execute-script', async (req, res) => {
  const { url, recordedEvents } = req.body;
  console.log('ANKIT: check', url, recordedEvents);

  if (!url || !Array.isArray(recordedEvents)) {
    return res.status(400).send({
      error: "Invalid request. 'url' and 'recordedEvents' are required.",
    });
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: false, // Set to false to see browser actions
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Replay the recorded events
    for (const event of recordedEvents) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await replayEvent(page, event);
    }

    await browser.close();
    res.send({ status: 'success', message: 'Script executed successfully.' });
  } catch (error) {
    console.error('Error executing script:', error);
    res.status(500).send({ status: 'error', message: error.message });
  }
});

const getSelector = (step) => {
  if (step.testId) {
    return `[data-testid=${step.testId}]`;
  }
  if (step.id) {
    return `#${step.id}`;
  }
  if (step.target) {
    return step.target;
  }
  if (step.className) {
    return `${step.className}`;
  }

  return null;
};

// Function to replay events
const replayEvent = async (page, event) => {
  const { type, value } = event;

  const selector = getSelector(event);

  // Wait for the element to be available
  await page.waitForSelector(selector, { timeout: 5000 });

  switch (type) {
    case 'click':
      await page.click(selector);
      break;

    case 'input':
      await page.$eval(
        selector,
        (input, text) => {
          input.value = text; // Set the input value directly
          input.dispatchEvent(new Event('input', { bubbles: true })); // Optional: trigger event
        },
        value || ''
      );
      break;

    default:
      console.warn(`Event type "${type}" is not supported.`);
  }
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log('Connection failed!');
  });
