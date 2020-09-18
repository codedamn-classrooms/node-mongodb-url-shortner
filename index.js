const express = require('express')
const app = express()
const mongoose = require('mongoose')
// import the model here
const ShortURL = require('./models/url')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	const allData = await ShortURL.find()
	res.render('index', { shortUrls: allData })
})

app.post('/short', async (req, res) => {
	// Grab the fullUrl parameter from the req.body
	const fullUrl = req.body.fullUrl
	console.log('URL requested: ', fullUrl)

	// insert and wait for the record to be inserted using the model
	const record = new ShortURL({
		full: fullUrl
	})

	await record.save()

	res.redirect('/')
})

app.get('/:shortid', async (req, res) => {
	// grab the :shortid param
	const shortid = req.params.shortid

	// perform the mongoose call to find the long URL
	const rec = await ShortURL.findOne({ short: shortid })

	// if null, set status to 404 (res.sendStatus(404))
	if (!rec) return res.sendStatus(404)

	// if not null, increment the click count in database
	rec.clicks++
	await rec.save()

	// redirect the user to original link
	res.redirect(rec.full)
})

// Setup your mongodb connection here
mongoose.connect('mongodb://localhost/codedamn', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('open', async () => {
	// Wait for mongodb connection before server starts

	// Just 2 URLs for testing purpose
	await ShortURL.create({ full: 'http://google.com', short: '5xr' })
	await ShortURL.create({ full: 'http://codedamn.com' })

	app.listen(process.env.PUBLIC_PORT, () => {
		console.log('Server started')
	})
})
