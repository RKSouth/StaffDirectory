//put headings on map make the table
import React, { Component }  from "react"
import API from "../utils/API"
import Data from "./Data"

//console.log(API.getEmployees());

class Table extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         employees: [],
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
                id: i+1,
                name: empdata[i].name.first + " " + empdata[i].name.last,
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
 
    renderTableData() {
       return this.state.employees.map((employees, index) => {
          const { id, name, age, email } = employees //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{email}</td>
             </tr>
          )
       })
    }
 
    render() {
       return (
          <div>
             <h1 id='title'>React Dynamic Table</h1>
             {/* < Data /> */}
             <table id='employees'>
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