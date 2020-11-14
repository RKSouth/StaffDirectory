import React, { Component } from "react"
import API from "../utils/API"
import Search from "./Search"

export default class Data extends Component {
    state = {
        employees: [{}],
        order: "descend",
        filteredEmployees: [{}],
    }

    headings = [
        { name: "image", width: "10%"}, 
        { name: "name", width: "10%"},
        { name: "phone", width: "20%"},
        { name: "email", width: "20%"},
        { name: "dob", width: "10%"}
    ]

    sort = heading => {
        if (this.state.order === "descend") {
            this.setState({order: "ascend" })
        } else {
            this.setState({order: "descend"})}
        const compare = (a,b) => {
            if (this.state.order === "ascend") {
                if (a[heading]=== undefined) {
                    return 1
                } else if (b[heading] === undefined) {
                    return -1
                } else if (heading === "name") {
                    return a[heading].first.localeCompare(b[heading].first)
                } else {
                    return a[heading] -b[heading]
                }
            } else {
                if (a[heading]=== undefined) {
                    return 1
                } else if (b[heading] === undefined) {
                    return -1
                } else if (heading === "name") {
                    return b[heading].first.localeCompare(a[heading].first)
                } else {
                    return b[heading] -a[heading]
                }
            }
        }
        const sortedEmployees = this.state.filteredEmployees.sort( compare );
        this.setState({
            filteredEmployees: sortedEmployees
        })
    }

    handleSearch = event => {
        //gets the actual value out of the search box
        const searchValue = event.target.value
        const filteredEmp = this.state.employees.filter(folks => {
            //need to merge the data together to see if user input is anywhere inside
            let values = Object.values(folks).join("").toLowerCase()
            return values.indexOf(searchValue.toLowerCase())!== -1
        } )
        this.setState({
            filteredEmployees: filteredEmp
        })

    }

    componentDidMount(){
        API.getEmployees().then(response => {
            this.setState({
                employees: response.data.results,
                filteredEmployees: response.data.results
            })

        })
    }

    render() {
        return (
        <div>
            <Search handleSearch={this.handleSearch}/>
        </div>)
    }
}