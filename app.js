var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
     var campgrounds = [
        {name: "Big Bend", image: "https://farm8.staticflickr.com/7085/7215860942_8a44e3ab8f_b.jpg"},
        {name: "Enchanted Rock", image: "https://static.rootsrated.com/image/upload/s--jS9c6hCe--/t_rr_large_natural/l0btvmlchrloeeoxy0uc.jpg"},
        {name: "Guadalupe River", image: "http://www.lakehouses4sale.net/uploads/guadalupe-river-condos-for-sale.jpg"},
        {name: "Big Bend", image: "https://farm8.staticflickr.com/7085/7215860942_8a44e3ab8f_b.jpg"},
        {name: "Enchanted Rock", image: "https://static.rootsrated.com/image/upload/s--jS9c6hCe--/t_rr_large_natural/l0btvmlchrloeeoxy0uc.jpg"},
        {name: "Guadalupe River", image: "http://www.lakehouses4sale.net/uploads/guadalupe-river-condos-for-sale.jpg"},
        {name: "Big Bend", image: "https://farm8.staticflickr.com/7085/7215860942_8a44e3ab8f_b.jpg"},
        {name: "Enchanted Rock", image: "https://static.rootsrated.com/image/upload/s--jS9c6hCe--/t_rr_large_natural/l0btvmlchrloeeoxy0uc.jpg"},
        {name: "Guadalupe River", image: "http://www.lakehouses4sale.net/uploads/guadalupe-river-condos-for-sale.jpg"},
        {name: "Big Bend", image: "https://farm8.staticflickr.com/7085/7215860942_8a44e3ab8f_b.jpg"},
        {name: "Enchanted Rock", image: "https://static.rootsrated.com/image/upload/s--jS9c6hCe--/t_rr_large_natural/l0btvmlchrloeeoxy0uc.jpg"},
        {name: "Guadalupe River", image: "http://www.lakehouses4sale.net/uploads/guadalupe-river-condos-for-sale.jpg"}
     ]
     res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;

    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.listen(app.get('port'), function(){
    console.log("YelpCamp server has started");
});