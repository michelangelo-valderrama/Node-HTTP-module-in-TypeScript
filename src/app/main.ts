import { createServer } from "../http"

const server = createServer((req, res) => {
  const { path } = req

  if (path === "/") {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.write(
      JSON.stringify({
        data: "Hello, world!",
      })
    )
  } else if (path.includes("/echo")) {
    const [, body] = path.match(/\/echo\/(.+)/) as string[]
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.write(body)
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.write("404 | Not Found")
  }
})

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000")
})
