import React from 'react';
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom';
import Maps from "./Maps";

export default () => (
    <BrowserRouter>
        <div>
            <Route path="/" component={Maps} />
        </div>
    </BrowserRouter>
);
