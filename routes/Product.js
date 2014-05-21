var ejs = require("ejs");
var mongoose= require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/shoppingarena");
var catalogSchema = new Schema({item_name: String,item_description: String,brand: String,category:String,units: Number,price: Number,dimensions: String,memory: String,color: String,skinfamily: String,skintone: String, shadeNo: String, });
var productcatalog = mongoose.model('productcatalog',catalogSchema);

function fetchCatalog(req,res){
	
	productcatalog.find({},function(err,data){
		if(!err){
			ejs.renderFile('./views/index.ejs',{productCatalog:data},function(err, result) {
				if (!err) {
					res.end(result);
				}
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
		else{
			console.log('error occured');
		}
	});
}


function categorySearch(req,res){
	

	ejs.renderFile('./views/categorySearch.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});

}

function search(req,res){
	
	productcatalog.find({$or:[{category: new RegExp(req.param('search'), 'i')},{item_name: new RegExp(req.param('search'),'i')}]},function(err,data){
		if(!err){
			ejs.renderFile('./views/index.ejs',{productCatalog:data},function(err, result) {
				if (!err) {
					res.end(result);
				}
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
		else{
			console.log('error occured');
		}
	});
}

exports.fetchCatalog=fetchCatalog;
exports.search=search;
exports.categorySearch=categorySearch;