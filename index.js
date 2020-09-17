const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index', { myVariable: 'My name is John!' })
})

app.listen(process.env.PUBLIC_PORT, () => {
	console.log('Server started')
})
