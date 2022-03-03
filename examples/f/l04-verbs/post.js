import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

let songs = ["Broken Whiskey Glass",
    "Big Lie",
    "Deja Vu",
    "No Option",
    "Cold",
    "White Iverson",
    "I Fall Apart",
    "Patient",
    "Go Flex",
    "Feel",
    "Too Young",
    "Congratulations",
    "Up There",
    "Yours Truly, Austin Post",
    "Paranoid",
    "Spoil My Night",
    "Rich & Sad",
    "Zack and Codeine",
    "Takin' Shots",
    "Rockstar",
    "Over Now",
    "Psycho",
    "Better Now",
    "Ball for Me",
    "Otherside",
    "Stay",
    "Blame It on Me",
    "Same Bitches",
    "Jonestown",
    "92 Explorer",
    "Candy Paint",
    "Sugar Wraith",
    "Hollywood's Bleeding",
    "Saint-Tropez",
    "Enemies",
    "Allergic",
    "A Thousand Bad Times",
    "Circles",
    "Die for Me",
    "On the Road",
    "Take What You Want",
    "I'm Gonna Be",
    "Staring at the Sun",
    "Sunflower",
    "Internet",
    "Goodbyes",
    "Myself",
    "I Know",
    "Wow",
    "One Right Now"];

app.post("/malone", (req, res) => {
    console.log(req.body);
    let match = songs.filter(
        (song) => song.toLowerCase().startsWith(req.body.title.toLowerCase())
    );

    res.send({matches: match}).end();
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
