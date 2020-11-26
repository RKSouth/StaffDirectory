import axios from "axios"

export default {
    getEmployees: function() { 
            return axios.get("https://randomuser.me/api/?results=15"
            )
                
    //     return axios.get("https://randomuser.me/api/?results=15")
    // }.then(function (response) {
    //     console.log(response.data);
    //     // I need this data here ^^
    //     return response.data;
    // })
 
    
}
}
