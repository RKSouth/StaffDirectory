import React, { Component } from "react"
import API from "../utils/API"
import Search from "./Search"

 

console.log(API.getEmployees());

class Data extends Component {
     // state = {
    //     employees: [{Table.employees}],
    //     // order: "descend",
    //     // filteredEmployees: [{}],
    //     // employees: employees
    // }
    constructor(props) {
        super(props)
        this.state = {
           employees: [],
           order: "descend",
           filteredEmployees: [{}]
        };
     }
     componentDidMount = () => {
        console.log(API.getEmployees())
        API.getEmployees()
           .then((records) => {
              const empdata = records.results;
              const employeestemp = [];
              console.log(empdata)
              for (let i = 0; i < empdata.length; i++) {
                 let erecord = {
                    id: i + 1,
                    firstname: empdata[i].name.first,
                    lastname: empdata[i].name.last,
                    email: empdata[i].email,
                    image: empdata[i].picture.medium,
                    phone: empdata[i].cell,
                    age: empdata[i].dob.age,
                 };
                 employeestemp.push(erecord);
              }
              this.setState({ employees: employeestemp });
              console.log(this.state.employees);
           });
           console.log(API.getEmployees())
     };
   
  
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
        const filteredEmp = this.state.employeestemp.filter(folks => {
            //need to merge the data together to see if user input is anywhere inside
            let values = Object.values(folks).join("").toLowerCase()
            console.log(values);
            return values.indexOf(searchValue.toLowerCase())!== -1
        } )
        this.setState({
            filteredEmployees: filteredEmp
        })

    }

    componentDidMount({employees, filteredEmployees}){
        API.getEmployees().then(response => {
            console.log("Your Component Did mount");
            this.setState({
                employees: response.data,
                filteredEmployees: response.data
            })

        })
    }

    render() {
        return (
        <div>
            <Search handleSearch={this.handleSearch}/>
            <button onClick ={event => this.handleSearch(event)}>Search</button>
        </div>)
    }
}
export default Data