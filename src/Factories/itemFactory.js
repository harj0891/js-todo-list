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

    let id = () => {      
        let nextID;
        if (itemList.length == 0) {
            nextID = 1; 
            return nextID;
        } else if (itemList.length > 0){
            nextID = itemList[itemList.length-1].id + 1;
            return nextID;
        }
    }

    function setTitle (newTitle) {
        this.title = newTitle;
    }

    function setDescription(newDescription) {
        this.description = newDescription;
    }

    function setProject(newProject) {
        this.project = newProject;
    }

    function setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    function setIsComplete (newIsComplete) {
        if (newIsComplete) {
            this.isComplete = true;
        } else {
            this.isComplete = false;
        }
    }

    return {
        id: id(), 
        title: title, 
        description: description, 
        dueDate: dueDate,
        project: project, 
        isComplete: isComplete,
        setTitle, 
        setDescription, 
        setProject, 
        setDueDate, 
        setIsComplete
    };
}
export {itemFactory, itemList};