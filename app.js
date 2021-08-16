const express = require('express')


const PORT = process.env.PORT || 3000

const app = express();

const server = app.listen(PORT, () => {
  console.log("server is listening on port " + PORT)
})

app.use(express.static('public'))
app.get('/', (req, res) => {
  console.log('new connection')
  res.send(200)
})