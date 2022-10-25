export default {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/jumia",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  FLUTTERWAVE_PUB:
    process.env.FLUTTERWAVE_PUB ||
    "FLWPUBK_TEST-c51eddb9e7b72e6b027d1e94738720ea-X",
};