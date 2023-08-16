import { useDispatch, useSelector} from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id);
        dispatch(castVote(id));
      }


    return (
        <div>
            
                {anecdotes
                        .sort(function(a, b) {
                            return (b.votes) - (a.votes);
                        })
                        .map(anecdote =>
                            <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )

}


export default AnecdoteList