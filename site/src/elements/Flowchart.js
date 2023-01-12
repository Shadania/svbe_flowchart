import Answer from '../elements/Answer.js'
import data from '../data/flowchart.json'
import React from "react";

function renderAnswers(qData, onClick) {
    console.log(qData['type'])
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
            currentQ: data['initialState']
        }
        console.log(this.state.currentQ)

    }

    nextQuestion = (new_q_id) => {
        console.log(new_q_id)
        this.setState({
            currentQ: new_q_id
        })
    }

    render() {
        return (
            <div className="text-white" id="question_div">
                <p>{data['states'][this.state.currentQ]['bodyText']}</p>
                <div>
                    {renderAnswers(data['states'][this.state.currentQ], this.nextQuestion)}
                </div>
            </div>
        )
    }
    /*

    */
}

export default Flowchart;