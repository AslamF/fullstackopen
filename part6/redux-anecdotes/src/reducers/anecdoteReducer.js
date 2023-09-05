import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
/*
export const castVote = (id) => {
  return{
    type: 'VOTE',
    payload: {
      id
    }
  }
}

export const createAnecdoteAction = (content) => {
  return{
    type: "CREATE",
    payload: {
      content,
      id: getId(),
      votes: 0
    }

  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if (action.type === "VOTE") {
    const id = action.payload.id; // this gives us access to the id of the action that was sent
    const voteToBeCast = state.find(n => n.id === id);
    const voteCasted = {
      ...voteToBeCast,
      votes: voteToBeCast.votes += 1
    }
    return state.map(anecdote => 
      anecdote.id !== id ? anecdote : voteCasted
      )
   
  }
  else if (action.type === "CREATE"){
    const newObject = action.payload; 
    return state.concat(newObject)


  }
  return state
}
*/
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdoteAction(state, action) {
      const content = action.payload;
      state.push({
        content,
        id:getId(),
        votes: 0
      })
    },
    castVote(state, action) {
    const id = action.payload; // this gives us access to the id of the action that was sent
    const voteToBeCast = state.find(n => n.id === id);
    const voteCasted = {
      ...voteToBeCast,
      votes: voteToBeCast.votes + 1
    }

    console.log(JSON.parse(JSON.stringify(state)))
    
    return state.map(anecdote => 
      anecdote.id !== id ? anecdote : voteCasted
      )
    }
  },
  appendAnecdote(state, action) {
    state.push(action.payload)
  },
  setAnecdotes(state, action) {
    return action.payload
  }
})
export const {createAnecdoteAction, castVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer