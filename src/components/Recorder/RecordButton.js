import React from 'react'
import {Button} from '@material-ui/core';
import './RecordButton.css';

function RecordButton() {
    return (
        <div>
            <div id="controls">
            <Button id="recordButton">Record</Button>
            <Button id="pauseButton" disabled>Pause</Button>
            <Button id="stopButton" disabled>Stop</Button>
            </div>
            <div id="formats">Format: start recording to see sample rate</div>
            <p><strong>Recordings:</strong></p>
            <ol id="recordingsList"></ol>
            <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
            <script src="./Recorder.js"></script>
        </div>
    )
}

export default RecordButton
