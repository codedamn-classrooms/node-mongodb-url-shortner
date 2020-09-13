// Initialize express server on PORT 1337
const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send('Hello World! - from codedamn')
})

app.listen(process.env.PUBLIC_PORT, () => {
	console.log('Server started')
})
