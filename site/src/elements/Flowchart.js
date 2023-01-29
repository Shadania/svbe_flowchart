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
            color: 'def',
            title: 'Pick a Branch'
        }
    }
    renderAdvice = () => {
        var advice = []
        for (var i = 0; i < this.state.stateStack.length; i++) {
            const thisState = this.state.stateStack[i]['id']
            if (data.states[thisState].type === 'information') {
                advice.push(data.states[thisState].bodyText)
            }
        }

        if (advice.length === 0){
            return (<p>No advice for you on this branch! Congratulations, you are doing very well! Try another branch?</p>)
        }
        return (
            <div>
                <ul className="list-disc ml-4">{advice.map(advice => <li>{advice}</li>)}</ul>
                <p>Good luck on your journey!</p>
            </div>
        )
    }
    renderAnswers = (qData, onClick) => {
        switch(qData['type']) {
            case 'multipleChoice':
                const answerCount = qData['choices'].length
                var extraClass = (answerCount === 4 || answerCount === 2)? 'w-1/2' : ''
                if (answerCount === 3) extraClass = 'w-1/3'

                var answers = qData['choices'].map( choice => {
                    var color = this.state.color
                    var onClickAnswer = (goesTo) => {
                        onClick(goesTo)
                    }
                    if ('branch' in choice) {
                        color = getBranchCol(choice['branch'])
                        onClickAnswer = (goesTo) => {
                            onClick(goesTo, color, choice['title'])
                        }
                    }
                    return (
                        <Answer extraClass={extraClass} key={choice['text']} data={choice} onClick={onClickAnswer} color={color}/>
                    )
                })
                
                if (answerCount === 4) {
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
                    <div className="flex flex-row">
                        <Answer data={{'text': 'Ok', 'goesTo':qData['goesTo']}} onClick={onClick} color={this.state.color} />
                    </div>
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
                        {this.renderAdvice()}
                    </div>
                )
            default:
                console.log('unhandled question type: ' + qData['type'])
                break;
        }
    }

    nextQuestion = (new_q_id, color=null, title=null) => {
        var newStateStack = this.state.stateStack
        newStateStack.push({
            "id": this.state.currentQ,
            "color": this.state.color,
            "title": this.state.title
        })
        var newColor = (color? color : this.state.color)
        var newTitle = (title? title : this.state.title)

        this.setState({
            currentQ: new_q_id,
            stateStack: newStateStack,
            redoStack: [],
            color: newColor,
            title: newTitle
        })
    }

    undo = () => {
        var newStateStack = this.state.stateStack
        if (newStateStack.length < 1)
            return

        var newState = newStateStack.pop()
        var newRedoStack = this.state.redoStack
        newRedoStack.push({
            "id": this.state.currentQ,
            "color": this.state.color,
            "title": this.state.title
        })
        this.setState({
            currentQ: newState["id"],
            stateStack: newStateStack,
            redoStack: newRedoStack,
            color: newState["color"],
            title: newState["title"]
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
        newStateStack.push({
            "id": this.state.currentQ,
            "color": this.state.color,
            "title": this.state.title
        })
        this.setState({
            currentQ: newState["id"],
            stateStack: newStateStack,
            redoStack: newRedoStack,
            color: newState["color"],
            title: newState["title"]
        })
    }
    canRedo = () => {
        return this.state.redoStack.length > 0
    }

    reset = () => {
        this.setState({
            currentQ: '_start',
            stateStack: [],
            redoStack: [],
            color: 'def',
            title: 'Pick a Branch'
        })
    }

    render() {
        const border_classname = "text-white border-solid border-2 border-slate-400 rounded-md"
        return (
            <div>
                <div className="flex justify-between">
                    <div>
                        <SectionHeader text={this.state.title} />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button onClick={this.undo} text="Undo" visible={this.canUndo()}/>
                        <Button onClick={this.redo} text="Redo" visible={this.canRedo()}/>
                        <Button onClick={this.reset} text="Reset Flowchart"
                            visible={true}
                        />
                    </div>
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