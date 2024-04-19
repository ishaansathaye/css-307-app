import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);   
    res.status(201).send(userToAdd);
});

// implement a hard delete operation to remove a user by id from the list
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const userToDelete = findUserById(id);
    if (userToDelete === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        const index = users["users_list"].indexOf(userToDelete);
        users["users_list"].splice(index, 1);
        res.send(userToDelete);
    }
});

// implement an additional action to get all users that match a given name
// and a given job
app.get("/users/:name/:job", (req, res) => {
    const name = req.params["name"];
    const job = req.params["job"];
    const result = users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
    res.send({ users_list: result });
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
