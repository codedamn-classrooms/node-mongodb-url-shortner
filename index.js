const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/short', (req, res) => {
	const db = mongoose.connection.db
	// insert the record in 'test' collection

	res.json({ ok: 1 })
})

// Setup your mongodb connection here
// mongoose.connect(...)

// Wait for mongodb connection before server starts
app.listen(process.env.PUBLIC_PORT, () => {
	console.log('Server started')
})
