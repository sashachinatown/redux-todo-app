const addTask = function(title, description) {
    return {
        type: "ADD_TASK",
        title,
        description
    }
}

const removeTask = function(id) {
    return {
        type: "REMOVE_TASK",
        id
    }
}

const changeStatus = function(id, status) {
    return {
        type: "CHANGE_STATUS",
        id,
        status
    }
}

const updateTime = function(id) {
    return {
        type: "UPDATE_TIME",
        id
    }
}

const selectFilter = function(filter) {
    return {
        type: "SELECT_FILTER",
        filter
    }
}

module.exports = {
    addTask,
    removeTask,
    changeStatus,
    updateTime,
    selectFilter
}


