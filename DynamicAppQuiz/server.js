const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
const Path=require('path')
const app = express()
const cors = require('cors');
const { ObjectID } = require('mongodb');
app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect('mongodb://localhost:27017/QuizApp').then(() => {
  console.log("connected")
}).catch((err) => {
  console.log(err)
})
const UserSchema = new mongoose.Schema({
  name: { type: String },
  pss: { type: String },
  ph: { type: String },
  email: { type: String },
  role: { type: String }
})
const User = mongoose.model('User', UserSchema)
app.post("/register", async (req, res) => {
  const u_name = req.body.uname;
  const u_pss = req.body.ps;
  const u_ph = req.body.ph;
  const u_email = req.body.em_id;
  try {
    const data1 = await User.findOne({ email: u_email });
    console.log(data1);
    if (data1 == null) {
      const result = await User.create({ name: u_name, pss: u_pss, ph: u_ph, email: u_email });
      res.json({ statusCode: 200, message: "Successfully Registered" })
      //res.render('login');
    }
    else {
      res.json({  statusCode: 409,message: "User Already Exists" })
    }
  }
  catch (error) {
    res.json({ statusCode: 500,message: "Registration Failed" })
    console.log(error)
  }
})
app.post("/login", async (req, res) => {
  const u_pss = req.body.ps;
  const u_email = req.body.em_id;
  try {
    const user = await User.findOne({ email: u_email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (u_pss === user.pss) {
      return res.json({ message: "User Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find User" });
  }
});
const UserSchema1 = new mongoose.Schema({
  name: { type: String },
  pss: { type: String },
  ph: { type: String },
  email: { type: String },
  role:{type:String}
})
const Staff = mongoose.model('Staff', UserSchema1)
app.post("/reg-staff", async (req, res) => {
  const u_name = req.body.uname;
  const u_pss = req.body.ps;
  const u_ph = req.body.ph;
  const u_email = req.body.em_id;
  
  try {
    const data1 = await Staff.findOne({ email: u_email });
    if (data1 == null) {
      const result = await Staff.create({ name: u_name, pss: u_pss, ph: u_ph, email: u_email });
      res.json({ statusCode: 200, message: "Successfully Registered" })
      //res.render('login');
    }
    else {
      res.json({ message: "User Already Exists" })
    }
  }
  catch (error) {
    res.json({ message: "Registration Failed" })
    console.log(error)
  }
})
app.post('/messages', (req, res) => {
  const message = req.body;
  console.log('Received message:', message);
  
  // Process the message (e.g., save it to a database)

  res.status(200).send('Message received');
});
app.post("/log-staff", async (req, res) => {
  const u_pss = req.body.ps;
  const u_email = req.body.em_id;
  try {
    const user = await Staff.findOne({ email: u_email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (u_pss === user.pss) {
      return res.json({ message: "User Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find User" });
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const groupSchema = new mongoose.Schema({
  staffName:{type:String},
  gname: { type: String },
  userIds: [String]
});
const Group = mongoose.model('Group', groupSchema)
app.post('/groups', async (req, res) => {
  const groupData = req.body;
  try {
    const staffName = groupData.staffName;
    const userIds = groupData.users.map(user => user.email);
    const gname = groupData.groupName;
    // Create a new group with the extracted user IDs
    if (userIds == []) {
      res.json("Enter Group Name")
    }
    else {
      const newGroup = await Group.create({ staffName,gname, userIds });

      res.status(201).json(newGroup);
    }
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/groups', async (req, res) => {
  const staffName = req.query.u_name;
  try {
    const groups = await Group.find({ staffName });
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error retrieving groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/student-classes', async (req, res) => {
  const userId = req.query.userId; // Assuming userId is used to identify the student
  try {
    const classes = await Group.find({ userIds: userId });
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error retrieving student classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Assuming you have a Group model

// Route definition
// Assuming 'groups' is an array of group objects or a MongoDB collection
app.delete('/groups/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  
  // Assuming 'groups' is an array of group objects or a MongoDB collection
  const index = Group.findIndex(group => group._id === groupId);
  
  if (index !== -1) {
    groups.splice(index, 1);
    res.status(200).json({ message: 'Group deleted successfully' });
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
});



app.get('/messagesdisp', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.error('Error retrieving messages:', err);
      res.status(500).json({ message: 'Error retrieving messages' });
      return;
    }
    res.json(messages);
  });
});
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs=require('fs')
// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/QuizApp';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  
});
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.json({ file: req.file });
});
app.get('/files', async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    const fileNames = files.map(file => file.filename);
    console.log('File names:', fileNames);
    res.json(fileNames);
  } catch (err) {
    console.error('Failed to fetch files:', err);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});
  app.listen(4000, () => {
    console.log("Listening at http://localhost:4000")
  });
// Route to retrieve a file from GridFS



app.get('/group-det', async (req, res) => {
  try {
    
    const { staffName, groupName } = req.query;

    console.log(staffName,groupName);
    /*const secretKey = 'kumar';
    const decryptedUName = CryptoJS.AES.decrypt(staffName, secretKey).toString(CryptoJS.enc.Utf8);
    const decryptedGroupName = CryptoJS.AES.decrypt(groupName, secretKey).toString(CryptoJS.enc.Utf8);
    console.log(decryptedGroupName,decryptedUName)*/
    const group = await Group.findOne({ staffName, gname: groupName }).populate('userIds');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const members = group.userIds.map(email => ({
      email: email
    }))   
    
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/group/:u_name/:gname', async (req, res) => {
  try {
    const { u_name, gname } = req.params;
    console.log(u_name,gname)
    // Assuming 'Group' is your Mongoose model for groups
    const group = await Group.findOneAndDelete({ staffName: u_name, gname: gname });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
const messageSchema = new mongoose.Schema({
  staffName: String,
  usernames: [String],
  mesg: String,
  timestamp: String,
  gname:String
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Route to handle POST requests to /mesg
app.post('/mesg', (req, res) => {
  const messageData = req.body;
  console.log('Received message:', messageData);

  // Create a new message document based on the model
  const message = new Message({
    staffName: messageData.staffName,
    usernames: messageData.usernames,
    mesg: messageData.mesg,
    timestamp: messageData.timestamp,
    gname:messageData.groupName
  });

  message.save()
    .then(() => {
      console.log('Message saved successfully');
      res.status(200).json({ message: 'Message received and saved' }); // Send a JSON response
    })
    .catch(error => {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error saving message' }); // Send a JSON response
    });
});
app.post('/sendmessage', async (req, res) => {
  const { staffName, usernames, mesg, timestamp,groupName } = req.body;
  
  try {
    // Assuming 'Message' is your Mongoose model
    const message = new Message({
      staffName,
      usernames,
      mesg,
      timestamp,
      groupName
    });

    await message.save();

    // Here you can send the message only to the specified usernames
    // Example code to send the message to each username
    usernames.forEach(async (username) => {
      // Logic to send the message to 'username'
      console.log(`Sending message to ${username}`);
      // For demonstration purposes, you can send a response indicating success
      res.json({ message: `Message sent to ${username}` });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/mesgretrieve', async (req, res) => {
  const username = req.query.u_name;
  console.log(username);
  try {
    const messages = await Message.find({ usernames: { $in: [username] } }).exec();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).send('Internal server error');
  }
});
const { GridFSBucket } = require('mongodb');
const { ObjectId } = require('mongodb');
let gfsBucket;
conn.once('open', () => {
  // Init stream
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});
let gfs1;

conn.once('open', () => {
  // Init stream
  gfs1 = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});
app.get('/download/:filename', (req, res) => {
  const filename=req.params.filename
  console.log(filename)
  const outputPath=`F:/${filename}`;
  gfs1.openDownloadStreamByName(filename)
  .pipe(fs.createWriteStream(outputPath))
  .on('error', (err) => {
    console.error(`Error downloading file ${filename}:`, err);
    res.status(500).json({ error: 'Failed to download file' });
  })
  .on('finish', () => {
    console.log(`File ${filename} downloaded successfully`);
    res.status(200).json({ message: 'File downloaded successfully' });
    //res.set('Content-Type','application/pdf')
    //downloadStream.pipe(res);
  });
});
app.get('/filenames', async (req, res) => {
  const cursor = gfs1.find({});
  const filenames = [];
  await cursor.forEach(file => {
    filenames.push(file.filename);
  });
  res.json(filenames);
});

const quizSchema = new mongoose.Schema({
  usernames: [{ type: String, required: true }],
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: String, required: true }
});

const Quiz = mongoose.model('Quiz', quizSchema)
app.post('/api/quiz', async (req, res) => {
  const quizData = req.body;
  const { usernames, question, options, correctOption } = quizData;
console.log(quizData)
  if (!usernames || !question || !options || !correctOption) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const quiz = new Quiz({  usernames, question, options, correctOption });
    console.log(quiz)
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create quiz', details: err.message });
  }
});
app.get('/api/quiz', async (req, res) => {
  const { u_name } = req.query;
  try {
    const quizzes = await Quiz.find({ usernames: u_name });
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/quizzes/assigned/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Find quizzes assigned to the specified username
    const quizzes = await Quiz.find({ usernames: username });
console.log(quizzes);
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/api/submit-quiz', async (req, res) => {
  const answers = req.body;
  
  // Assuming 'Quiz' is your Mongoose model for quizzes
  try {
    const quizzes = await Quiz.find({});
    let totalMarks = 0;

    quizzes.forEach(quiz => {
      if (answers[quiz._id] === quiz.correctOption) {
        totalMarks++;
      }
    });

    // Calculate percentage of correct answers
    const percentage = (totalMarks / quizzes.length) * 100;

    // Send the total marks and percentage as a response
    res.json({ totalMarks, percentage });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post("/api/updatepassword", async (req, res) => {
  const { username, newPassword } = req.body;
console.log(username,newPassword)
  try {
    // Update the password in the database
    const updatedUser = await User.findOneAndUpdate({ email: username }, { pss: newPassword }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/api/updatepassword1", async (req, res) => {
  const { username, newPassword } = req.body;
console.log(username,newPassword)
  try {
    // Update the password in the database
    const updatedUser = await Staff.findOneAndUpdate({ email: username }, { pss: newPassword }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
