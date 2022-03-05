import express from "express";

const app = express();
app.use(express.json());

/**
 * API:
 * - GET questions
 * - POST questions
 * - PATCH questions/:id
 * - DELETE questions/:id
 */

class question {
    constructor(title) {
        this.title = title;
        this.replies = [];
    }
}

class reply {
    constructor(voter, vote) {
        this.voter = voter;
        this.vote = vote;
    }
}

let questions = [];

app.get('/questions', (req, res) => {
    res.json(questions.map((q, index) => {
        return {
            "id": index,
            "title": q.title,
            "average": q.replies.reduce((total, current) => total += current.vote, 0) / q.replies.length,
            "votes": q.replies.length
        }
    }));
});

app.get('/questions/:id', (req, res) => {
    let q = questions[req.params.id];
    res.json({
        "id": req.params.id,
        "title": q.title,
        "average": q.replies.reduce((total, current) => total += current.vote, 0) / q.replies.length,
        "votes": q.replies.length
    });
});

app.post('/questions', (req, res) => {
    questions.push(new question(req.body.title));
    res.status(200).end();
});

app.patch('/questions/:id', (req, res) => {
    let selectedQuestion = questions[req.params.id];
    let voter = req.body.voter;
    let vote = req.body.vote;

    if (voter == undefined) {
        res.status(400);
        res.write("You need to supply `voter` to vote\n");
    }

    if (vote == undefined) {
        res.status(400);
        res.write("You need to supply `vote` to vote\n");
    }

    if (res.statusCode != 200) {
        res.send();
        return;
    }

    if (selectedQuestion == undefined) {
        res.status(404);
        res.send(`That question ${req.params.id} doesn't seem to exist\n`);
        return;
    }

    let matchingIndex = selectedQuestion.replies.findIndex((e) => e.voter == voter);
    if (matchingIndex >= 0) {
        selectedQuestion.replies[matchingIndex] = new reply(voter, vote);
    }
    else {
        selectedQuestion.replies.push(new reply(voter, vote));
    }

    res.end();
});

if (process.env.PORT == undefined) {
    process.env.PORT = 8080
}
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
