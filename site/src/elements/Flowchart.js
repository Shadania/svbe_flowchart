import React from "react";

import Button from '../elements/Button.js'
import Answer from '../elements/Answer.js'
import SectionHeader from '../elements/SectionHeader.js'

import {getBranchCol} from '../services/colors.js'

import data from '../data/flowchart.json'

class Flowchart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQ: '_start',
            stateStack: [],
            redoStack: [],
            color: 'blue',
            title: 'Pick a Branch',
            branch: 'default'
        }
    }
    renderAdvice = () => {
        var advice = []
        for (var i = 0; i < this.state.stateStack.length; i++) {
            const thisState = this.state.stateStack[i]
            if (data.states[thisState].type === 'information') {
                advice.push(data.states[thisState].bodyText)
            }
        }
        return advice
    }
    renderAnswers = (qData, onClick) => {
        switch(qData['type']) {
            case 'multipleChoice':
                const answerCount = qData['choices'].length
                const extraClass = (answerCount === 4)? 'w-1/2' : ''

                var answers = qData['choices'].map( choice => {
                    var color = this.state.color
                    var onClickAnswer = (goesTo) => {
                        onClick(goesTo)
                    }
                    if ('branch' in choice) {
                        color = getBranchCol(choice['branch'])
                        onClickAnswer = (goesTo) => {
                            this.setState({
                                currentQ: this.state.currentQ,
                                stateStack: this.state.stateStack,
                                redoStack: this.state.redoStack,
                                color: color,
                                title: choice['title'],
                                branch: choice['branch']
                            })
                            onClick(goesTo, color, choice['branch'], choice['title'])
                        }
                    }
                    return (
                        <Answer extraClass={extraClass} key={choice['text']} data={choice} onClick={onClickAnswer} color={color}/>
                    )
                })
                
                if (answers.length === 4) {
                    const html = (
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row space-x-4">
                                {answers[0]}
                                {answers[1]}
                            </div>
                            <div className="flex flex-row space-x-4">
                                {answers[2]}
                                {answers[3]}
                            </div>
                        </div>
                    )
                    answers = html
                }
                else {
                    const html = (
                        <div className="flex flex-row space-x-4">
                            {answers}
                        </div>
                    )
                    answers = html
                }

                return answers
            case 'information':
                return (
                    <Answer data={{'text': 'Ok', 'goesTo':qData['goesTo']}} onClick={onClick} color={this.state.color} />
                )
            case 'range':
                return qData['choices'].map(
                    choice =>
                    <Answer key={choice['value']} data={{'text': choice['value'].toString(), 'goesTo': choice['goesTo']}} onClick={onClick} color={this.state.color} />
                )
            case 'final':
                return (
                    <div>
                        <p>Done with the flowchart! Here is the final collected advice:</p>
                        <ul className="list-disc ml-4">{this.renderAdvice().map(advice => <li>{advice}</li>)}</ul>
                    </div>
                )
            default:
                console.log('unhandled question type: ' + qData['type'])
                break;
        }
    }

    nextQuestion = (new_q_id, color=null, branch=null, title=null) => {
        var newStateStack = this.state.stateStack
        newStateStack.push(this.state.currentQ)
        var newColor = (color? color : this.state.color)
        var newBranch = (branch? branch : this.state.branch)
        var newTitle = (title? title : this.state.title)

        this.setState({
            currentQ: new_q_id,
            stateStack: newStateStack,
            redoStack: [],
            color: newColor,
            branch: newBranch,
            title: newTitle
        })
    }

    /*
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
            redoStack: newRedoStack,
            color: this.state.color,
            branch: this.state.branch,
            title: this.state.title
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
            redoStack: newRedoStack,
            color: this.state.color,
            branch: this.state.branch,
            title: this.state.title
        })
    }
    canRedo = () => {
        return this.state.redoStack.length > 0
    }
    */

    reset = () => {
        this.setState({
            currentQ: '_start',
            stateStack: [],
            redoStack: [],
            color: 'blue',
            branch: 'default',
            title: 'Pick a Branch'
        })
    }

    render() {
        const border_classname = "text-white border-solid border-2 border-slate-400 rounded-md"
        return (
            <div>
                <div className="flex justify-between">
                    <SectionHeader text={this.state.title} />
                    <Button onClick={this.reset} text="Reset Flowchart"
                        visible={true}
                    />
                </div>

                
                
                <div className={border_classname}>
                        <div className="m-3">
                            <p className="my-2">{data['states'][this.state.currentQ]['bodyText']}</p>
                                {this.renderAnswers(data['states'][this.state.currentQ], this.nextQuestion)}
                        </div>
                    </div>
            </div>
        )
    }
}

export default Flowchart;