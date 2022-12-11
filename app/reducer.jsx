const Map = require("immutable").Map;

const reducer = function(state = Map(), action) {
    switch (action.type) {
        case "SET_STATE":
            return state.merge(action.state);

        case "ADD_TASK":
            return state.update("tasks", (tasks) => {
                const title = action.title;
                const description = action.description;
                if (title && title.replace(/\s/gi, '')) {
                    const newItem = {
                      id: Math.random().toString(36).substring(2,10),
                      title,
                      description,
                      pending: false,
                      completed: false,
                      date: new Date(),
                      updateTime: 0
                    }
                    if (!description || !description.replace(/\s/gi, '')) {
                      newItem.description = "Edit description";
                    }
                    return [...tasks, newItem];
                  }
                  return [...tasks];
            });

        case "REMOVE_TASK":
            return state.update("tasks", (tasks) => {
                const id = action.id;
                return [...tasks.filter(task => task.id !== id)];
            });

        case "CHANGE_STATUS":
            return state.update("tasks", (tasks) => {
                const id = action.id;
                const status = action.status;
                return [...tasks.map((task) => {
                    return task.id === id ? { ...task, [status]: !task[status]} : {...task};
                })];
            });

        case "UPDATE_TIME":
            return state.update("tasks", (tasks) => {
                const id = action.id;
                return [...tasks.map((task) => {
                    return task.id === id ? { ...task, updateTime: new Date().getTime()} : {...task};
                })];
            });

        case "SELECT_FILTER": 
            return state.update("filter", filter => {
              filter = action.filter;
              return filter;
            })
    }
    return state;
}

module.exports = reducer;