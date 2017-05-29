import grpc from 'grpc'

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startDuplexStream = () => {
  const stream_test = grpc.load('./proto/stream_test.proto').stream_test

  const client = new stream_test.streamTest('localhost:50051', grpc.credentials.createInsecure())

  const call = client.streamDuplex()

  let isAlive = true

  call.write({
    number: getRandomInt(1, 10)
  })

  call.on('data', ({ number }) => {
    if(isAlive) {
      console.log(number)
      call.write({
        number: number + 2
      })
    }
  })

  call.on('end', () => {
    console.log('bye')
  })

  setTimeout(() => {
    isAlive = false
    call.end()
  }, 30000)

}

export {
  startDuplexStream
}