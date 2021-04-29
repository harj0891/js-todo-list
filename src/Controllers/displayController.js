import TodolistController from './toDoListController';
import StorageController from './storageController';

const DisplayController = (function() {
    function displayProjects() {
        let projectList = StorageController.readProjectArray();
        let todolistContainer = document.querySelector("#container-navigation");
        todolistContainer.innerHTML = "";
    
        projectList.forEach(project => {
            let projectContainer = document.createElement("section");
            projectContainer.setAttribute("id", `container-project-${project.id}`);

            switch (project.labelColor) {
                case ("grey"):
                    projectContainer.setAttribute("class", "project grey");
                    break;
                case ("blue"):
                    projectContainer.setAttribute("class", "project blue");
                    break;
                case ("red"):
                    projectContainer.setAttribute("class", "project red");
                    break;
                case ("green"):
                    projectContainer.setAttribute("class", "project green");
                    break;
            }

            let projectInfo = document.createElement("section");

            let projectTitle = document.createElement("p");
            projectTitle.setAttribute("class","project-title");
            projectTitle.textContent = project.title;

            let projectDescription = document.createElement("p");
            projectDescription.setAttribute("class","project-description");
            projectDescription.textContent = project.description;

            let projectDueDate = document.createElement("p");
            projectDueDate.setAttribute("class","project-duedate");
            projectDueDate.textContent = project.dueDate;

            projectInfo.appendChild(projectTitle);
            projectInfo.appendChild(projectDescription);
            projectInfo.appendChild(projectDueDate);


            let buttonProjectUpdate = document.createElement("button");
            buttonProjectUpdate.setAttribute("class", "button project update");
            buttonProjectUpdate.textContent = "EDIT";
            buttonProjectUpdate.addEventListener("click", function() {
                showUpdateProjectForm(project.id)
            });

            let buttonProjectDelete = document.createElement("button");
            buttonProjectDelete.setAttribute("class", "button project delete");
            buttonProjectDelete.textContent = "DELETE";
            buttonProjectDelete.addEventListener("click", function() {
                showDeleteProjectForm(project);
            });
            projectContainer.appendChild(projectInfo);
            projectContainer.appendChild(buttonProjectUpdate);
            projectContainer.appendChild(buttonProjectDelete);
            
            projectContainer.addEventListener("click", function() {
                displayToDoList(project.id);
            })

            todolistContainer.appendChild(projectContainer);
        });

        let buttonProjectCreate = document.createElement("button");
        buttonProjectCreate.setAttribute("class", "button project create");
        buttonProjectCreate.textContent = "NEW PROJECT";
        buttonProjectCreate.addEventListener("click", function() {
            showCreateProjectForm();
        });

        todolistContainer.appendChild(buttonProjectCreate);
    };

    function displayToDoList(projectId) {
        let projectList = StorageController.readProjectArray();
        let itemList = StorageController.readItemArray();
        let project;

        for (let i=0; i < projectList.length; i++) {
            if (projectId == null) {
                projectId = projectList[i].id;
            }

            if (projectList[i].id == projectId) {
                project = projectList[i];
            }
        }

        let todolistContainer = document.querySelector("#container-todolist");
        todolistContainer.innerHTML = "";
        let projectItemContainer = document.createElement("section");
        projectItemContainer.setAttribute("id", `container-project-${project.id}`);
        todolistContainer.setAttribute("class",`todolist ${project.labelColor}`);
        
        itemList.forEach(item => {
            if (item.project == project.id) {
                let itemContainer = document.createElement("section");
                itemContainer.setAttribute("id", `container-item-${item.id}`);
                itemContainer.setAttribute("class", 'item');

                let itemCheckbox = document.createElement("input");
                itemCheckbox.setAttribute("id","item-checkbox");
                itemCheckbox.setAttribute("type","checkbox");
                itemCheckbox.addEventListener("change", function(){
                    submitUpdateItem(item.project, item.id, item.title, item.description, item.dueDate, this.checked);
                });

                if (item.isComplete) {                        
                    itemContainer.setAttribute("class", 'item completed');
                    itemCheckbox.checked = true;
                }


                let iteminfo = document.createElement("section");
                
                let itemTitle = document.createElement("p");
                itemTitle.textContent = item.title;

                let itemDescription = document.createElement("p");
                itemDescription.textContent = ` - ${item.description}`;

                let itemDueDate = document.createElement("p");
                itemDueDate.textContent = ` - ${item.dueDate}`;

                iteminfo.appendChild(itemTitle);
                iteminfo.appendChild(itemDescription);
                iteminfo.appendChild(itemDueDate);

                let buttonItemUpdate = document.createElement("button");
                buttonItemUpdate.setAttribute("class", "button item update");
                buttonItemUpdate.textContent = "edit";
                buttonItemUpdate.addEventListener("click", function() {
                    showUpdateItemForm(item.id);
                });


                let buttonItemDelete = document.createElement("button");
                buttonItemDelete.setAttribute("class", "button item delete");
                buttonItemDelete.textContent = "x";
                buttonItemDelete.addEventListener("click", function() {
                    submitDeleteItem(item.project, item.id)
                });

                itemContainer.appendChild(itemCheckbox);
                itemContainer.appendChild(iteminfo);
                itemContainer.appendChild(buttonItemUpdate);
                itemContainer.appendChild(buttonItemDelete);
                projectItemContainer.appendChild(itemContainer);
            }
        })

        let newItemButton = document.createElement("button");
        newItemButton.setAttribute("class", "button item create");
        newItemButton.textContent = "+";
        newItemButton.addEventListener("click", function() {
            let createItemForm = showCreateItemForm(project.id);
            
            if (createItemForm) {
                projectItemContainer.appendChild(createItemForm);
            }
            
        });

        projectItemContainer.appendChild(newItemButton);
        todolistContainer.appendChild(projectItemContainer);

    };

    function showCreateProjectForm() {
        let mainContainer = document.querySelector("#container");

        // check if form already exists 
        let alreadyExists = document.querySelector("#create-project-modal");
        if (alreadyExists) {
            console.log("project create form already open");
            // do nothing
        } else {
            let modalContainer = document.createElement("section");
            modalContainer.setAttribute("id","create-project-modal");
            modalContainer.setAttribute("class","modal");

            let projectContainer = document.createElement("section");
            projectContainer.setAttribute("class", "modal-content");
    
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
            projectDueDateField.setAttribute("type","date");

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
    
            modalContainer.appendChild(projectContainer);
            mainContainer.appendChild(modalContainer); 

            // create button event listener
            projectCreateButton.addEventListener("click", submitCreateProject);

            window.onclick = function(event) {
                if (event.target == modalContainer) {
                    closeCreateProjectForm();
                }
            }
        }
    }



    function closeCreateProjectForm() {
        let deleteProjectModal = document.querySelector("#create-project-modal");
        deleteProjectModal.remove();
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
            itemDueDateField.setAttribute("type","date");

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
            projectDueDateField.setAttribute("type","date");
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
            itemDueDateField.setAttribute("type","date");
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
                submitUpdateItem(item.project, itemId, itemNameField.value, itemDescField.value, itemDueDateField.value, item.isComplete);
            });

        }
    }    

    function showDeleteProjectForm(project){

        let mainContainer = document.querySelector("#container");

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
            submitDeleteProject(project.id);
            closeDeleteProjectForm();
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
        mainContainer.appendChild(modalContainer);

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
        closeCreateProjectForm();
        displayProjects();

    }

    function submitCreateItem(projectId) {
        let itemNameValue = document.querySelector("#itemname").value;
        let itemDescValue = document.querySelector("#itemdesc").value;
        let itemDueDateValue = document.querySelector("#itemduedate").value;
        
        // call create item
        TodolistController.createItem(itemNameValue, itemDescValue, projectId, itemDueDateValue);
        displayToDoList(projectId);
    }

    function submitUpdateProject(projectId, updatedTitle, updatedDescription, updatedDueDate, updatedColor){
            TodolistController.updateProject(projectId, updatedTitle, updatedDescription, updatedDueDate, updatedColor);
            displayProjects();
    }

    function submitUpdateItem(projectId, itemId, updatedTitle, updatedDescription, updatedDueDate, updatedIsComplete){
        TodolistController.updateItem(itemId, updatedTitle, updatedDescription, updatedDueDate, updatedIsComplete);
        displayToDoList(projectId);
    }

    function submitDeleteProject(projectId) {
        TodolistController.deleteProject(projectId);
        displayProjects();
        displayToDoList();
    }

    function submitDeleteItem(projectId, itemId) {
        TodolistController.deleteItem(itemId);
        displayToDoList(projectId);
    }

    return {displayProjects, displayToDoList};

})();


export default DisplayController;