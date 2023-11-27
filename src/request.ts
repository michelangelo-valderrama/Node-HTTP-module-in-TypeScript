import { Header } from "./headers"

const parseRequestBuffer = (rawRequest: Buffer) => {
  const requestStr = rawRequest.toString()
  const splitedReq = requestStr.split(/\r?\n/)

  const startLine = splitedReq.shift()!.split(" ")
  const indexEmptyLine = splitedReq.findIndex((_, i, arr) => arr[i] === "")
  const [method, path, version] = startLine

  const headersArr = splitedReq.splice(0, indexEmptyLine)
  const headers: Header = {}
  headersArr.map((v) => {
    const [key, value] = v.split(": ")
    headers[key.toLocaleLowerCase()] = value
  })

  const [, ...body] = splitedReq

  return {
    method,
    path,
    version,
    headers,
    body: body.join(""),
  }
}

export const setupRequest = (requestBuffer: Buffer) => {
  const req = parseRequestBuffer(requestBuffer)
  return req
}

export type Req = ReturnType<typeof setupRequest>
