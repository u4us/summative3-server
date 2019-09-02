var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var Product = require('./product-model');

//setup database connection
var connectionString = 'mongodb://admin:admin@cluster0-shard-00-00-xv0nl.mongodb.net:27017,cluster0-shard-00-01-xv0nl.mongodb.net:27017,cluster0-shard-00-02-xv0nl.mongodb.net:27017/market?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));


//setup express server
var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));

//setup routes
var router = express.Router();

router.get('/testing', (req, res) => {
  res.send('<h1>Testing is working</h1>')
})

//get
router.get('/products', (req, res) => {
	Product.find()
	.then((item) => {
	    return res.json(item);
	});
})


router.get('/products/:id', (req, res) => {
    Product.findOne({id:req.params.id})
    
    .populate('type')

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

app.use('/api', router);

// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));