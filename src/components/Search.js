import React from "react"

function search({
    handleSearch
}) {
    return(
        <div>
            <form className="form-inline">
                <input className="form-control" type="search" onChange={event => handleSearch(event)}/>
                <button onClick ={event => handleSearch(event)}>Search</button>
            </form>
        </div>
    )
}

export default search