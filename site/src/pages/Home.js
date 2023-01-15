import React, {useState} from 'react'

import FlowchartElement from '../elements/Flowchart.js'
import SectionHeader from '../elements/SectionHeader.js'
import Button from '../elements/Button.js'



function Home() {
    const [status, setStatus] = useState('start')
    const [color, setColor] = useState('')
    const [branch, setBranch] = useState('')

    const renderBranchButton = (color, title) => {
        const branchOnClick = () => {
            setColor(color)
            setBranch(title)
            setStatus('flowchart')
        }
        const className = `grow bg-${color}-500 hover:bg-${color}-700 font-bold py-2 px-4 rounded my-2`
        return (
            <button className={className} onClick={branchOnClick}>
                {title}
            </button>
        )
    }

    const renderState = () => {
        switch(status) {
            case 'start':
                return (
                    <div>
                        <p>
                            To help you on your journey, we have organized our advice by management branch.
                        </p>
                        <div className="flex flex-row space-x-2">
                            <Button 
                                onClick={()=>setStatus('pickBranch')}
                                text="Pick a branch"
                                visible={true}
                            />
                            <Button
                                onClick={()=>setStatus('flowchartBranch')}
                                text="Get help picking a branch"
                                visible={true}
                            />
                        </div>
                        
                    </div>
                )
            case 'pickBranch':
                return (
                    <div className="flex flex-col">
                        <div className="flex flex-row space-x-4">
                            {renderBranchButton('cyan', 'Human Resources')}
                            {renderBranchButton('indigo', 'Product Design')}
                        </div>
                        <div className="flex flex-row space-x-4">
                            {renderBranchButton('orange', 'Supply Chain')}
                            {renderBranchButton('green', 'Marketing')}
                        </div>
                    </div>
                )
            case 'flowchartBranch':
                const headerClass = "text-l text-white mx-2 my-2 font-bold"
                return (
                    <div>
                        <i>Todo: put a little mini-flowchart here in the future?</i>
                        <div>
                            <h4 className={headerClass}>Human Resources</h4>
                            <p>
                                Employee Well-being
                            </p>
                        </div>
                        <div>
                            <h4 className={headerClass}>Product Design</h4>
                            <p>
                                Design Products Better
                            </p>
                        </div>
                        <div>
                            <h4 className={headerClass}>Supply Chain</h4>
                            <p>
                                How to get the resources for your product
                            </p>
                        </div>
                        <div>
                            <h4 className={headerClass}>Marketing</h4>
                            <p>
                                Marketing is about how you make the public aware of your product
                            </p>
                        </div>
                        <Button onClick={()=>setStatus('pickBranch')} text="I'm ready to pick a branch!" visible={true}/>
                    </div>
                )
            case 'flowchart':
                return (
                    <FlowchartElement color={color} title={branch} start={branch+"_start"} />
                )
            default:
                return (
                    <div>invalid state</div>
                )
        } 
    }

    return (
        <div className="text-white">
            <div>
                <SectionHeader text="A Journey to Sustainable Value-Based Entrepreneurship"/>
                
                <Button
                    onClick={()=>setStatus('start')}
                    text="Reset Journey"
                    visible={true}
                />
                <hr className="my-4"/>
            </div>
            
            {renderState()}
        </div>
    )
}

export default Home;