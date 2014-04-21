package main

import (
	"log"
	"net/http"
	"os"
	"path"
)

func fileHandler(w http.ResponseWriter, r *http.Request){
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	targetPath := path.Join(cwd, r.URL.Path)

	targetInfo, err := os.Stat(targetPath)
	if err != nil || targetInfo.IsDir() {
		http.ServeFile(w, r, path.Join(cwd, "index.html"))
	} else {
		http.ServeFile(w, r, targetPath)
	}
}

func main() {
	http.HandleFunc("/", fileHandler)

	log.Fatal(http.ListenAndServe(":8000", nil))
}
