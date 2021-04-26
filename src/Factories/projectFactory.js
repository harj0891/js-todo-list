/* project
- title
- description (optional)
- progress (in %)
- dueDate (optional)
- orderPriority (optional) -- can later introduce drag/drop 
- labelColor (optional) -- will change project label color
*/

import StorageController from '../Controllers/storageController';

const projectFactory = (title, description, dueDate, labelColor) => {
    let id = () => {      
        let nextID;
        let projectList = StorageController.readProjectArray();

        if (projectList.length == 0) {
            nextID = 1; 
            return nextID;
        } else if (projectList.length > 0){
            let lastID = projectList[projectList.length-1].id
            nextID = lastID + 1;
            return nextID;
        }
    }

    return {
        id: id(), 
        title: title, 
        description: description, 
        dueDate: dueDate, 
        labelColor: labelColor
    };
}


export default projectFactory;