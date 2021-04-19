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
    let progress = 0;
    let orderPriority = 0;
    let headers = [];
    let items = [];
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
    function getProgress() {
        _setProgress();
        return progress;
    }    
    function _setProgress() {
        // read items in list and based on item.isComplete calculate overral project progress
        // if no items in the list, then progress is 0%
        
    }
    function addItem(item) {

    }
    function removeItem(item) {

    }

    return {getTitle, setTitle, getDescription, setDescription, getDueDate, setDueDate, getLabelColor, setLabelColor, getProgress, addItem, removeItem};
}


export {projectFactory, projectList};



