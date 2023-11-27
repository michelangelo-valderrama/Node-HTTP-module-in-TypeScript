import { Socket } from "node:net"
import {
  Header,
  writeEmptyLine,
  writeHeader,
  writeStartLine,
  HTTP_CODES,
} from "./headers"

function write(s: Socket, body: string) {
  s.write(
    `${writeHeader(
      "Content-Length",
      `${body.length}`
    )}${writeEmptyLine()}${body}`
  )
}

function setHeader(s: Socket, key: string, value: string) {
  s.write(writeHeader(key, value))
}

// function setStatus(s: Socket, status: number) {
//   s.write(writeStartLine({ status }))
// }

// function setCode(s: Socket, code: string) {
//   s.write(writeStartLine({ code }))
// }

function writeHead(s: Socket, status: number, header: Header) {
  const code = HTTP_CODES[status as keyof typeof HTTP_CODES]
  s.write(
    writeStartLine({
      status,
      code,
    })
  )
  Object.keys(header).map((name) => {
    s.write(writeHeader(name, header[name]))
  })
}

function end(s: Socket, body: string) {
  write(s, body)
  s.end()
}

export const setupResponse = (serverSocket: Socket) => {
  const res = {
    write: (body: string) => write(serverSocket, body),
    writeHead: (status: number, header: Header) =>
      writeHead(serverSocket, status, header),
    end: (body?: string) => end(serverSocket, body ?? ""),
    setHeader: (key: string, value: string) =>
      setHeader(serverSocket, key, value),
  }
  return res
}

export type Res = ReturnType<typeof setupResponse>
