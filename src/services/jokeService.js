export const getAllJokes = async() =>{
    return await fetch(`http://localhost:8088/jokes`).then((res) =>res.json())
}

export const sendNewJokeToDataBase = async (jokeToSendToDataBase) =>{
    const postInstructions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(jokeToSendToDataBase) //payload is the argument for an api call. 
    }
    return await fetch(`http://localhost:8088/jokes`,postInstructions).then((res) =>res.json())
}
export const updateJokeTold = async (JokeId,JokeObject) =>{//put take the entire object and the id (say put this to this ID)
    const putInstructions = {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(JokeObject) //payload is the argument for an api call. 
    }
    return await fetch(`http://localhost:8088/jokes/${JokeId}`,putInstructions).then((res) =>res.json())
}

export const eraseJokeTold = async (JokeId,JokeObject) =>{//put take the entire object and the id (say put this to this ID)
    const deleteInstructions = {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(JokeObject) //payload is the argument for an api call. 
    }
    return await fetch(`http://localhost:8088/jokes/${JokeId}`,deleteInstructions)
}