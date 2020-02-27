const fs = require('fs')
const inquirer = require('inquirer')

inquirer.prompt([
    { 
        type:"input",
        message:"what is your git hub username",
        name:"username",
    },
    {
        type: "input",
        message: "what is the title of your project?",
        name:"title",
     },
     {
         type: "input",
         message: "write a short description of your project",
         name:"description",
     },
     {
         type: "input",
         message: "what kind of license should your project have",
         name:"license",
     },
     {
         type: "input",
         message: "what command line should be run to install dependencies",
         name:"install",
     },
     {
         type: "input",
         message: "what command line should be run to run tests",
         name:"test",
     },
     {
         type: "input",
         message: "what does the user need to know about using the repo",
         name:"using",
         
     },
     {
         type: "input",
         message: "what does the user need to know about contributing to the repo",
         name:"contribute",
     },
     {
         type: "input",
         message: "questions?",
         name:"press enter for README",
     }
// ]).then(function(data){
//     const myUsername = data.username
//     console.log(myUsername)
// })

]).then(function(response){

    const username = response.username
    const title = response.title
    const description = response.description
    const license = response.license
    const install = response.install
    const using = response.using
    const test = response.test
    const contribute = response.contribute
    const queryUrl =  `https://api.github.com/users/${username}?client_id=${
        process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}`
    const questions = response.questions
    
    axios
    .get(queryUrl)
    .then(function(res){
        console.log(res)

        const location = res.data.location
    console.log("my location " + location)
    const email = res.data.email
    console.log("email " + email )
    const avatar = res.data.avatar_url
    console.log("avatar url " + avatar)

    const page = "#" + title  + "\n## Description\n" + description + "\n## Table of contents\n" +
    "* Installation: " + install + "\n* Usage: " + using + "\n* License: " + license + "\n* Contributing: " + contribute
    + "\n* Test: " + test + "\n* Questions: " + questions + "\n## Installation \n" + "To install necessary dependances, run the following command: \n" + "```\t" + install +  "```"
    + "\n## Usage \n" + using + "\n## Licencse \n" + `The project is licesned under the ${license} license` 
    + "\n## Contributing \n" + contribute 
    + "\n## Tests \n" +  "To run test run the following command: \n" + "```\t" + test +  "```"
    +"\n## Questions \n" + "* Email: " + email + "\n Meet with me: " + location 
    + "\n" + "![me](" + avatar  + ")" + "\n[![Generic badge](https://img.shields.io/badge/"+ "license" +"-"+ license + "-<COLOR>.svg)](https://shields.io/)"


    fs.writeFile("./readme2.md", page, function(err){
        if(err){
            throw err
        }console.log("finish")
    })
    })

   
})


