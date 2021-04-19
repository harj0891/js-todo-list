/* item
- title
- description/notes
- isComplete (boolean)
- dueDate (optional)
- orderPriority (optional) -- can later introduce drag/drop 
- project (can only belong to 1 project, can't be changed)
- heading (can only belong to 1 heading, CAN be changed)
*/

const itemFactory = (title, description, dueDate) => {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    isComplete = false;
    orderPriority = 0;
    getTitle = () => {
        return this.title;
    }
    setTitle = (newTitle) => {
        title = newTitle;
    }
    getDescription = () => {
        return this.description;
    }
    setDescription = (newDescription) => {
        description = newDescription;
    }
    getDueDate = () => {
        return this.dueDate;
    }        
    setDueDate = (newDueDate) => {
        dueDate = newDueDate;
    }
    getIsComplete = () => {
        return this.isComplete;
    }   
    setIsComplete = (newIsComplete) => {
        if (newIsComplete) {
            isComplete = true;
        } else {
            isComplete = false;
        }
    }

    return {getTitle, setTitle, getDescription, setDescription, getDueDate, setDueDate, getIsComplete, setIsComplete};
}

export {itemFactory};