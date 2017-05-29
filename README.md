# grpc-demo


### Install stuff

```
npm install

```


### Run for development

```
npm run serve
```

This allows the code to be restarted on change (is using nodemon).



### Deploy 


```
npm run build
```

This will generate the `/build` directory, thats the production code.


### Test production

```
npm run production
```

This will run the code of the `/build` folder (thats the code generated after traspiling).



The es6 code should be placed on the `code` folder!

# Usage

This demo is oriented to understand how you can use a grpc connection to send data, its pretty ugly but it works, this is self contained so you can run the diferent instances with env params.

### To run the server!
```
type=server npm run serve
```

### client using the unary request

```
type=client instance=unary npm run serve
```

### Client using the streaming to the client from the server, (you send 1 request and recieve a bunch of thing in a stream)

```
type=client instance=sc npm run serve
```

### Client using the streaming from the server (you send a stream of a bunch of stuff to the server, and when is finished the client gets one response)

```
type=client instance=ss npm run serve
```

### Client on duplex mode (stream to the server and from the server, independent)

in this case i implemented something reading a number in the stream on the server and responding with the number + 2, in this case is sync because waits for data to respond, but you can stream in both ways without waiting for a response.

```
type=client instance=sd npm run serve
```

Hope it helps someone.
