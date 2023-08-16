import { useDispatch } from "react-redux";
import { createAnecdoteAction } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdote = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        const anecdote = event.target.anecdoteContent.value
        console.log("anecdote created")
        console.log(anecdote)
        dispatch(createAnecdoteAction(anecdote))
      }


    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div><input name ='anecdoteContent'/></div>
            <button>create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm