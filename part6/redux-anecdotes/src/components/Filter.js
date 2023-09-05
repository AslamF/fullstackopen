import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = (props) => {

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const filterValue = event.target.value
        console.log(filterValue)
        dispatch(filterChange(filterValue))
    }

    const style = {
        marginBottom: 10
    }


    return (
    <div style={style}>    
        filter: <input onChange={handleChange} />
    </div>
    )
}

export default Filter