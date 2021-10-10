const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
var user = require('./user.json');

// - Create new html file name home.html 
// - add <h1> tag with message "Welcome to ExpressJs Tutorial"
// - Return home.html page to client
// */
router.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, './home.html'));
  res.send("<h1>Welcome to ExpressJs Tutorial</h1>");
});
/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(path.join(__dirname, "./user.json"));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  var username = req.query.username;
  var password = req.query.passsword;
  if(username === user.username && password === user.password){
    let response = {
      status: true,
      message: "User Is valid"
    }
    res.send(response);
  } else if (username !== user.username && password === user.password){
  let response = {
      status: false,
      message: "User Name is invalid"
    }
    res.send(response);
  } 
  else{
  let response = {
      status: false,
      message: "Password is invalid"
    }
    res.send(response);
  }
  }
);


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  res.send(`<b>${req.params.username} successfully logout</b>`);
});

app.use('/', router);
app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));