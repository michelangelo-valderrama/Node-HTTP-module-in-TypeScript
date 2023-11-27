// CONST
export const HTTP_CODES = {
  200: "OK",
  201: "Created",
  404: "Not Found",
}

// TYPES
export type Header = {
  [key: string]: string
}

// FUNCTIONS
export const writeEmptyLine = () => "\r\n"

export function writeStartLine({
  status,
  code,
}: {
  status?: number
  code?: string
}) {
  return `HTTP/1.1 ${status} ${code}\r\n`
}

export const writeHeader = (key: string, value: string) =>
  `${key}: ${value}\r\n`
