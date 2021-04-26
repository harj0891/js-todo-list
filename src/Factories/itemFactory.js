/* item
- title
- description/notes
- isComplete (boolean)
- dueDate (optional)
- orderPriority (optional) -- can later introduce drag/drop 
- project (can only belong to 1 project, CAN be changed)
- heading (can only belong to 1 heading, CAN be changed)
*/

import StorageController from '../Controllers/storageController';

const itemFactory = (title, description, project, dueDate) => {
    let isComplete = false;
    let itemList = StorageController.readItemArray();

    let id = () => {      
        let nextID;
        if (itemList.length == 0) {
            nextID = 1; 
            return nextID;
        } else if (itemList.length > 0){
            let lastID = itemList[itemList.length-1].id;
            nextID = lastID + 1;
            return nextID;
        }
    }

    return {
        id: id(), 
        title: title, 
        description: description, 
        dueDate: dueDate,
        project: project, 
        isComplete: isComplete
    };
}

export default itemFactory;