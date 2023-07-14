const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//important packages that are set to usse here and also public containing the required files whic are to be acceseed publicly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
// database connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Sign_IN', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  
}
console.log("heyyy");
// user schema and model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      //we are sending res.cookie which will send data to the client brouwseer with the details which will verify the existemce of suser
      res.cookie('token', '12345');
      res.json({ message: 'Logged in' });
      console.log("heyyy2");
      console.log("logged in");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
