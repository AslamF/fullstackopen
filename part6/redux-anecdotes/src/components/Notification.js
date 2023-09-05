import { useSelector } from "react-redux"
import anecdoteReducer from "../reducers/anecdoteReducer"


const Notification = (props) => {
  const notification = useSelector(state => state.Notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      
      {notification}
    </div>
  )
}

export default Notification