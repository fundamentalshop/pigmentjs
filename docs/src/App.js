import React, { useState, useEffect } from 'react';
import Pigment, {Palette} from 'pigmentjs';
import './App.css';


function GridTile(props) {
    const {colour, mode} = props;
    const palette = Palette(colour).monochromeHexArray(mode);
    return (
        <div style={{display: 'flex', border: '4px solid white'}}>
            {
                palette.map(
                    (c, i) => <div key={i} className="grid-tile" style={{backgroundColor: c, flex: 1}} />
                )
            }
        </div>
    );
}

let colours = Array(200).fill().map(() => Pigment());

function App() {
    const [_colour, setColour] = useState(Pigment());
    const [_monochromeMode, setMonochromeMode] = useState('shade');
    useEffect(() => {
        colours = Array(200).fill().map(() => Pigment());
    }, [_colour]);

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
                            <GridTile key={i} colour={c} mode={_monochromeMode} />
                        )
                    )
                }
            </div>
            <div className="controls">
                <input type="radio" checked={ _monochromeMode === 'shade'} name='shade' onChange={() => setMonochromeMode('shade')}/>
                <label>Shade</label>
                <input type="radio" checked={ _monochromeMode === 'saturation'} name='saturation' onChange={() => setMonochromeMode('saturation')}/>
                <label>Saturation</label>
                <button onClick={() => setColour(Pigment())}>Randomise</button>
            </div>
        </div>
    );
}

export default App;
