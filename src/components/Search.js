import React from "react"

function search({
    handleSearch
}) {
    return(
        <div>
            <form className="form-inline">
                <input className="form-control" type="search" onChange={event => handleSearch(event)}/>
            </form>
        </div>
    )
}

export default search