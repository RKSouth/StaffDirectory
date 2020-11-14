//import employee data into the main array

//set a hook pushing that array into a useState
//maybe create a blank slate maybe feed it the whole array to begin with 
//const [employees. setEmployees] = useState([])

//need user functionality ---> search, sort
//search will be a filter- filtering the main array into the 
//set employees hook

//very last thing we need to render a table based on an array that 
//that has both pictures text and email

//array  is [{listitmer,erere,ereere,er}]

//if maindata array is not used in set states 
//can we push to it from the axios call

//var global variable await axiois call or put into user context to access it anywhere
//avoid reading and writing to global variables in callbacks and promises

import React, { useEffect, useState } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import CardContainer from "../components/CardContainer";
import Row from "../components/Row";
import LanguageContext from "../utils/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";

function Main() {
    const [firstname, setFirstname] = useState([])

}