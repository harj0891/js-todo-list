import DisplayController from './displayController';
import StorageController from './storageController';
import projectFactory from '../Factories/projectFactory';
import itemFactory from '../Factories/itemFactory';

const TodolistController = (function() {
    
    // mock data
    (function createMockData() {
        let projectList = StorageController.readProjectArray();
        let itemList = StorageController.readItemArray();

        if (projectList.length == 0) {
            let newProject = projectFactory("Shopping", "Grocery list", "2021-05-01", "green"); 
            projectList.push(newProject);
            StorageController.saveProjectArray(projectList);
    
            let newProject2 = projectFactory("Fitness", "Eye of the tiger", "2021-04-27", "blue"); 
            projectList.push(newProject2);
            StorageController.saveProjectArray(projectList);
    
            let newProject3 = projectFactory("Trading", "Stocks and shares", "2021-04-27", "red"); 
            projectList.push(newProject3);
            StorageController.saveProjectArray(projectList);

        }

       
        if (itemList.length == 0) {
            let newItem = itemFactory("Fruit", "apples, oranges, bananas", 1, "2021-04-27"); 
            itemList.push(newItem);
            StorageController.saveItemArray(itemList);
    
            let newItem2 = itemFactory("Pullups", "3 x 10", 2, "2021-04-27"); 
            itemList.push(newItem2);
            StorageController.saveItemArray(itemList);
    
            let newItem3 = itemFactory("Squats", "5 sets of 8 x 90kg", 2, "2021-04-27"); 
            itemList.push(newItem3);
            StorageController.saveItemArray(itemList);

        }      
        
    })();

    
    // init display
    DisplayController.displayProjects();
    DisplayController.displayToDoList(1);

    function createProject(title, description, dueDate, color) {
        let newProject = projectFactory(title, description, dueDate, color); 

        let projectList = StorageController.readProjectArray();
        projectList.push(newProject);
        StorageController.saveProjectArray(projectList);
    }

    function createItem(title, description, projectID, dueDate) {
        let newItem = itemFactory(title, description, projectID, dueDate); 
        let itemList = StorageController.readItemArray();
        itemList.push(newItem);
        StorageController.saveItemArray(itemList);
    }

    function updateProject(projectId, updatedTitle, updatedDescription, updatedDueDate, updatedColor) {
        // set project
        let projectList = StorageController.readProjectArray();
        let project;
        for (let i=0; i < projectList.length; i++) {
            if (projectList[i].id == projectId) {
                project = projectList[i];
            }
        }

        if (project) {
            project.title = updatedTitle;
            project.description = updatedDescription;
            project.dueDate = updatedDueDate;
            project.labelColor = updatedColor;
    
            StorageController.saveProjectArray(projectList);
        }
        
    }

    function updateItem(itemId, updatedTitle, updatedDescription, updatedDueDate, updatedIsComplete) {
        // set item
        let itemList = StorageController.readItemArray();
        let item;
        for (let i=0; i < itemList.length; i++) {
            if (itemList[i].id == itemId) {
                item = itemList[i];
            }
        }

        if (item) {
            item.title = updatedTitle;
            item.description = updatedDescription;
            item.dueDate = updatedDueDate;
            item.isComplete = updatedIsComplete;
    
            StorageController.saveItemArray(itemList);
        }
        
    }

    function deleteProject(projectId){
        let projectList = StorageController.readProjectArray();
        let itemList = StorageController.readItemArray();

        // delete associated items
        for(var i = 0; i < itemList.length; i++){ 
            
            if (itemList[i].project == projectId) { 
                deleteItem(itemList[i].id);
            }
        }

        // delete project
        for( var i = 0; i < projectList.length; i++){ 
            if (projectList[i].id === projectId) { 
                projectList.splice(i, 1); 
            }
        }

        StorageController.saveProjectArray(projectList);
    }

    function deleteItem(itemId) {
        let itemList = StorageController.readItemArray();
        for( var i = 0; i < itemList.length; i++){ 
            if (itemList[i].id == itemId) { 
                itemList.splice(i, 1); 
            }
        }

        StorageController.saveItemArray(itemList);
    }

    // TO DO 
//     function getProgress() {
//         // read items in list and based on item.isComplete calculate overral project progress
//         // if no items in the list, then progress is 0%
//         return progress;
//     }    
//     function changeProjectOrder() {
//         // read projects in list and update ordering (splice and then +1 to any after)
//     }

//     function changeItemOrder() {
//         // read projects in list and update ordering (splice and then +1 to any after)
//     }



    return {createProject, createItem, updateProject, updateItem, deleteProject, deleteItem};
})();

export default TodolistController;