const express = require('express')
const app = express()
const mongoose = require('mongoose')
// import the model here
const ShortURL = require('./models/url')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index', { myVariable: 'My name is John!' })
})

app.post('/short', (req, res) => {
	// insert the record using the model
	new ShortURL({
		full: 'test',
		short: 't',
		clicks: 0
	})
	res.json({ ok: 1 })
})

// Setup your mongodb connection here
mongoose.connect('mongodb://localhost/codedamn')

mongoose.connection.on('open', () => {
	// Wait for mongodb connection before server starts
	app.listen(process.env.PUBLIC_PORT, () => {
		console.log('Server started')
	})
})
