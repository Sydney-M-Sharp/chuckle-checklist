import "./App.css"
import { useEffect, useState } from "react"
import { getAllJokes, sendNewJokeToDataBase } from "./services/jokeService"


export const App = () => {
  const [allJokes, setAllJokes] = useState([]) //allJokes is a state vareable 
  const [newJoke, setNewJoke] = useState("")

  const [toldJokes, setToldJokes] = useState([])
  const [unToldJokes, setUntoldJokes] = useState([])


  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
      console.log("Jokes set!")
    })
  }, [])

  useEffect(() => {
    const toldJokes = allJokes.filter(// .filter
      (joke => joke.told === true)// parameter if saying for every joke look at the value of the told property and if it is true return it. 
    )
    setToldJokes(toldJokes)
  }, [allJokes]) // this is a dependency array and it is gonna wait for alljokes to change and it will render the useEffect again. 

  useEffect(() => {
    const unToldJokes = allJokes.filter(
      (joke => joke.told === false)

    )
    setUntoldJokes(unToldJokes)
  }, [allJokes])


  return <div className="app-container">

    <div className="app-heading">
      <h1 className="app-heading-text">Chuckle Checklist</h1>
      
    </div> 

    
        <h2> Add Joke </h2>
      <div className="joke-add-form">
       
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => {
            setNewJoke(event.target.value)
            console.log(newJoke)
          }}
        />

        <div className="buttonSection">
          <button className="joke-input-submit" onClick={() => {
            const jokeToSendToDataBase = {
              "text": newJoke,
              "told": false
            }
            sendNewJokeToDataBase(jokeToSendToDataBase)
            setNewJoke("")
          }}> Add </button>
        </div>
      </div>
    
          

    <div className="joke-lists-container">

      <div className="joke-list-container">

        <h2> Untold Jokes </h2>

        {unToldJokes.map((joke) => {
          return (
            <section className="joke-list-item" key={joke.id}><p className="joke-list-item-text">{joke.text}</p></section>
          )

        })}

      </div>



      <div className="joke-list-container">

        <h2> Told Jokes </h2>

        {toldJokes.map((joke) => {//for every joke...
          return (
            <section className="joke-list-item" key={joke.id}><p className="joke-list-item-text">{joke.text}</p></section>
          )

        })}


      </div>
    </div>

  </div>
}
