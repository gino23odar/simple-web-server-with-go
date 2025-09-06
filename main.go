package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))

	http.Handle("/", fs)

	addr := ":8080"
	log.Printf("Starting server on %s\n", addr)
	if err := http.ListenAndServe(addr, nil); err != nil{
		log.Fatalf("server failed to start: %v", err)
	}
}