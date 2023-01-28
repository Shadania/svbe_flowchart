// router stuff see https://v5.reactrouter.com/web/guides/quick-start
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Header from "./elements/Header.js";

import Home from './pages/Home.js';

function App() {
   return (
        <Router>
            <div className="siteHeader">
                <div className="mx-8 mt-8 py-8">
                    <Header />
                </div>
            </div>
            <div className="siteBody mx-8 py-8 px-8 lg:mx-16 lg:px-16 xl:mx-32 2xl:mx-64 rounded-b-lg">
                <Routes>
                    <Route path="/svbe_flowchart/" element={<Home />} />
                </Routes>
            </div>
        </Router>
   )
}

export default App;
