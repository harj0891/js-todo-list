
import {projectFactory, projectList} from "./Factories/projectFactory";
// import * as Header from "./Factories/headingFactory";
// import * as Item from "./Factories/itemFactory";




// setup detault project
let newProject = projectFactory("Default", "Default project", "test", "Grey"); 
projectList.push(newProject);
console.log(projectList[0].getTitle());



