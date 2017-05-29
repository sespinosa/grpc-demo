import grpc from 'grpc'


const stream_test = grpc.load('./proto/stream_test.proto').stream_test

const unaryHandler = (call, callback) => {
  console.log('##################################')
  console.log('Unary!')
  console.log(call.request)
  console.log('##################################')

  switch(call.request.operator) {
    case 'sum':
      callback(null, {
        success: true,
        result: call.request.a + call.request.b
      })
      break
    case 'sub':
      callback(null, {
        success: true,
        result: call.request.a - call.request.b
      })
      break
    case 'mul':
      callback(null, {
        success: true,
        result: call.request.a * call.request.b
      })
      break
    case 'div':
      callback(null, {
        success: true,
        result: call.request.a / call.request.b
      })
      break
    default:
      break

  }
}

const streamClientHandler = (call) => {
  console.log('#########################')
  console.log('StreamClient!')
  console.log(call.request)
  console.log('#########################')
  const msg = call.request.message

  call.write(`${msg} 1`)
  call.write(`${msg} 2`)
  call.write(`${msg} 3`)
  call.write(`${msg} 4`)
  call.write(`${msg} 5`)
  call.write(`${msg} 6`)
  call.write(`${msg} 7`)
  call.write(`${msg} 8`)
  call.write(`${msg} 9`)
  call.write(`${msg} 10`)

  call.end()
}

const streamServerHandler = (call, callback) => {
  let ammount = 0

  call.on('data', (data) => {
    ammount = ammount + data.number
    console.log(data)
  })

  call.on('end', () => {
    console.log('##########################')
    console.log('StreamServer!')
    console.log(ammount)
    console.log('##########################')
    callback(null, { result: ammount })
  })
}

const streamDuplexHandler = (call) => {

  call.on('data', ({ number }) => {
    console.log('###################')
    console.log('StreamDuplex!')
    console.log(number)
    console.log('###################')
    setTimeout(() => {
      call.write({
        number: number + 2
      })
    }, 50)
  })

  call.on('end', () => {
    console.log('bye server!')
  })

}


const getServer = () => {
  const server = new grpc.Server()
  server.addService(stream_test.streamTest.service, {
    unary: unaryHandler,
    streamClient: streamClientHandler,
    streamServer: streamServerHandler,
    streamDuplex: streamDuplexHandler
  })
  return server
}

const startServer = () => {
  const server = getServer()
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

export { getServer, startServer }