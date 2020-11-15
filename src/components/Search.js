import React from "react"
import Data from "./Data"

function Search(props){
    return(
        <div>
            <form className="form-inline">
                <input className="form-control" type="search" onChange={event => handleSearch(event)}/>
             
            </form>
        </div>
    )
} 
   


export default Search