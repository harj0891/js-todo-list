let projectList = [];
let itemList = [];

const projectFactory = (title, description, dueDate, labelColor) => {
    let id = () => {      
        let nextID;
        if (projectList.length == 0) {
            nextID = 1; 
            return nextID;
        } else if (projectList.length > 0){
            nextID = projectList[projectList.length-1].id + 1;
            return nextID;
        }
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

// mock data
(function createMockData() {
    let newProject = projectFactory("Default", "Default project", "test", "Grey"); 
    projectList.push(newProject);

    let newProject2 = projectFactory("Default2", "Default project2", "test2", "Grey2"); 
    projectList.push(newProject2);

    let newProject3 = projectFactory("Default3", "Default project3", "test3", "Grey3"); 
    projectList.push(newProject3);

    let newItem = itemFactory("Item1", "item 1 desc", 1, "test"); 
    itemList.push(newItem);

    let newItem2 = itemFactory("Item2", "item 2 desc", 1, "test"); 
    itemList.push(newItem2);

    let newItem3 = itemFactory("Item3", "item 3 desc", 2, "test"); 
    itemList.push(newItem3);
})();



const DisplayController = (function() {
    // init display
    displayToDoList();

    // button event listeners
    let newProjectButton = document.querySelector("#create-project");
    newProjectButton.addEventListener("click", function() {
        showCreateProjectForm();
    
    });

    function displayToDoList() {
        let todolistContainer = document.querySelector("#container-todolist");
        todolistContainer.innerHTML = "";
    
        projectList.forEach(project => {
            let projectContainer = document.createElement("section");
            projectContainer.setAttribute("id", `container-project-${project.id}`);

            let projectInfo = document.createElement("p");
            projectInfo.textContent = `PROJECT | ID: ${project.id}, Title: ${project.title}`;

            let newItemButton = document.createElement("button");
            newItemButton.textContent = "New item";
            newItemButton.addEventListener("click", function() {
                let createItemForm = showCreateItemForm(project.id);
                
                if (createItemForm) {
                    projectContainer.appendChild(createItemForm);
                }
                
            });

            let buttonProjectUpdate = document.createElement("button");
            buttonProjectUpdate.textContent = "update project";
            buttonProjectUpdate.addEventListener("click", function() {
                showUpdateProjectForm(project.id)
            });

            let buttonProjectDelete = document.createElement("button");
            buttonProjectDelete.textContent = "delete project";
            buttonProjectDelete.addEventListener("click", function() {
                submitDeleteProject(project.id)
            });
            
            projectContainer.appendChild(projectInfo);
            projectContainer.appendChild(newItemButton);
            projectContainer.appendChild(buttonProjectUpdate);
            projectContainer.appendChild(buttonProjectDelete);
            
            itemList.forEach(item => {
                if (item.project == project.id) {
                    let itemContainer = document.createElement("section");
                    itemContainer.setAttribute("id", `container-item-${item.id}`);
                    itemContainer.setAttribute("class", 'item');

                    let iteminfo = document.createElement("p");
                    iteminfo.textContent = `ITEM | ID: ${item.id}, Title: ${item.title}`;

                    let buttonItemUpdate = document.createElement("button");
                    buttonItemUpdate.textContent = "update item";
                    buttonItemUpdate.addEventListener("click", function() {
                        showUpdateItemForm(item.id);
                    });


                    let buttonItemDelete = document.createElement("button");
                    buttonItemDelete.textContent = "delete item";
                    buttonItemDelete.addEventListener("click", function() {
                        submitDeleteItem(item.id)
                    });

                    
                    itemContainer.appendChild(iteminfo);
                    itemContainer.appendChild(buttonItemUpdate);
                    itemContainer.appendChild(buttonItemDelete);
                    projectContainer.appendChild(itemContainer);
                }
            })
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

            let projectColorField = document.createElement("input");
            projectColorField.setAttribute("id","pcolor");

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

            let projectColorField = document.createElement("input");
            projectColorField.setAttribute("id","pcolor");
            projectColorField.value = project.labelColor;

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
                submitUpdateItem(itemId, itemNameField.value, itemDescField.value, itemDueDateField.value);
            });

        }
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

    function submitUpdateItem(itemId, updatedTitle, updatedDescription, updatedDueDate){
        TodolistController.updateItem(itemId, updatedTitle, updatedDescription, updatedDueDate);
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
    function createProject(title, description, dueDate, color) {
        let newProject = projectFactory(title, description, dueDate, color); 
        projectList.push(newProject);
    }

    function createItem(title, description, projectID, dueDate) {
        let newItem = itemFactory(title, description, projectID, dueDate); 
        itemList.push(newItem);
    }

    function updateProject(projectId, updatedTitle, updatedDescription, updatedDueDate, updatedColor) {
        // set project
        let project;
        for (let i=0; i < projectList.length; i++) {
            if (projectList[i].id == projectId) {
                project = projectList[i];
            }
        }

        project.setTitle(updatedTitle);
        project.setDescription(updatedDescription);
        project.setDueDate(updatedDueDate);
        project.setLabelColor(updatedColor);
    }


    function updateItem(itemId, updatedTitle, updatedDescription, updatedDueDate) {
        // set project
        let item;
        for (let i=0; i < itemList.length; i++) {
            if (itemList[i].id == itemId) {
                item = itemList[i];
            }
        }

        item.setTitle(updatedTitle);
        item.setDescription(updatedDescription);
        item.setDueDate(updatedDueDate);
    }

    function deleteProject(projectId){

        // delete associated items
        for(var i = 0; i < itemList.length; i++){ 
            
            if (itemList[i].project == projectId) { 
                deleteItem(itemList[i].id);
                // recursive call 
                deleteProject(projectId);
            }
        }

        // delete project
        for( var i = 0; i < projectList.length; i++){ 
            if (projectList[i].id === projectId) { 
                projectList.splice(i, 1); 
            }
        }
    }

    function deleteItem(itemId) {
        for( var i = 0; i < itemList.length; i++){ 
            if (itemList[i].id === itemId) { 
                itemList.splice(i, 1); 
            }
        }
    }

    return {createProject, createItem, updateProject, updateItem, deleteProject, deleteItem};
})();
