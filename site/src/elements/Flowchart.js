import Answer from '../elements/Answer.js'
import data from '../data/flowchart.json'
import React from "react";
import Button from '../elements/Button.js'

function renderAnswers(qData, onClick) {
    switch(qData['type']) {
        case 'multipleChoice':
            return qData['choices'].map(
                choice => 
                <Answer key={choice['text']} data={choice} onClick={onClick}/>
            )
        case 'information':
            return (
                <Answer data={{'text': 'Ok', 'goesTo':qData['goesTo']}} onClick={onClick} />
            )
        case 'range':
            return qData['choices'].map(
                choice =>
                <Answer key={choice['value']} data={{'text': choice['value'].toString(), 'goesTo': choice['goesTo']}} onClick={onClick} />
            )
        case 'final':
            return (<p>Done with the flowchart!</p>)
        default:
            console.log('unhandled question type: ' + qData['type'])
            break;
    }
}

class Flowchart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQ: data['initialState'],
            stateStack: [],
            redoStack: []
        }
    }

    nextQuestion = (new_q_id) => {
        var newStateStack = this.state.stateStack
        newStateStack.push(this.state.currentQ)
        this.setState({
            currentQ: new_q_id,
            stateStack: newStateStack,
            redoStack: []
        })
    }

    undo = () => {
        var newStateStack = this.state.stateStack
        if (newStateStack.length < 1)
            return

        var newState = newStateStack.pop()
        var newRedoStack = this.state.redoStack
        newRedoStack.push(this.state.currentQ)
        this.setState({
            currentQ: newState,
            stateStack: newStateStack,
            redoStack: newRedoStack
        })
    }
    canUndo = () => {
        return this.state.stateStack.length > 0
    }

    redo = () => {
        var newStateStack = this.state.stateStack
        var newRedoStack = this.state.redoStack
        if (newRedoStack.length < 1)
            return
        var newState = newRedoStack.pop()
        newStateStack.push(this.state.currentQ)
        this.setState({
            currentQ: newState,
            stateStack: newStateStack,
            redoStack: newRedoStack
        })
    }
    canRedo = () => {
        return this.state.redoStack.length > 0
    }

    reset = () => {
        this.setState({
            currentQ: data['initialState'],
            stateStack: [],
            redoStack: []
        })
    }

    render() {
        return (
            <div className="text-white" id="question_div">
                <div>
                    <Button onClick={this.reset} text="Reset Flowchart"
                        visible={true}
                    />
                    <Button onClick={this.undo} text="Undo" 
                        visible={this.canUndo()}
                    />
                    <Button onClick={this.redo} text="Redo" 
                        visible={this.canRedo()}
                    />
                </div>
                <p>{data['states'][this.state.currentQ]['bodyText']}</p>
                <div>
                    {renderAnswers(data['states'][this.state.currentQ], this.nextQuestion)}
                </div>
            </div>
        )
    }
}

export default Flowchart;