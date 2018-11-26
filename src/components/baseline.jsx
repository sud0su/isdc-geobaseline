import React from 'react'
import ReactDom from 'react-dom'
import IsdcBaseline from './main.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Baseline {
    constructor(domId, options) {
        this._domId = domId;
        this._urlBaseline = options.urlBaseline
    }

    set urlBaseline(value) {
        this._urlBaseline = value;
    }
    view() {
        ReactDom.render(
            <MuiThemeProvider>
                <IsdcBaseline
                    urlBaseline={this._urlBaseline}
                />
            </MuiThemeProvider>, document.getElementById(this._domId)
        );
    }
}

module.exports = Baseline;