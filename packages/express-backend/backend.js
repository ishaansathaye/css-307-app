import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// GET /users to fetch all the users, or by name, or by job
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService.getUsers(name, job)
    .then((result) => res.send({ users_list: result }))
    .catch(() => res.send(users));
});

// POST /users to create and insert a new user
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService.addUser(userToAdd)
    .then((addedUser) => res.status(201).send(addedUser))
    .catch(() => res.status(400).send("Invalid user data."));
});

// GET /users/<id> to fetch user by id
app.get("/users/:id", (req, res) => {
    userService.findUserById(req.params.id)
    .then((result) => res.send({ users_list: result }))
    .catch(() => res.status(404).send("Resource not found."));
});

// DELETE /users/<id> to remove a user, given their id
app.delete("/users/:id", (req, res) => {
    userService.deleteUserById(req.params.id)
    .then((result) => {
        res.status(204).send(result);
    })
    .catch(() => res.status(404).send("Resource not found."));
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
