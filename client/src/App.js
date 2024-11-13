import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './Authentication.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Authentication />} />
            </Routes>
        </Router>
    );
};

export default App;
