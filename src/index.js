import express from 'express';

const app = express();

const PORT = 3000;

// app.get('/', (req, res) => {
//   res.json({ Message: 'Hello world!' });
// });

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
