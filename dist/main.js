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
                showCreateItemForm();
            });

            let buttonProjectUpdate = document.createElement("button");
            buttonProjectUpdate.textContent = "update project";

            let buttonProjectDelete = document.createElement("button");
            buttonProjectDelete.textContent = "delete project";
            
            projectContainer.appendChild(projectInfo);
            projectContainer.appendChild(newItemButton);
            projectContainer.appendChild(buttonProjectUpdate);
            projectContainer.appendChild(buttonProjectDelete);
            
            itemList.forEach(item => {
                if (item.project == project.id) {
                    let itemContainer = document.createElement("section");
                    itemContainer.setAttribute("id", `container-item-${item.id}`);

                    let iteminfo = document.createElement("p");
                    iteminfo.textContent = `ITEM | ID: ${item.id}, Title: ${item.title}`;

                    let buttonItemUpdate = document.createElement("button");
                    buttonItemUpdate.textContent = "update item";
                    let buttonItemDelete = document.createElement("button");
                    buttonItemDelete.textContent = "delete item";

                    
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
            projectCreateButton.addEventListener("click", function() {
                let projectNameValue = document.querySelector("#pname").value;
                let projectDescValue = document.querySelector("#pdesc").value;
                let projectDueDateValue = document.querySelector("#pduedate").value;
                let projectColorValue = document.querySelector("#pcolor").value;

                // call create project
                TodolistController.createProject(projectNameValue, projectDescValue, projectDueDateValue, projectColorValue);

                // reset form
                projectContainer.remove();
            })
        }
    }

    function showCreateItemForm() {

    }

    // modal update project
    // modal delete project - are you sure?

    // modal create item
    // modal update item
    

    // create project (call todo controller with info from modal and then redisplay)
    // create item (call todo controller with info from modal and then redisplay)

    // update project (call todo controller with info from modal and then redisplay)
    // update item (call todo controller with info from modal and then redisplay)

    // delete project (call todo controller and then redisplay)
    // delete item (call todo controller and then redisplay)

    return {displayToDoList};

})();


const TodolistController = (function() { 
    function createProject(title, description, dueDate, color) {
        let newProject = projectFactory(title, description, dueDate, color); 
        projectList.push(newProject);

        DisplayController.displayToDoList();
    }

    return {createProject};
})();
