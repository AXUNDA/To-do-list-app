const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const app = express()
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mail = req.body.mail;
  var data = {
    members: [{
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }

    }]
  };
  var data2 = JSON.stringify(data);
  var options = {
    url: "https://us13.api.mailchimp.com/3.0/lists/e5d8429dac",
    method: "POST",
    headers: {
      "Authorization": "Kaka 178d5bc010e5a899ceda18957907fc66-us13"
    },
    body: data2
  }
  request(options, function(err, response, body) {
    if (err) {
      res.sendFile(__dirname + "/failure.html")
    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    }

  })
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT, function() {
  console.log("app is active");
});
//  azunda- 78eb42f4e1.
// azunda- 08d1c44aef20e136290c732d34d52b38-us5
