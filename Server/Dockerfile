FROM golang:alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go mod download
RUN go get -v github.com/cosmtrek/air
RUN go get github.com/githubnemo/CompileDaemon
CMD [ "air"]
ENTRYPOINT CompileDaemon --build="go build server.go" --command=./Server