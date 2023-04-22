const server = require("express")()
const helmet = require("helmet")

server.use(helmet())

server.get("/hello", (req, res) => {
  res.send("<h1>Hello</h1>")
})

const port = 3000

server.listen(port, () => console.log(`Server is listening on port ${port}...`))