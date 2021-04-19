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
    let _nextId = 1;

    id = () => {
        return _nextId++;
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

    return {title: title, id, setTitle, getDescription, setDescription, getDueDate, setDueDate, getLabelColor, setLabelColor};
}


export {projectFactory, projectList};



