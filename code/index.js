import { startServer } from './server'
import { startUnary } from './client_unary'
import { startClientStream } from './client_stream_client'
import { startServerStream } from './client_stream_server'
import { startDuplexStream } from './client_stream_duplex'


const type = process.env.type || 'server'

const instance = process.env.instance || 'unary'


if(type.trim() === 'server') {
  startServer()
}
else {
  switch(instance.trim()) {
    case 'unary':
      startUnary()
      break
    case 'sc':
      startClientStream()
      break
    case 'ss':
      startServerStream()
      break
    case 'sd':
      startDuplexStream()
      break
    default:

      break
  }
}

