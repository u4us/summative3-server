var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var Product = require('./product-model');
var Category = require('./category-model');
var User = require('./user-model');
var Comment = require('./comment-model');

var connectionString = 'mongodb://admin:admin@cluster0-shard-00-00-xv0nl.mongodb.net:27017,cluster0-shard-00-01-xv0nl.mongodb.net:27017,cluster0-shard-00-02-xv0nl.mongodb.net:27017/market?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));

var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));

var router = express.Router();

// products API #####################################################################
router.get('/products', (req, res) => {
	Product.find()
	.then((item) => {
	    return res.json(item);
	});
})

//getOne + virtuals
router.get('/products/:id', (req, res) => {
	Product.findOne({id:req.params.id})
	.populate('user')
    .populate('category')
	.populate('comments')
	.then((item) => {
	    return res.json(item);
	});
})

router.post('/products', (req, res) => {
	var product = new Product();
	product.id = Date.now();
	
	var data = req.body;
	Object.assign(product,data);
	
	product.save()
	.then((item) => {
	  	return res.json(item);
	});
});

router.delete('/products/:id', (req, res) => {
	Product.deleteOne({ id: req.params.id })
	.then(() => {
		return res.json('deleted');
	});
});

router.put('/products/:id', (req, res) => {
	Product.findOne({id:req.params.id})
	.then((product) => {
		var data = req.body;
		Object.assign(product,data);
		return product.save()	
	})
	.then((item) => {
		return res.json(item);
	});	
});

// comments API #########################################################
router.post('/comments', (req, res) => {
	var comment = new Comment();
	comment.id = Date.now();
	
	var data = req.body;
	Object.assign(comment,data);
	
	comment.save()
	.then((item) => {
	  	return res.json(item);
	});
});

app.use('/api', router);

// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));