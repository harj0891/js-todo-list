
import {projectFactory, projectList} from "./Factories/projectFactory";
// import * as Header from "./Factories/headingFactory";
// import * as Item from "./Factories/itemFactory";

// mock data
(function createMockData() {
    let newProject = projectFactory("Default", "Default project", "test", "Grey"); 
    projectList.push(newProject);

    let newProject2 = projectFactory("Default2", "Default project2", "test2", "Grey2"); 
    projectList.push(newProject2);

    let newProject3 = projectFactory("Default3", "Default project3", "test3", "Grey3"); 
    projectList.push(newProject3);

    let newItem = itemFactory("Item1", "item 1 desc", 1, "test"); 
    itemList.push(newItem);

    let newItem2 = itemFactory("Item2", "item 2 desc", 1, "test"); 
    itemList.push(newItem2);

    let newItem3 = itemFactory("Item3", "item 3 desc", 2, "test"); 
    itemList.push(newItem3);
})();

// render projects and items to console
(function renderOutput() {
    projectList.forEach(project => {
        console.log(`PROJECT | ID: ${project.id}, Title: ${project.title}`)
        
        itemList.forEach(item => {
            if (item.project == project.id) {
                console.log(`ITEM | ID: ${item.id}, Title: ${item.title}`)
            }
        })
    });
})();


