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