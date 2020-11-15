//put headings on map make the table
import React from "react"
import API from "../utils/API"
import Data from "./Data"
import autoSort from "./Autosort"


//console.log(API.getEmployees());

class Table extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         employees: [],
         order: "descend",
        filteredEmployees: [{}],
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
   };

   headings = [
      { name: "image", width: "10%"}, 
      { name: "First", width: "10%"},
      { name: "Last", width: "10%"},
      { name: "phone", width: "20%"},
      { name: "email", width: "20%"},
      { name: "dob", width: "10%"}
  ]

  sorting = heading => {
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


   renderTableData() {
      return this.state.filteredEmployees.map((filteredEmployees, index) => {
         const { image, id, firstname, lastname, age, email } = filteredEmployees //destructuring
         return (


            <tr key={id}>
               <td><img className="img-responsive" src={image} alt="folks"/></td>
               <td>{firstname}</td>
               <td>{lastname}</td>
               <td>{age}</td>
               <td>{email}</td>
            </tr>


         )
      })
   }
   renderHeader() {
      return (this.state.headings.sort((headings, index) => {
         const { image, id, firstname, lastname, age, email } = headings
         return(
            <div>
            <tr>
              <th scope="col">{image}</th>
                        <th scope="col">{firstname}</th>
                        <th scope="col">{lastname}</th>
                        <th scope="col">{age}</th>
                        <th scope="col">{email}</th>
                     </tr>
               </div> 

         )

        
      }))
   }


   render() {
    return(
         <div>
            <form className="form-inline">
               <div className="card">
                <input className="form-control" type="search" placeholder="search"onChange={event => this.handleSearch(event)}/>
                   {/* <button onClick ={event => this.handleSearch(event)}>Search</button> */}
                   </div>
            </form>
            {/* <h1 id='title'>React Dynamic Table</h1> */}
            {/* < Data /> */}
            <table id='employees' className="table">
              
                  <thead>
                     <tr>
                  <th scope="col">image</th>
                        <th scope="col">firstname</th>
                        <th scope="col">lastname</th>
                        <th scope="col">age</th>
                        <th scope="col">email</th>
                     </tr>
                  </thead>

                  <tbody>
                
                     {/* <tr>{this.renderTableHeader()}</tr> */}
                     {this.renderTableData()}
                  </tbody>
               </table>
         </div>
    )
   }
}

export default Table



