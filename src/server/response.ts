import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'

export const parseResponse = (code: StatusCodes, data?: any) => {
  return NextResponse.json(data, { status: code, statusText: getReasonPhrase(code) })
}
