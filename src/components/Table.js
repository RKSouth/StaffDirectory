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
    
          })

      })
  }


   renderTableData() {
      return this.state.filteredEmployees.map((filteredEmployees, index) => {
         const { image, id, firstname, lastname, age, email } = filteredEmployees //destructuring
         return (


            <tr key={id}>
               <td><img className="img-responsive" src={image} alt="logo"/></td>
               <td>{firstname}</td>
               <td>{lastname}</td>
               <td>{age}</td>
               <td>{email}</td>
            </tr>


         )
      })
   }

   render() {
      return (
         <div>
            <form className="form-inline">
                <input className="form-control" type="search" onChange={event => this.handleSearch(event)}/>
                   <button onClick ={event => this.handleSearch(event)}>Search</button>
             
            </form>
            {/* <h1 id='title'>React Dynamic Table</h1> */}
            {/* < Data /> */}
            <table id='employees' className="table">
              
                  <thead>
                     < autoSort />
                     {/* <tr> */}
                     {/* <th scope="col">Photo</th>
                        <th><button onClick={autoSort.Example()}>First
								
								</button></th>
                        <th scope="col"><button onClick={this.sort}>Last
								
								</button></th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                     </tr> */}
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



