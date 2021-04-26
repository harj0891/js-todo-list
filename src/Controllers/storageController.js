import projectFactory from '../Factories/projectFactory';
import itemFactory from '../Factories/itemFactory';


const StorageController = (function() { 
    function readProjectArray() {
        let projects = JSON.parse(localStorage.getItem("projects") || "[]");
        if (projects.length > 0) {
            projects.forEach(project => {
                Object.assign(projectFactory, project);
            });      
        }
        return projects;
    }

    function readItemArray() {
        let items = JSON.parse(localStorage.getItem("items") || "[]");
        if (items.length > 0) {
            items.forEach(item => {
                Object.assign(itemFactory, item);
            });      
        }
        return items;
    }
    
    function saveProjectArray(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function saveItemArray(items) {
        localStorage.setItem("items", JSON.stringify(items));
    }
    
    return {readProjectArray, readItemArray, saveProjectArray, saveItemArray};

})();

export default StorageController;