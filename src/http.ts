import net from "node:net"
import { Req, setupRequest } from "./request"
import { Res, setupResponse } from "./response"

export const createServer = (cb: (req: Req, res: Res) => void) => {
  console.log("[server] created.")

  const server = net.createServer((socket) => {
    console.log("[server] connected.")

    socket.on("data", (data) => {
      console.log("[server] request.")
      const req = setupRequest(data)
      const res = setupResponse(socket)
      cb.call(undefined, req, res)
    })

    socket.on("close", () => {
      console.log("[server] closed.")
      socket.end()
    })
  })
  return server
}

export default {
  createServer,
}
