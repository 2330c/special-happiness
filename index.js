//TODO: Eliminate all throw(err) lines before shipping! Replace them with proper error handling.

// Import essential libraries 
const cookieParser = require('cookie-parser');

const express = require('express'); 
const app = express(); 
const path = require('path'); 
const session = require('express-session')
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql2');

app.use(cookieParser());
// need cookieParser middleware before we can do anything with cookies


// Use the body-parser library to parse
// incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));;
//console.log(config);
// Note! This was the hold way of establishing a connection, using a file.
// Nowadays, we use a URL endpoint with query parameters instead.

const insertQuery = "INSERT INTO sampletable (name, expt, quizzes, correct, randstring) VALUES (?,?,?,?,?);"; //append the specific values
const updateQuery = "UPDATE sampletable SET expt='2024-09-17 11:12:13' WHERE name='Ada';";
const incrementQuery = "UPDATE sampletable SET quizzes = quizzes + 1 WHERE name=? AND randstring=?;";
const incrementQuery2 = "UPDATE sampletable SET correct = correct + ? WHERE name=? AND randstring=?;";
//later, such as (name, expt) pair or random string etc.
const selectAllQuery = "SELECT * FROM sampletable";
const userQuery = "SELECT quizzes, correct FROM sampletable WHERE name=? and randstring=?;";
//const alterQuery = "ALTER TABLE sampletable ADD COLUMN randstring VARCHAR(20)";
var allData = null;

/*const connection2 = mysql.createConnection(config);
connection2.execute(alterQuery, [], function (err, result) {
    if (err) console.log("Error was" + err);
    console.log(result);
})
connection2.end();*/

//TODO: add an app.get() endpoint that can include query paramteters for the database configuration parameters: user, password, host, port, database, and ca

//This endpoint should only work once on server start; if anyone tries running it again, it should do nothing.
//This is not a completely safe way of doing things.

var connection_established = false;
var config;
app.get('/establish_connection', (req, res) => {
    if (!connection_established) {
        //user, password, host, port, database, ca
        const user = req.query.user;
        const password = req.query.password;
        const host = req.query.host;
        const port = req.query.port;
        const database = req.query.database;
        const ca = req.query.ca; //certificate authority
        config = {user:user, password:password, host:host, port:port, database:database, ssl:{rejectUnauthorized:false, ca:ca}};
        res.render('homepage');
        console.log(config);

        const connection = mysql.createConnection(config);
        connection.execute(selectAllQuery, [], function (err, result) {
            if (err) throw err;
            console.log(result);
            allData = result;
            connection_established = true;
        });
        connection.end();
    }
    else {
        res.render('homepage');
    }
});


// Create a new endpoint for the POST method that
// accepts data to be added to the database
app.post('/add', (req, res) => {
    const record = req.body;
    const connection = mysql.createConnection(config);
    connection.execute(insertQuery, [record.user,record.expires,0,0,record.randstring], function (err, result) {
        if (err) throw err;
        console.log(result);
    })
    connection.end();
});

//Send the database a SQL query that adds one to the given user's quiz count and the new number correct to the correct count.
app.post("/addQuizCount", (req, res) => {
    const record = req.body;
	
    const connection = mysql.createConnection(config);
    connection.execute(incrementQuery, [record.user, record.randstring], function (err, result) {
        if (err) console.log("User not found? Or another error? " + record.user + " " + err); //TODO: Handler user not found case.
        console.log(result);
    });
    let correct = record.count;
    if (correct > 10) correct = 10;
    //console.log([correct, record.user, record.randstring]);
    connection.execute(incrementQuery2, [record.correct, record.user, record.randstring], function (err, result) {
        if (err) console.log("User not found? Or another error? " + record.user + " " + err); //TODO: Handler user not found case.
        console.log(result);
    });
    connection.end();
    
    console.log(`Quiz count updated for ${record.user}`);
    });

app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 2147483647, httpOnly: true });
    console.log('New cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});


app.use(express.static(__dirname + '/public'));
// Setting EJS as the view engine
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.get('/', (req, res) => {
    res.render('homepage');
	console.log(req.ip);
});

app.get('/bkReq', (req, res) => {
    res.sendFile(__dirname +'/data.json');
});

app.post('/getUserData',(req,res)=>{
            const userConnection = mysql.createConnection(config);
        console.log("req's user is "+req.body.user);
        console.log("req's ranstring is "+req.body.randstring);
        userConnection.execute(userQuery, [req.body.user, req.body.randstring], function (err, result) {
            if (err) throw err;
            console.log(result);
            //allData = result;
            res.json({quizzes:result[0].quizzes, correct:result[0].correct})
        });
        userConnection.end();
});

app.get('/views/:name', (req, res) => {
    res.render(req.params.name)
})

// Commenting out the selectAll check while we rework how the database in conneted to.
// Will move this from global scope to somewhere else.
/*const connection = mysql.createConnection(config);
connection.execute(selectAllQuery, [], function (err, result) {
    if (err) throw err;
    console.log(result);
    allData = result;
  });
  connection.end();*/

app.get('/test', (req, res) => {
    const connection = mysql.createConnection(config);
    connection.execute('SELECT * FROM sampletable', [], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
    connection.end();
});

app.get('/test2', (req, res) => {
    console.log(allData[0]);
    console.log(allData[0]["name"]);
    console.log(allData[0].name);
    console.log(allData[0]["expt"]);
    res.send([allData[0],allData[0]["name"],allData[0].name,allData[0]["expt"]]);
});    

app.use('/images',express.static(__dirname +'/images'));
app.use('/css',express.static(__dirname +'/css'));
app.use('/scripts',express.static(__dirname +'/scripts'));
app.use('/json',express.static(__dirname +'/json'));
//app.use('/views',express.static(__dirname +'/views'));




//Server is listening on port 5050
app.listen(5050, () => {
    console.log(`App listening at port 5050`);
  })