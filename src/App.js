import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import logo from './logo.svg';
import './App.css';

import { dateDiff, parseUserInput } from './datediff';


class App extends Component {

    _onChange(e) {
        var date = parseUserInput(e.target.value.replace(/\_/g,' '));
        this.setState({ [e.target.name]: date.date, [e.target.name+'_err']: date.validationMessage, diff: undefined });
    }

    _onClick(e) {
        this.setState({ diff: dateDiff(this.state.Date1, this.state.Date2) });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Date difference calculator</h2>
                </div>
                <div className="date-input-container">
                    <div className="column">
                        <label>First Date</label>
                        <MaskedInput mask="11 11 1111" placeholder="DD MM YYYY" name="Date1" onChange={this._onChange.bind(this)}/>  
                        <div  className="err">{this.state && this.state.Date1_err}</div>
                    </div>
                    <div className="column">
                        <label>Second Date</label>
                        <MaskedInput mask="11 11 1111" placeholder="DD MM YYYY" name="Date2" onChange={this._onChange.bind(this)}/>
                        <div  className="err">{this.state && this.state.Date2_err}</div>  
                    </div> 
                </div>
                <div className="result">
                    {
                        this.state && this.state.Date1 && this.state.Date2 && this.state.diff ? 
                            <div>
                                Diffrence of 
                                <span>{this.state.diff[0]}</span>
                                and 
                                <span>{this.state.diff[1]}</span>
                                is
                                <span>{this.state.diff[2]+ (this.state.diff[2]>1 ? ' days':' day')}</span>
                            </div> : ''
                    }
                </div> 
                <div className={this.state && this.state.Date1 && this.state.Date2 ? 'calulate':'calulate disable'}>
                    <button onClick={this._onClick.bind(this)}>Calulate</button>
                </div>    
                <div className="App-intro">
                    Created by Kevin Jiang @ https://github.com/KevinJianghz.
                </div>
            </div>
        );
    }
}

export default App;
