const React = require("react");
const connect = require("react-redux").connect;
const actions = require("./actions.jsx");

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addTask(this.state.title, this.state.description);
        this.setState({title: ''});
        this.setState({description: ''});
    }

    handleChangeTitle(e) {
        this.setState({title: e.currentTarget.value});
    }

    handleChangeDesc(e) {
        this.setState({description: e.currentTarget.value})
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleSubmit(e);
        }
    };

    render() {
        return <form onSubmit={this.handleSubmit} className="mt-10 flex flex-col justify-center items-center">
            <div className='flex md:flex-row flex-col flex-wrap justify-center items-start'>
                <input 
                    value={this.state.title}
                    type="text"
                    onChange={this.handleChangeTitle}
                    onKeyDown={this.handleKeyPress}
                    placeholder="Type your task name here"
                    className='md:min-w-[240px] min-w-[80vw] py-2 px-4 border-[2px] border-gray-300 border-solid rounded-md'
                />
                <textarea 
                    value={this.state.description}
                    type="text"
                    onChange={this.handleChangeDesc}
                    onKeyDown={this.handleKeyPress}
                    placeholder="Type description here (Optional)"
                    className='md:mt-0 mt-4 md:ml-2 md:min-w-[270px] min-w-[80vw] md:h-[2.75rem] h-[4rem] ml-0 py-2 px-4 border-[2px] 
                         border-gray-300 border-solid rounded-md'
                />
            </div>
            <button className='mt-6 py-2 md:min-w-full min-w-[80vw] bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg rounded-md'>Save</button>
        </form>
    }
}

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'all'
        };
        this.handleActive = this.handleActive.bind(this);
        this.filterButtons = [
            {name: 'all', label: 'All'}, 
            {name: 'open', label: 'Open'}, 
            {name: 'pending', label:'In Progress'}, 
            {name: 'completed', label:'Done'}, 
            {name: 'byUpdate', label:'By Update(newest)'}
        ];
    }

    handleActive(e) {
        this.setState({active: e.currentTarget.name});
        this.props.selectFilter(e.currentTarget.name);
    }
    
    render() {
        return (
            <div className='filter md:mt-10 mt-6 md:min-w-[520px] min-w-[80vw] md:mx-4 mx-0 flex flex-row flex-wrap justify-center items-center'>
                <h1 className='mr-2'>Filter: </h1>
                {this.filterButtons.map((btn) => {
                  const FilterButton = () => {
                    return (
                      <button name={btn.name} onClick={this.handleActive} className={this.state.active === btn.name ? 'active' : ''}>{btn.label}</button>
                    )
                  }
                  return (
                    <FilterButton 
                      key={btn.name}/>
                  )
                })}
            </div>
          )
    }
}

