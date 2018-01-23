var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds")


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
seedDB();


// Campground.create(
//     {
//         name: "Big Bend", 
//         image: "https://farm8.staticflickr.com/7085/7215860942_8a44e3ab8f_b.jpg",
//         description: "Big Bend Country is a triangle-shaped region in west Texas formed where the Rio Grande River runs southeast, then northeast, in a large loop. Big Bend National Park is located at the elbow of the bulge, comprising a much smaller portion of this region. Together with this river, 300 million years of climatic and geologic change accounts for the unusual topography and beauty of Big Bend National Park."
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMGROUND: ");
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    }); 
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(app.get('port'), function(){
    console.log("YelpCamp server has started");
});