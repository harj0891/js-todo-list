/* project
- title
- description (optional)
- progress (in %)
- dueDate (optional)
- orderPriority (optional) -- can later introduce drag/drop 
- labelColor (optional) -- will change project label color
*/

let projectList = [];
let itemList = [];

const projectFactory = (title, description, dueDate, labelColor) => {
    id = () => {
        let nextID;

        if (projectList.length > 0) {
            nextID = projectList[projectList.length-1].id + 1;
            console.log(nextID);
            return nextID;
        } else {
            nextID = 1; 
            console.log(nextID);
            return nextID;
        }

        
    }

    function getTitle() {
        return title;
    }
    function setTitle(newTitle) {
        title = newTitle;
    }
    function getDescription() {
        return description;
    }
    function setDescription(newDescription) {
        description = newDescription;
    }
    function getDueDate() {
        return dueDate;
    }
    function setDueDate(newDueDate) {
        dueDate = newDueDate;
    }
    function getLabelColor() {
        return labelColor;
    }        
    function setLabelColor(newLabelColor) {
        labelColor = newLabelColor;
    }

    return {title: title, id: id(), setTitle, getDescription, setDescription, getDueDate, setDueDate, getLabelColor, setLabelColor};
}

// const itemFactory = (title, description, project, dueDate) => {
//     isComplete = false;
//     // orderPriority = 0;
//     function getTitle() {
//         return title;
//     }
//     function setTitle (newTitle) {
//         title = newTitle;
//     }
//     function getDescription() {
//         return description;
//     }
//     function setDescription(newDescription) {
//         description = newDescription;
//     }
//     function getProject() {
//         return project;
//     }
//     function setProject(newProject) {
//         project = newProject;
//     }

//     function getDueDate() {
//         return dueDate;
//     }        
//     function setDueDate(newDueDate) {
//         dueDate = newDueDate;
//     }
//     function getIsComplete () {
//         return isComplete;
//     }   
//     function setIsComplete (newIsComplete) {
//         if (newIsComplete) {
//             isComplete = true;
//         } else {
//             isComplete = false;
//         }
//     }

//     return {getTitle, setTitle, getDescription, setDescription, getProject, setProject, getDueDate, setDueDate, getIsComplete, setIsComplete};
// }

let newProject = projectFactory("Default", "Default project", "test", "Grey"); 
let newProject2 = projectFactory("Default2", "Default project2", "test2", "Grey2"); 
projectList.push(newProject);
projectList.push(newProject2);
console.log(projectList);

// let newItem = itemFactory("item1", "item desc", )


