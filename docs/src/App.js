import React, { useState } from 'react';
import pigment from 'pigmentjs';
import './App.css';


function GridTile(props) {
    const {colour} = props;
    return (
        <div className="grid-tile" style={{backgroundColor: colour.hex}}/>
    );
}

function App() {
    const [_colour, setColour] = useState(pigment());

    const colours = [];

    for(let i = 0; i < 200; i += 1) {
        colours.push(pigment());
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
            <button onClick={() => setColour(pigment())}>Randomise</button>
        </div>
    );
}

export default App;
