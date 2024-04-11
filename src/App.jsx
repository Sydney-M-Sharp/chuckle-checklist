import "./App.css"
import { useEffect, useState } from "react"
import { eraseJokeTold, getAllJokes, sendNewJokeToDataBase, updateJokeTold } from "./services/jokeService"



export const App = () => {
  const [allJokes, setAllJokes] = useState([]) //allJokes is a state vareable 
  const [newJoke, setNewJoke] = useState("")

  const [toldJokes, setToldJokes] = useState([])
  const [unToldJokes, setUntoldJokes] = useState([])

  const changeToldValue = (JokeObject) => {// to do a pull request you need an id to pull the item from the database
    JokeObject.told = !JokeObject.told// find the key value of told and change it to the opposite
    updateJokeTold(JokeObject.id, JokeObject).then(() => render())//".then helps prevent a race condition. This is when things you exspect to happen after somthing happen before the other lines of code are done. 
  }
  const eraseJokeToldFromDatabase = (JokeObject) => {
    eraseJokeTold(JokeObject.id, JokeObject).then(() => render())
  }

  const render = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr)
    })
  }
  useEffect(() => {
    render()
    console.log("Jokes set!")
  }, [])


  useEffect(() => { // created this useEffect to take the place of the 2 that i made below.
    const unToldJokes = allJokes.filter(
      (joke => joke.told === false)
    )

    const toldJokes = allJokes.filter(
      (joke => joke.told === true)
    )

    setUntoldJokes(unToldJokes)
    setToldJokes(toldJokes)
  }, [allJokes])

  // useEffect(() => {
  //   getAllJokes().then((jokesArray) => {
  //     setAllJokes(jokesArray)
  //     console.log("Jokes set!")
  //   })
  // }, [])


  // useEffect(() => {
  //   const toldJokes = allJokes.filter(// .filter
  //     (joke => joke.told === true)// parameter if saying for every joke look at the value of the told property and if it is true return it. 
  //   )
  //   setToldJokes(toldJokes)
  // }, [allJokes]) // this is a dependency array and it is gonna wait for alljokes to change and it will render the useEffect again. 

  // useEffect(() => {
  //   const unToldJokes = allJokes.filter(
  //     (joke => joke.told === false)

  //   )
  //   setUntoldJokes(unToldJokes)
  // }, [allJokes])//dependency array= this ue effect is dependent on anything inside this array

  const renderButtons = (joke) => {
    return (
      <section className="joke-list-item" key={joke.id}><p className="joke-list-item-text">{joke.text}</p>
        <div className="joke-list-action-toggle">
          <button className="" onClick={() => {
            changeToldValue(joke)

          }}
          >toggle</button>
        </div>

        <div className="joke-list-action-delete">
          <button onClick={() => {
            eraseJokeToldFromDatabase(joke)
          }
          }

          > Erase </button>
        </div>

      </section>
    )
  }

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
          sendNewJokeToDataBase(jokeToSendToDataBase).then(() => {
            render()
            setNewJoke("")
          })
        }}> Add </button>
      </div>
    </div>



    <div className="joke-lists-container">

      <div className="joke-list-container">

        <h2> Untold Jokes <span className="untold-count">{unToldJokes.length}</span> </h2>



        {unToldJokes.map((joke) => {
          return renderButtons(joke)

        })}

      </div>



      <div className="joke-list-container">

        <h2> Told Jokes <span className="told-count">{toldJokes.length}</span></h2>

        {toldJokes.map((joke) => {//for every joke...
          return renderButtons(joke)

        })}


      </div>
    </div>

  </div>
}
