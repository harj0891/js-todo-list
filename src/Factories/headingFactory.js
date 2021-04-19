
/* heading
- title
- description (optional)
- project (can only belong to 1 project, can't be changed)
*/

const headingFactory = (title, description) => {
    this.title = title;
    this.description = description;
    orderPriority = 0;
    getTitle = () => {
        return this.title;
    }
    setTitle = (newTitle) => {
        title = newTitle;
    }
    getDescription = () => {
        return this.description;
    }
    setDescription = (newDescription) => {
        description = newDescription;
    }

    return {getTitle, setTitle, getDescription, setDescription};
}

export {headingFactory};