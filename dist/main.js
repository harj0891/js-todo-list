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

const itemFactory = (title, description, project, dueDate) => {
    isComplete = false;
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


const DisplayController = (function() {
    // button event listeners
    let newProjectButton = document.querySelector("#create-project");
    newProjectButton.addEventListener("click", function() {
        showCreateProjectForm();
    
    });

    function displayToDoList() {
        let projectList = StorageController.readProjectArray();
        let itemList = StorageController.readItemArray();

        let todolistContainer = document.querySelector("#container-todolist");
        todolistContainer.innerHTML = "";
    
        projectList.forEach(project => {
            let projectContainer = document.createElement("section");
            projectContainer.setAttribute("id", `container-project-${project.id}`);

            switch (project.labelColor) {
                case ("grey"):
                    projectContainer.setAttribute("class", "label-grey");
                    break;
                case ("blue"):
                    projectContainer.setAttribute("class", "label-blue");
                    break;
                case ("red"):
                    projectContainer.setAttribute("class", "label-red");
                    break;
                case ("green"):
                    projectContainer.setAttribute("class", "label-green");
                    break;
            }

            let projectInfo = document.createElement("p");
            projectInfo.textContent = `PROJECT | ID: ${project.id}, Title: ${project.title}`;

            let newItemButton = document.createElement("button");
            newItemButton.textContent = "+";
            newItemButton.addEventListener("click", function() {
                let createItemForm = showCreateItemForm(project.id);
                
                if (createItemForm) {
                    projectContainer.appendChild(createItemForm);
                }
                
            });

            let buttonProjectUpdate = document.createElement("button");
            buttonProjectUpdate.textContent = "EDIT";
            buttonProjectUpdate.addEventListener("click", function() {
                showUpdateProjectForm(project.id)
            });

            let buttonProjectDelete = document.createElement("button");
            buttonProjectDelete.textContent = "DELETE";
            buttonProjectDelete.addEventListener("click", function() {
                showDeleteProjectForm(project);
            });
            
            projectContainer.appendChild(projectInfo);
            projectContainer.appendChild(buttonProjectUpdate);
            projectContainer.appendChild(buttonProjectDelete);
            
            itemList.forEach(item => {
                if (item.project == project.id) {
                    let itemContainer = document.createElement("section");
                    itemContainer.setAttribute("id", `container-item-${item.id}`);
                    itemContainer.setAttribute("class", 'item');

                    let itemCheckbox = document.createElement("input");
                    itemCheckbox.setAttribute("id","item-checkbox");
                    itemCheckbox.setAttribute("type","checkbox");
                    itemCheckbox.addEventListener("change", function(){
                        submitUpdateItem(item.id, item.title, item.description, item.dueDate, this.checked);
                    });

                    if (item.isComplete) {                        
                        itemContainer.setAttribute("class", 'item completed');
                        itemCheckbox.checked = true;
                    }


                    let iteminfo = document.createElement("p");
                    iteminfo.textContent = `ITEM | ID: ${item.id}, Title: ${item.title}`;

                    let buttonItemUpdate = document.createElement("button");
                    buttonItemUpdate.textContent = "edit";
                    buttonItemUpdate.addEventListener("click", function() {
                        showUpdateItemForm(item.id);
                    });


                    let buttonItemDelete = document.createElement("button");
                    buttonItemDelete.textContent = "x";
                    buttonItemDelete.addEventListener("click", function() {
                        submitDeleteItem(item.id)
                    });

                    itemContainer.appendChild(itemCheckbox);
                    itemContainer.appendChild(iteminfo);
                    itemContainer.appendChild(buttonItemUpdate);
                    itemContainer.appendChild(buttonItemDelete);
                    projectContainer.appendChild(itemContainer);
                }
            })

            projectContainer.appendChild(newItemButton);
            todolistContainer.appendChild(projectContainer);
        });
    };

    function showCreateProjectForm() {
        let navigationContainer = document.querySelector("#container-navigation");

        // check if form already exists 
        let alreadyExists = document.querySelector("#create-project-form");
        if (alreadyExists) {
            console.log("project create form already open");
            // do nothing
        } else {
            let projectContainer = document.createElement("section");
            projectContainer.setAttribute("id","create-project-form");
    
            let projectNameLabel = document.createElement("label");
            projectNameLabel.setAttribute("for","pname");
            projectNameLabel.textContent = "Name";

            let projectNameField = document.createElement("input");
            projectNameField.setAttribute("id","pname");

            let projectDescLabel = document.createElement("label");
            projectDescLabel.setAttribute("for","pdesc");
            projectDescLabel.textContent = "Description";

            let projectDescField = document.createElement("input");
            projectDescField.setAttribute("id","pdesc");

            let projectDueDateLabel = document.createElement("label");
            projectDueDateLabel.setAttribute("for","pduedate");
            projectDueDateLabel.textContent = "Due Date";

            let projectDueDateField = document.createElement("input");
            projectDueDateField.setAttribute("id","pduedate");

            let projectColorLabel = document.createElement("label");
            projectColorLabel.setAttribute("for","pcolor");
            projectColorLabel.textContent = "Colour";

            let projectColorField = document.createElement("select");
            projectColorField.setAttribute("id","pcolor");

            let colorGrey = document.createElement("option");
            colorGrey.setAttribute("value","grey");
            colorGrey.textContent = "Grey";

            let colorBlue = document.createElement("option");
            colorBlue.setAttribute("value","blue");
            colorBlue.textContent = "Blue";

            let colorRed = document.createElement("option");
            colorRed.setAttribute("value","red");
            colorRed.textContent = "Red";

            let colorGreen = document.createElement("option");
            colorGreen.setAttribute("value","green");
            colorGreen.textContent = "Green";

            projectColorField.appendChild(colorGrey);
            projectColorField.appendChild(colorBlue);
            projectColorField.appendChild(colorRed);
            projectColorField.appendChild(colorGreen);

            let projectCreateButton = document.createElement("button");
            projectCreateButton.textContent = "Create project";

            projectContainer.appendChild(projectNameLabel);
            projectContainer.appendChild(projectNameField);
            projectContainer.appendChild(projectDescLabel);
            projectContainer.appendChild(projectDescField);
            projectContainer.appendChild(projectDueDateLabel);
            projectContainer.appendChild(projectDueDateField);
            projectContainer.appendChild(projectColorLabel);
            projectContainer.appendChild(projectColorField);
            projectContainer.appendChild(projectCreateButton);
    
            navigationContainer.appendChild(projectContainer); 

            // create button event listener
            projectCreateButton.addEventListener("click", submitCreateProject);
        }
    }

    function showCreateItemForm(projectID) {
        // check if form already exists 
        let alreadyExists = document.querySelector(`#create-item-form-p${projectID}`);
    
        if (alreadyExists) {
            console.log("item create form already open");
            // do nothing
        } else {
            let itemContainer = document.createElement("section");
            itemContainer.setAttribute("id",`create-item-form-p${projectID}`);
    
            let itemNameLabel = document.createElement("label");
            itemNameLabel.setAttribute("for","itemname");
            itemNameLabel.textContent = "Name";

            let itemNameField = document.createElement("input");
            itemNameField.setAttribute("id","itemname");

            let itemDescLabel = document.createElement("label");
            itemDescLabel.setAttribute("for","itemdesc");
            itemDescLabel.textContent = "Description";

            let itemDescField = document.createElement("input");
            itemDescField.setAttribute("id","itemdesc");

            let itemDueDateLabel = document.createElement("label");
            itemDueDateLabel.setAttribute("for","itemduedate");
            itemDueDateLabel.textContent = "Due Date";

            let itemDueDateField = document.createElement("input");
            itemDueDateField.setAttribute("id","itemduedate");

            let itemCreateButton = document.createElement("button");
            itemCreateButton.textContent = "Create item";

            itemContainer.appendChild(itemNameLabel);
            itemContainer.appendChild(itemNameField);
            itemContainer.appendChild(itemDescLabel);
            itemContainer.appendChild(itemDescField);
            itemContainer.appendChild(itemDueDateLabel);
            itemContainer.appendChild(itemDueDateField);
            itemContainer.appendChild(itemCreateButton);

            
            // create button event listener
            itemCreateButton.addEventListener("click", function() {
                submitCreateItem(projectID)
            });

            return itemContainer; 

        }
    }

    function showUpdateProjectForm(projectID) {
        // set project
        let projectList = StorageController.readProjectArray();
        let project;
        for (let i=0; i < projectList.length; i++) {
            if (projectList[i].id == projectID) {
                project = projectList[i];
            }
        }

        let requestingProjectContainer = document.querySelector(`#container-project-${project.id}`);

        // check if form already exists 
        let alreadyExists = document.querySelector("#update-project-form");
        if (alreadyExists) {
            console.log("project update form already open");
            // do nothing
        } else {
            let projectContainer = document.createElement("section");
            projectContainer.setAttribute("id","update-project-form");
    
            let projectNameLabel = document.createElement("label");
            projectNameLabel.setAttribute("for","pname");
            projectNameLabel.textContent = "Name";

            let projectNameField = document.createElement("input");
            projectNameField.setAttribute("id","pname");
            projectNameField.value = project.title;

            let projectDescLabel = document.createElement("label");
            projectDescLabel.setAttribute("for","pdesc");
            projectDescLabel.textContent = "Description";

            let projectDescField = document.createElement("input");
            projectDescField.setAttribute("id","pdesc");
            projectDescField.value = project.description;

            let projectDueDateLabel = document.createElement("label");
            projectDueDateLabel.setAttribute("for","pduedate");
            projectDueDateLabel.textContent = "Due Date";

            let projectDueDateField = document.createElement("input");
            projectDueDateField.setAttribute("id","pduedate");
            projectDueDateField.value = project.dueDate;

            let projectColorLabel = document.createElement("label");
            projectColorLabel.setAttribute("for","pcolor");
            projectColorLabel.textContent = "Colour";

            let projectColorField = document.createElement("select");
            projectColorField.setAttribute("id","pcolor");

            let optionGrey = document.createElement("option");
            optionGrey.setAttribute("value","grey");
            optionGrey.textContent = "Grey";

            let optionBlue = document.createElement("option");
            optionBlue.setAttribute("value","blue");
            optionBlue.textContent = "Blue";

            let optionRed = document.createElement("option");
            optionRed.setAttribute("value","red");
            optionRed.textContent = "Red";

            let optionGreen = document.createElement("option");
            optionGreen.setAttribute("value","green");
            optionGreen.textContent = "Green";

            projectColorField.appendChild(optionGrey);
            projectColorField.appendChild(optionBlue);
            projectColorField.appendChild(optionRed);
            projectColorField.appendChild(optionGreen);

            switch (project.labelColor) {
                case ("grey"):
                    optionGrey.setAttribute("selected", "selected");
                    break;
                case ("blue"):
                    optionBlue.setAttribute("selected", "selected");
                    break;
                case ("red"):
                    optionRed.setAttribute("selected", "selected");
                    break;
                case ("green"):
                    optionGreen.setAttribute("selected", "selected");
                    break;
            }
            

            let projectUpdateButton = document.createElement("button");
            projectUpdateButton.textContent = "Update project";

            projectContainer.appendChild(projectNameLabel);
            projectContainer.appendChild(projectNameField);
            projectContainer.appendChild(projectDescLabel);
            projectContainer.appendChild(projectDescField);
            projectContainer.appendChild(projectDueDateLabel);
            projectContainer.appendChild(projectDueDateField);
            projectContainer.appendChild(projectColorLabel);
            projectContainer.appendChild(projectColorField);
            projectContainer.appendChild(projectUpdateButton);
    
            // hide field and show form instead
            requestingProjectContainer.firstChild.style.display = "none";
            requestingProjectContainer.insertBefore(projectContainer, requestingProjectContainer.firstChild);
            
            // update button event listener
            projectUpdateButton.addEventListener("click", function() {
                let projectId = project.id;
                
                submitUpdateProject(projectId, projectNameField.value, projectDescField.value, projectDueDateField.value, projectColorField.value);
                
            });
        }
    }

    function showUpdateItemForm(itemID) {
        // set item
        let itemList = StorageController.readItemArray();
        let item;
        for (let i=0; i < itemList.length; i++) {
            if (itemList[i].id == itemID) {
                item = itemList[i];
            }
        }

        let requestingItemContainer = document.querySelector(`#container-item-${item.id}`);

        // check if form already exists 
        let alreadyExists = document.querySelector(`#update-item-form-${item.id}`);
        if (alreadyExists) {
            console.log("item update form already open");
            // do nothing
        } else {
            let itemContainer = document.createElement("section");
            itemContainer.setAttribute("id",`update-item-form-${item.id}`);
    
            let itemNameLabel = document.createElement("label");
            itemNameLabel.setAttribute("for","itemname");
            itemNameLabel.textContent = "Name";
            
            let itemNameField = document.createElement("input");
            itemNameField.setAttribute("id","itemname");
            itemNameField.value = item.title;

            let itemDescLabel = document.createElement("label");
            itemDescLabel.setAttribute("for","itemdesc");
            itemDescLabel.textContent = "Description";

            let itemDescField = document.createElement("input");
            itemDescField.setAttribute("id","itemdesc");
            itemDescField.value = item.description;

            let itemDueDateLabel = document.createElement("label");
            itemDueDateLabel.setAttribute("for","itemduedate");
            itemDueDateLabel.textContent = "Due Date";

            let itemDueDateField = document.createElement("input");
            itemDueDateField.setAttribute("id","itemduedate");
            itemDueDateField.value = item.dueDate;

            let itemUpdateButton = document.createElement("button");
            itemUpdateButton.textContent = "Update item";

            itemContainer.appendChild(itemNameLabel);
            itemContainer.appendChild(itemNameField);
            itemContainer.appendChild(itemDescLabel);
            itemContainer.appendChild(itemDescField);
            itemContainer.appendChild(itemDueDateLabel);
            itemContainer.appendChild(itemDueDateField);
            itemContainer.appendChild(itemUpdateButton);
    
            // hide field and show form instead            
            let childNodes = requestingItemContainer.childNodes;
            for (let i=0; i < childNodes.length; i++) {
                childNodes[i].style.display = "none";
            }
            
            requestingItemContainer.insertBefore(itemContainer, requestingItemContainer.firstChild);
            
            
            // update button event listener
            itemUpdateButton.addEventListener("click", function() {
                let itemId = item.id;
                submitUpdateItem(itemId, itemNameField.value, itemDescField.value, itemDueDateField.value, item.isComplete);
            });

        }
    }    

    function showDeleteProjectForm(project){
        let todolistContainer = document.querySelector("#container-todolist");

        let modalExists = document.querySelector("#delete-project-modal");
        if (modalExists) {
            return false;
        }
        
        let modalContainer = document.createElement("section");
        modalContainer.setAttribute("id", "delete-project-modal");
        modalContainer.setAttribute("class", "modal");

        let modalContent = document.createElement("section");
        modalContent.setAttribute("class", "modal-content");


        let deleteMessage = document.createElement("p");
        deleteMessage.textContent = `Are you sure you want to delete ${project.title}`;

        let confirmButton = document.createElement("button");
        confirmButton.textContent = "Yes";
        confirmButton.addEventListener ("click", function() {
            submitDeleteProject(project.id)
        });

        let cancelButton = document.createElement("button");
        cancelButton.textContent = "No";
        cancelButton.addEventListener("click", function() {
            closeDeleteProjectForm();
        });
        
        modalContent.appendChild(deleteMessage);
        modalContent.appendChild(confirmButton);
        modalContent.appendChild(cancelButton);
        modalContainer.appendChild(modalContent);
        todolistContainer.appendChild(modalContainer);

        window.onclick = function(event) {
            if (event.target == modalContainer) {
                closeDeleteProjectForm();
            }
        }
    }

    function closeDeleteProjectForm() {
        let deleteProjectModal = document.querySelector("#delete-project-modal");
        deleteProjectModal.remove();
    }

    function submitCreateProject() {
        let projectNameValue = document.querySelector("#pname").value;
        let projectDescValue = document.querySelector("#pdesc").value;
        let projectDueDateValue = document.querySelector("#pduedate").value;
        let projectColorValue = document.querySelector("#pcolor").value;

        // call create project
        TodolistController.createProject(projectNameValue, projectDescValue, projectDueDateValue, projectColorValue);
        displayToDoList();

        // reset form
        let projectContainer = document.querySelector("#create-project-form");
        projectContainer.remove();
    }

    function submitCreateItem(projectID) {
        let itemNameValue = document.querySelector("#itemname").value;
        let itemDescValue = document.querySelector("#itemdesc").value;
        let itemDueDateValue = document.querySelector("#itemduedate").value;
        
        // call create item
        TodolistController.createItem(itemNameValue, itemDescValue, projectID, itemDueDateValue);
        displayToDoList();
    }

    function submitUpdateProject(projectId, updatedTitle, updatedDescription, updatedDueDate, updatedColor){
            TodolistController.updateProject(projectId, updatedTitle, updatedDescription, updatedDueDate, updatedColor);
            displayToDoList();
    }

    function submitUpdateItem(itemId, updatedTitle, updatedDescription, updatedDueDate, updatedIsComplete){
        TodolistController.updateItem(itemId, updatedTitle, updatedDescription, updatedDueDate, updatedIsComplete);
        displayToDoList();
    }

    function submitDeleteProject(projectId) {
        TodolistController.deleteProject(projectId);
        displayToDoList();
    }

    function submitDeleteItem(itemId) {
        TodolistController.deleteItem(itemId);
        displayToDoList();
    }

    return {displayToDoList};

})();


const TodolistController = (function() {
    
    // mock data
    (function createMockData() {
        let projectList = StorageController.readProjectArray();
        let itemList = StorageController.readItemArray();

        if (projectList.length == 0) {
            let newProject = projectFactory("Default", "Default project", "test", "grey"); 
            projectList.push(newProject);
            StorageController.saveProjectArray(projectList);
    
            let newProject2 = projectFactory("Default2", "Default project2", "test2", "blue"); 
            projectList.push(newProject2);
            StorageController.saveProjectArray(projectList);
    
            let newProject3 = projectFactory("Default3", "Default project3", "test3", "red"); 
            projectList.push(newProject3);
            StorageController.saveProjectArray(projectList);

        }

       
        if (itemList.length == 0) {
            let newItem = itemFactory("Item1", "item 1 desc", 1, "test"); 
            itemList.push(newItem);
            StorageController.saveItemArray(itemList);
    
            let newItem2 = itemFactory("Item2", "item 2 desc", 1, "test"); 
            itemList.push(newItem2);
            StorageController.saveItemArray(itemList);
    
            let newItem3 = itemFactory("Item3", "item 3 desc", 2, "test"); 
            itemList.push(newItem3);
            StorageController.saveItemArray(itemList);

        }      
        
    })();

    
    // init display
    DisplayController.displayToDoList();

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

    return {createProject, createItem, updateProject, updateItem, deleteProject, deleteItem};
})();



