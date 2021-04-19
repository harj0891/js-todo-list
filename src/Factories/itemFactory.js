/* item
- title
- description/notes
- isComplete (boolean)
- dueDate (optional)
- orderPriority (optional) -- can later introduce drag/drop 
- project (can only belong to 1 project, CAN be changed)
- heading (can only belong to 1 heading, CAN be changed)
*/

let itemList = [];

const itemFactory = (title, description, project, dueDate) => {
    isComplete = false;
    // orderPriority = 0;
    function getTitle() {
        return title;
    }
    function setTitle (newTitle) {
        title = newTitle;
    }
    function getDescription() {
        return description;
    }
    function setDescription(newDescription) {
        description = newDescription;
    }
    function getProject() {
        return project;
    }
    function setProject(newProject) {
        project = newProject;
    }

    function getDueDate() {
        return dueDate;
    }        
    function setDueDate(newDueDate) {
        dueDate = newDueDate;
    }
    function getIsComplete () {
        return isComplete;
    }   
    function setIsComplete (newIsComplete) {
        if (newIsComplete) {
            isComplete = true;
        } else {
            isComplete = false;
        }
    }

    return {getTitle, setTitle, getDescription, setDescription, getProject, setProject, getDueDate, setDueDate, getIsComplete, setIsComplete};
}

export {itemFactory, itemList};