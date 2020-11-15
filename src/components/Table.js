//put headings on map make the table
import React from "react"
import API from "../utils/API"
import Data from "./Data"

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

   //  renderTableHeader() {
   //     let header = Object.keys(this.state.employees[0])
   //      header.map((key, index) => {
   //       return <th key={index}>{key.toUpperCase()}</th>
   //    })
   // }

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
      return this.state.employees.map((employees, index) => {
         const { image, id, firstname, lastname, age, email } = employees //destructuring
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
                     <tr>
                     <th scope="col">Photo</th>
                        <th  onClick={() => {
              this.sort("First");
            }} scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
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




// ORIGINAL CODE -- DELETE EVERYTHING ABOVE
// function Table () {
//     return (
//         <div>
//         <h4>Employees:</h4>
//         <ul className="list-group">


//           {/* {state.map((item, index) => (
//             <li className="list-group-item col-12" key={item.id}>
//               {index}:<span className={item.priority ? "font-weight-bold" : ""}> {item.name}</span>
//             </li>
//           ))} */}
//         </ul>
//       </div>

//     )
// }

// export default Table