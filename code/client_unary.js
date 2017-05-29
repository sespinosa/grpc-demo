import grpc from 'grpc'

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomOperation = (operations) => {
  const size = operations.length
  return operations[getRandomInt(0, size-1)]
}

const startUnary = () => {
  const stream_test = grpc.load('./proto/stream_test.proto').stream_test

  const client = new stream_test.streamTest('localhost:50051', grpc.credentials.createInsecure())

  setInterval(() => {
    client.unary({
      operator: getRandomOperation(['sum', 'sub', 'mul', 'div']),
      a: getRandomInt(10, 100),
      b: getRandomInt(10, 100)
    }, (err, response) => {
      console.log(response)
    })
  }, 4000)
}

export {
  startUnary
}

