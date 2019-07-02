import React, { useState } from 'react';
import Pigment from 'pigmentjs';
import './App.css';


function GridTile(props) {
    const {colour} = props;
    return (
        <div style={{display: 'flex', border: '1px solid white'}}>
            {
                colour.monochrome().map(
                    (c, i) => <div key={i} className="grid-tile" style={{backgroundColor: c.hex, flex: 1}} />
                )
            }
            {
                colour.complementary().monochrome().map(
                    (c, i) => <div key={i} className="grid-tile" style={{backgroundColor: c.hex, flex: 1}} />
                )
            }
        </div>
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
                {
                    colours && colours.map(
                        (c, i) => (
                            <GridTile key={i} colour={c} />
                        )
                    )
                }
            </div>
            <button onClick={() => setColour(Pigment())}>Randomise</button>
        </div>
    );
}

export default App;
