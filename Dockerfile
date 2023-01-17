FROM golang:1.12.7-alpine3.10 AS build
# Support CGO and SSL
RUN apk --no-cache add gcc g++ make
RUN apk add git
WORKDIR /go/src/app
COPY . .
RUN go get github.com/joho/godotenv
RUN go get github.com/lib/pq
RUN go get github.com/gin-gonic/gin
RUN go get github.com/callummclu/callummclu.co.uk/configs
RUN go get github.com/callummclu/callummclu.co.uk/middleware
RUN go get github.com/callummclu/callummclu.co.uk/auth
RUN go get github.com/callummclu/callummclu.co.uk/controllers
RUN go get github.com/callummclu/callummclu.co.uk/services
RUN go get github.com/callummclu/callummclu.co.uk/models
RUN go get github.com/callummclu/callummclu.co.uk/auth
RUN go get github.com/golang-jwt/jwt/v4
RUN go get github.com/badoux/checkmail
RUN go mod tidy

RUN GOOS=linux go build -ldflags="-s -w" -o ./bin/test ./main.go

FROM alpine:3.10
RUN apk --no-cache add ca-certificates
WORKDIR /usr/bin
COPY --from=build /go/src/app/bin /go/bin
EXPOSE 8080
ENTRYPOINT /go/bin/test --port 8080