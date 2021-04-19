/* project
- title
- description (optional)
- progress (in %)
- dueDate (optional)
- orderPriority (optional) -- can later introduce drag/drop 
- labelColor (optional) -- will change project label color
*/

let projectList = [];

const projectFactory = (title, description, dueDate, labelColor) => {
    id = () => {      
        let nextID;
        if (projectList.length == 0) {
            nextID = 1; 
        } else if (projectList.length > 0){
            nextID = projectList[projectList.length-1].id + 1;
        }
        return nextID;
    }

    function setTitle(newTitle) {
        this.title = newTitle;
    }

    function setDescription(newDescription) {
        this.description = newDescription;
    }

    function setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }
       
    function setLabelColor(newLabelColor) {
        this.labelColor = newLabelColor;
    }

    return {
        id: id(), 
        title: title, 
        description: description, 
        dueDate: dueDate, 
        labelColor: labelColor,
        setTitle,
        setDescription,
        setDueDate,
        setLabelColor
    };
}

export {projectFactory, projectList};



