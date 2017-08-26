var db = require('./db/config');
var User = require('./db/models/users');
var Ingredient = require('./db/models/ingredients');
var path = require('path');

process.env.ENVIRONMENT = process.env.ENVIRONMENT || 'development';
console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT);

if (process.env.ENVIRONMENT === 'production') {
  console.log('production mode')
  var vision = require('@google-cloud/vision')({
    keyFilename: process.env.KEYS,
    projectId: 'sandbox-171422'
  });
} else {
  var vision = require('@google-cloud/vision')({
    keyFilename: '../Sandbox-7a20dde6100d.json',
    projectId: 'sandbox-171422'
  });
}


//createUser api route
exports.findOrCreateUser = function(req, res) {
  var email = req.body.email;

  User.findOne({username: email})
    .exec(function(err, user) {
      // if user doesn't exist, create a new user
      if(!user) {
        var newUser = new User({username: email})
        newUser.save((err, user) => {
          if (err) {
            console.log('user not found and not saved!')
          } else {
            res.status(201).send(user.username);
          }
        });
      } else if (user){
        res.status(200).send(user.username);
      } else {
        res.sendStatus(400);
      }

    });
}

//ingredient search api route
exports.ingredients = function(req, res) {
  var ingredient = req.body.data.ingredient;
  var username = req.body.data.username;

  Ingredient.findOne({name: ingredient})
    .exec(function(err, ingredientObj) {
      //if there is an ingredient, return the document JSON, on the front end, we can extrapolate the name and link!
      if (!ingredientObj) {
        res.status(401).send(`${ingredient} not in database`);
      } else {
        User.findOneAndUpdate({username: username}, {"$push": {"pastSearches": ingredientObj}})
          .exec(function(err, user) {
            if (err) {
              throw err;
            } else {
              console.log(user);
            }
          })

        res.json(ingredientObj);
      }
    });
};

//get past searches api route
exports.pastSearches = function(req, res) {
  // var userID = req.body.data.userID;
  var username = req.body.data.username;
  User.findOne({username: username})
    .exec(function (err, user) {
      if (!user) {
        res.status(401).send('user not found in database');
      } else {
        res.send(user.pastSearches);
      }
    })
}

exports.googleCloudSearch = function(req, res) {
  console.log('google cloudsearch ran')
  var buf = new Buffer(req.body.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
  vision.textDetection({ content: buf }, function(err, apiResponse) {
    if(err) {
      res.end('Cloud Vision Error:', err);
    } else {

      var detections = apiResponse.fullTextAnnotation.text;
      console.log('detections', detections);
      var arrayOfIngredients = [];
      var ingredientsArray = detections.replace(/\n/g, ' ').replace(/\./g, ',').toLowerCase().split(', ');
      console.log('ingredientsArray', ingredientsArray);

      var toxicIngredients = [];
      console.log('toxicIngredients', toxicIngredients);
      const numberOfIngredients = ingredientsArray.length;
      console.log('numberOfIngredients', numberOfIngredients);
      var counter = 0;
      ingredientsArray.forEach(function(ingredient, index) {
        Ingredient.findOne({name: ingredient},
          function(err, ingredientObj) {
          //if there is an ingredient, return the document JSON, on the front end, we can extrapolate the name and link!
         counter++;
          if (err) {
            //res.status(401).send(`${ingredient} not in database`);
            console.log('ERROR:' + err);
          } else if(ingredientObj) {
            console.log('ingredientObj', ingredientObj);
            toxicIngredients.push(ingredientObj);
          }

          if (counter === numberOfIngredients-1){
            var filenameObj = {
              name: req.body.filename,
              link: 'Below are the flagged ingredients from this image'
            }
            toxicIngredients.unshift(filenameObj);
            //console.log(toxicIngredients);
            if(toxicIngredients.slice(1).length > 0){
              User.findOneAndUpdate({username: req.body.username}, {"$push": {"pastSearches": toxicIngredients}})
              .exec(function(err, user) {
                if (err) {
                  throw err;
                } else {
                  //console.log(user);
                }
              })
            }
            res.json(toxicIngredients);
            console.log('toxicIngredients', toxicIngredients);
          }

        });
      })
    }
  })
}

exports.callback = function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
}
