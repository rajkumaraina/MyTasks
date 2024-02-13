import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isActive: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isActive: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isActive: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isActive: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isActive: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isActive: false,
  },
]

const EachTask = props => {
  const {item} = props
  const {id, input, displayText} = item
  return (
    <li className="taskListItem">
      <p className="taskPara">{input}</p>
      <p className="taskPara2">{displayText}</p>
    </li>
  )
}

const Tags = props => {
  const {item} = props
  const {optionId, displayText} = item
  return <option value={optionId}>{displayText}</option>
}

const TagDetails = props => {
  const {item, NewTag, selectedTag} = props
  const {displayText} = item
  let backgroundColor
  if (selectedTag === displayText) {
    backgroundColor = 'tagbutton active'
  } else {
    backgroundColor = 'tagbutton'
  }
  const tagChange = () => {
    NewTag(displayText)
  }
  return (
    <li className="listItem2">
      <button className={backgroundColor} type="button" onClick={tagChange}>
        {displayText}
      </button>
    </li>
  )
}

class Task extends Component {
  state = {
    input: '',
    finalInput: '',
    tag: tagsList[0].optionId,
    taskList: [],
    selectedTag: '',
  }

  textChange = event => {
    this.setState({input: event.target.value})
  }

  changeTag = event => {
    this.setState({tag: event.target.value})
  }

  submitForm = event => {
    const {input, tag} = this.state
    const {displayText} = tagsList.find(each => each.optionId === tag)
    event.preventDefault()
    const item = {
      id: uuidv4(),
      input,
      displayText,
    }
    this.setState(prevState => ({
      finalInput: input,
      input: '',
      tag: tagsList[0].optionId,
      taskList: [...prevState.taskList, item],
    }))
  }

  NewTag = id => {
    this.setState({
      selectedTag: id,
    })
  }

  render() {
    const {input, tag, taskList, selectedTag} = this.state
    const filteredTaskList = taskList.filter(each =>
      each.displayText.includes(selectedTag),
    )
    console.log(filteredTaskList)
    return (
      <div className="mainContainer">
        <div className="first">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.submitForm} className="form">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="task"
              className="input"
              onChange={this.textChange}
              value={input}
            />
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select
              className="input"
              id="tag"
              onChange={this.changeTag}
              value={tag}
            >
              {tagsList.map(each => (
                <Tags item={each} key={each.optionId} />
              ))}
            </select>
            <button className="button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="second">
          <h1 className="secondHeading">Tags</h1>
          <ul className="unorderedList2">
            {tagsList.map(each => (
              <TagDetails
                item={each}
                key={each.optionId}
                NewTag={this.NewTag}
                selectedTag={selectedTag}
              />
            ))}
          </ul>
          <h1 className="secondHeading">Tasks</h1>
          <ul className="taskUnordered">
            {filteredTaskList.length > 0 ? (
              filteredTaskList.map(each => (
                <EachTask item={each} key={each.id} />
              ))
            ) : (
              <p className="no">No Tasks Added Yet</p>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default Task
