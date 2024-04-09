import "./App.css"//importing css
import { useEffect, useState } from "react" // imposting hooks called useEffect and useState( like react built in methods)
//from "react" package ^ 
import { getAllJokes, sendNewJokeToDataBase } from "./services/jokeService"


export const App = () => { // component( should be caps"App") called App with a .jsx (Html thats not in a string and dosent have to be interpelated) element
  const [allJokes, setAllJokes] = useState([]) //The first thing (allJokes) in this array is my state variable. that will likly change based on user input
  //.the 2nd thing in the array (setAllJokes) is a state setter function. you can call setAllJokes and it will set all jokes = what ever you pass into it as an argument. 
  //currently allJokes = []
  // by doing something like this-> "setAllJokes(money)" this makes the vareable allJokes = money

  const [newJoke, setNewJoke] = useState("")
  //currently newJoke = and empty sting
  //once lines 36-41 happen then the transient state is updated to be newJoke = the sting found in the event.target.value 
  //by using the function setNewJoke(event.target.value)
  const [showToldJokes, setShowToldJokes] = useState(false)
  const [showUntoldJokes, setShowUntoldJokes] = useState(true)
  const [filteredJokes, setFilteredJokes] = useState([])

  useEffect(() => { // useEffect runs the code thats passed inside of it everytime the component "app" renders
    getAllJokes().then((jokesArray) => {//calling getAllJokes function. After i got the results of the function THEN i want to do somthing with the result. 
      // jokesArray then equals the responce from getAllJokes.
      setAllJokes(jokesArray)// this line makes it so the vareable allJokes now is no longer equal to an empty array.
      // its now equal to jokesArray
      console.log("Jokes set!")
    })
  }, [])

  useEffect(() => { //This line is creating an effect that runs whenever the values of showEmergencyOnly or allTickets change.
    if (showToldJokes) {//This line checks if the value of showEmergencyOnly is true.
      const toldJokesArray = allJokes.filter//This line creates a new array called emergencyTickets that only contains the tickets from allTickets that have the property emergency set to true.
        (Joke => Joke.told === true
        )
      setFilteredJokes(toldJokesArray)//This line sets the value of filteredTickets to the emergencyTickets array.
    }
    if (showUntoldJokes) {
      const unToldJokesArray = allJokes.filter
        (Joke => Joke.told === false
        )
      setFilteredJokes(unToldJokesArray)//This line sets the value of filteredTickets to be the same as allTickets.

    }
  }, [showToldJokes, showUntoldJokes])//This line is JSX code that represents a container for displaying the tickets.

  return <div className="app-container">
    <div className="app-heading"> <h1 className="app-heading-text">Chuckle Checklist</h1> </div>
    <div className="joke-add-form"> <h2> Add Joke </h2>
      <input
        className="joke-input"
        type="text"
        placeholder="New One Liner"
        value={newJoke}
        onChange={(event) => {// onChange is an event handler
          //if there is a change on the input its self.... then
          setNewJoke(event.target.value) // event. targe.value is where the "newJoke string value is held"
          //set new joke^ using the state setter function. 
          // ^ this is updating Transient state for every change.
          console.log(newJoke)
        }}
      />
      <div className="buttonSection">
        <button className="joke-input-submit" onClick={() => {
          //first thing is we need to formate the newJoke
          //set told property to false
          const jokeToSendToDataBase = {// setting up the payload for the post request. 
            "text": newJoke,
            "told": false
          } // once we have the joke object how do we get it to the data? we need to send object with fetch

          sendNewJokeToDataBase(jokeToSendToDataBase)// this takes the post request and passes it as a n argument for the function that posts the new data. 
          setNewJoke("")// clears the state vareable of setNewJoke now that its been sent and saved to the database. 
        }}> Add </button>

      </div>


    </div>
    <div className="joke-lists-container">
      {allJokes.map((jokes) => {
        return (
          <section className="OneJoke" key={jokes.told}>{jokes.text}</section>
        )

      })}

    </div>

    <div className="joke-lists-container">

      <section className="OneJoke">{showUntoldJokes.text}</section>


    </div>

  </div>
}
