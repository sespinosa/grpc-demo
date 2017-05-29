import grpc from 'grpc'

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const startClientStream = () => {
  const stream_test = grpc.load('./proto/stream_test.proto').stream_test

  const client = new stream_test.streamTest('localhost:50051', grpc.credentials.createInsecure())

  setInterval(() => {
    const call = client.streamClient({ message: 'test_string'})

    call.on('data', (msg) => {
      console.log(msg)
    })

    call.on('end', () => {
      console.log('StreamClient ended.')
    })
  }, 3000)

}

export {
  startClientStream
}

