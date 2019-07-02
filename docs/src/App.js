import React, { useState } from 'react';
import Pigment from 'pigmentjs';
import './App.css';


function GridTile(props) {
    const {colour} = props;
    return (
        <div className="grid-tile" style={{backgroundColor: colour.hex}}/>
    );
}

function App() {
    const [_colour, setColour] = useState(Pigment());

    const colours = [];

    for(let i = 0; i < 200; i += 1) {
        colours.push(Pigment());
    }

    const cols = Math.round(Math.sqrt(200));

    return (
        <div className="app">
            <div
                style={{
                    display: 'grid',
                    gridTemplate: `repeat(${cols}, ${100 / cols}vh) / repeat(${cols}, ${100 / cols}vw)`,
                }}
            >
                { colours && colours.map(c => (<GridTile colour={c}/>)) }
            </div>
            <button onClick={() => setColour(Pigment())}>Randomise</button>
        </div>
    );
}

export default App;
