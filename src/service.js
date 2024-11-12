const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    console.log('Received request at /');
    res.send('Backend is running!');
  });
  