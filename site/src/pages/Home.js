import React from 'react'

import FlowchartElement from '../elements/Flowchart.js'
import SectionHeader from '../elements/SectionHeader.js'

function Home() {
    return (
        <div className="text-white">
            <SectionHeader text="A Journey to Sustainable Value-Based Entrepreneurship"/>
            <hr className="my-4"/>
            <FlowchartElement />
        </div>
    )
}

export default Home;