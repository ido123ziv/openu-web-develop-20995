import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './Navbar'; // Your NavigationBar component
// import Home from './Home'; // Example component for Home page
// import About from './About'; // Example component for About page
// import Contact from './Contact'; // Example component for Contact page

function Routes() {
    return (
        <Router>
            <NavigationBar />
            {/*<Route exact path="/">*/}
            {/*    <Home />*/}
            {/*</Route>*/}
            {/*<Route path="/about">*/}
            {/*    <About />*/}
            {/*</Route>*/}
            {/*<Route path="/contact">*/}
            {/*    <Contact />*/}
            {/*</Route>*/}
        </Router>
    );
}

export default Routes;