const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//const { response } = require("express");
//const client = require("mailchimp-marketing");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//To use static images and local styles
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});

//  app.post("/",(req,res)=>{
//      //res.send("It is working");
//      const fName = req.body.fName;
//      const lName = req.body.lName;
//      const email = req.body.email;

//      const data = {
//          email_address: email,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: fName,
//                 LNAME: lName,
//             },
//      };
//      const jsonData = JSON.stringify(data);
//      const url="";
//      const options = {
//          method:"POST",
//          auth:"Nima:"
//      };
//      const request = https.request(url, options, (response)=>{
//          response.on(data, function(data){
//              console.log(JSON.parse(data))
//          });
//      });
//      request.write(jsonData);
//      request.end();
//  });



app.post("/",(req,res)=>{
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    client.setConfig({
        apiKey: "",
        server: "",
      });
    const run = async () => {
        try{
            const response = await client.lists.addListMember("",
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                },
            },
            
            {
                skipMergeValidation: false
            }
        );
        res.sendFile(__dirname+"/success.html");
        //console.log(`This user's subscription status is ${response.statusCode}.`);
        }
        catch (err) {
            //res.status(400).send(err);
            res.sendFile(__dirname + "/failure.html");
        }
    };
    
    run();
 });

 app.post("/failure",(req,res)=>{
    res.redirect("/");
 });

//for local server
// app.listen(3000,(req,res)=>{
//     console.log("Server started at port 3000");
// });
//for heroku server
app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Server started at port 3000");
});

