import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    
    function removeOneCharacter(index) {
        const url = `http://localhost:8000/users/${characters[index]._id}`;
        fetch(url, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.status === 204) {
                const updated = characters.filter((character, i) => {
                    return i !== index;
                });
                setCharacters(updated);
            } else {
                throw new Error("Failed to delete user.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    function updateList(person) { 
        postUser(person)
        .then((updatedUser) => setCharacters([...characters, updatedUser]))
        .catch((error) => {
            console.log(error);
        })
    }
    
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
    
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        })
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            } else {
                throw new Error("Failed to add user.");
            }
        });
        return promise;
    }

return (
    <div className="container">
    <Table 
    characterData={characters}
    removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList}/>
    </div>
);
}

export default MyApp;