class ToDoElem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInputTitle: this.props.task.title,
            userInputDesc: this.props.task.description
        }
        this.inputTitleRef = React.createRef();
        this.titleRef = React.createRef();
        this.inputDescRef = React.createRef();
        this.descRef = React.createRef();

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);

        this.openEditTitle = this.openEditTitle.bind(this);
        this.closeEditTitle = this.closeEditTitle.bind(this);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChangeTitle = (e) => {
        this.props.updateTime(this.props.task.id);
        this.setState({userInputTitle: e.currentTarget.value});
    };

    handleChangeDesc = (e) => {
        this.props.updateTime(this.props.task.id);
        this.setState({userInputDesc: e.currentTarget.value});
    };

    openEditTitle = (e) => {
        const inputTitle = this.inputTitleRef.current;
        inputTitle.style.width = inputTitle.value.length + 5 + "ch";
        inputTitle.classList.toggle('hide');
        inputTitle.focus();
        e.currentTarget.classList.add('hide');
    }

    closeEditTitle = (e) => {
        const title = this.titleRef.current;
        if (!e.currentTarget.value || !e.currentTarget.value.replace(/\s/gi, '')) {
            this.setState({userInputTitle: 'Unnamed'});
        }
        title.classList.toggle('hide');
        e.currentTarget.classList.add('hide');
    }

    openEditDesc = (e) => {
        const inputTitle = this.inputDescRef.current;
        inputTitle.style.width = inputTitle.value.length + 5 + "ch";
        inputTitle.classList.toggle('hide');
        inputTitle.focus();
        e.currentTarget.classList.add('hide');
    }

    closeEditDesc = (e) => {
        const title = this.descRef.current;
        if (!e.currentTarget.value || !e.currentTarget.value.replace(/\s/gi, '')) {
            this.setState({userInputDesc: 'Edit description'});
        }
        title.classList.toggle('hide');
        e.currentTarget.classList.add('hide');
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.currentTarget.blur();
        }
    }

    render() {
        return <div 
            key={this.props.task.id} 
            className={`todo-item sm:min-w-[520px] min-w-[80vw] mt-2 flex md:flex-row flex-col flex-wrap md:justify-start justify-center items-center 
                ${this.props.task.pending ? 'pending' : ''}
                ${this.props.task.completed ? 'completed' : ''}`
        }>
            <h1 
                onClick={this.openEditTitle}
                ref={this.titleRef}
                className={`${this.props.task.completed ? 'text-line-through' : ''}`}>
                {this.state.userInputTitle}
            </h1>

            <input 
                type="text"
                ref={this.inputTitleRef}
                onChange={this.handleChangeTitle}
                onKeyDown={this.handleKeyPress}
                onBlur={this.closeEditTitle}
                value={this.state.userInputTitle} 
                className='hide px-3 bg-gray-200 border-[2px] border-gray-300 border-solid rounded-sm'
            />
            <span
                onClick={this.openEditDesc}
                ref={this.descRef}
                className={`mx-6 text-gray-500 ${this.props.task.completed ? 'text-line-through' : ''}`}>
                    {this.state.userInputDesc}
            </span>
            <input 
                type="text"
                ref={this.inputDescRef}
                onChange={this.handleChangeDesc}
                onKeyDown={this.handleKeyPress}
                onBlur={this.closeEditDesc}
                value={this.state.userInputDesc} 
                className='hide ml-6 px-3 bg-gray-200 border-[2px] border-gray-300 border-solid rounded-sm mr-6'
            />
            <div className='md:ml-auto md:mt-0 mt-6 flex flex-row items-center'>
                <img 
                    src='../assets/pending.svg' 
                    alt="pending"
                    onClick={() => this.props.changeStatus(this.props.task.id, 'pending')}
                    className="w-[20px] h-[20px]"
                />
                <img 
                    src='../assets/completed.svg'
                    alt="completed"
                    onClick={() => this.props.changeStatus(this.props.task.id, 'completed')}
                    className="w-[20px] h-[20px]"
                />
                <span 
                onClick={() => this.props.removeTask(this.props.task.id)} 
                className="text-2xl cursor-pointer"
                >☒</span>
            </div>
        </div>
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div>
                {this.props.tasks.map((task) => {
                        return (
                            <ToDoElem 
                                task={task}
                                key={task.id}
                                changeStatus={this.props.changeStatus}
                                removeTask={this.props.removeTask}
                                updateTime={this.props.updateTime}
                            />
                        )  
                    })}
                </div>
    }
}

class AppView extends React.Component {

    render() {
        const visibleTasks = 
            this.props.filter === 'all' ? [...this.props.tasks] :
            this.props.filter === 'open' ? [...this.props.tasks].filter(task => !task.pending && !task.completed) :
            this.props.filter === 'pending' ? [...this.props.tasks].filter(task => task.pending && !task.completed) :
            this.props.filter === 'completed' ? [...this.props.tasks].filter(task => task.completed) :
            this.props.filter === 'byUpdate' ? [...this.props.tasks].sort((a, b) => b.updateTime - a.updateTime) :
            [...this.props.tasks];

        return  <div className="App w-full md:mt-[5%] mt-[10%] flex flex-col justify-center items-center">
                    <header>
                        <h1 className='text-2xl'>{`To-Do List (${visibleTasks.length}):`}</h1>
                    </header>
                    <ToDoForm addTask={this.props.addTask} />
                    <Filter selectFilter={this.props.selectFilter} />
                    <ToDoList 
                        tasks={visibleTasks}
                        removeTask={this.props.removeTask}
                        changeStatus={this.props.changeStatus}
                        updateTime={this.props.updateTime}
                    />
                </div>
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.get("tasks"),
        filter: state.get("filter"),
    };
}

module.exports = connect(mapStateToProps, actions)(AppView);