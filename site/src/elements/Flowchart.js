import React from "react";

import Button from '../elements/Button.js'
import Answer from '../elements/Answer.js'
import SectionHeader from '../elements/SectionHeader.js'

import data from '../data/flowchart.json'

class Flowchart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQ: data['initialState'],
            stateStack: [],
            redoStack: []
        }
    }

    renderAnswers = (qData, onClick) => {
        switch(qData['type']) {
            case 'multipleChoice':
                return qData['choices'].map(
                    choice => 
                    <Answer key={choice['text']} data={choice} onClick={onClick} color={this.props.color}/>
                )
            case 'information':
                return (
                    <Answer data={{'text': 'Ok', 'goesTo':qData['goesTo']}} onClick={onClick} color={this.props.color} />
                )
            case 'range':
                return qData['choices'].map(
                    choice =>
                    <Answer key={choice['value']} data={{'text': choice['value'].toString(), 'goesTo': choice['goesTo']}} onClick={onClick} color={this.props.color} />
                )
            case 'final':
                return (<p>Done with the flowchart!</p>)
            default:
                console.log('unhandled question type: ' + qData['type'])
                break;
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
        const border_classname = "text-white border-solid border-2 border-slate-400 rounded-md"
        return (
            <div>
                <SectionHeader text={this.props.title} />
                <div className="flex flex-col space-y-2">
                    <div className={border_classname}>
                        <div className="m-3 flex flex-row space-x-2">
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
                    </div>
                    
                    

                    <div className={border_classname}>
                        <div className="m-3">
                            <p>{data['states'][this.state.currentQ]['bodyText']}</p>
                            <div className="flex flex-row space-x-2">
                                {this.renderAnswers(data['states'][this.state.currentQ], this.nextQuestion)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Flowchart;