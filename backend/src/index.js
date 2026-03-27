require("dotenv").config();
const { createApp } = require("./app");

const PORT = process.env.PORT || 4000;

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] listening on :${PORT}`);
});

