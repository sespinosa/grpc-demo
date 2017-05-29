import grpc from 'grpc'

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const startServerStream = () => {
  const stream_test = grpc.load('./proto/stream_test.proto').stream_test

  let nums = []

  const client = new stream_test.streamTest('localhost:50051', grpc.credentials.createInsecure())
  const call = client.streamServer((err, res) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log(`res is ${res.result}`)
      console.log(`nums are ${nums}`)
    }
  })

  for(let i = 0 ; i < 10 ; i++) {
    nums.push(getRandomInt(1, 100))
    call.write({
      number: nums[i]
    })
  }

  call.end()

}

export {
  startServerStream
}

