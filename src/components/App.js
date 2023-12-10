import React, {Component, useState} from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            secondName: '',
            relationshipStatus: '',
        }
    }

    handleInputChange = (event) => {
        this.setState( 
            {
                [event.target.name]: event.target.value
            }
        );
    }

    clearInputs = () => {
        this.setState ({
            firstName: '',
            secondName: '',
            relationshipStatus: '',
        });
    }

    calculateRelationship = () => {
        const {firstName, secondName} = this.state;
        if(!firstName || !secondName) {
            this.setState(
                {
                    relationshipStatus: 'Please Enter valid input'
                }
            );
            return;
        }

        const remainingChars = this.getRemainingChars(firstName, secondName);
        const statusValue = remainingChars.length % 6;

        switch(statusValue) {
            case 1: this.setState({relationshipStatus: 'Friends'}); break;
            case 2: this.setState({relationshipStatus: 'love'}); break;
            case 3: this.setState({relationshipStatus: 'Affection'}); break;
            case 4: this.setState({relationshipStatus: 'Marriage'}); break;
            case 5: this.setState({relationshipStatus: 'Enemy'}); break;
            case 0: this.setState({relationshipStatus: 'Siblings'}); break;
        }
    }

    getRemainingChars = (str1, str2) => {
        const commonChars = [...new Set([...str1].filter(char => str2.includes(char)))];
        const remainingStr1 = str1.split('').filter(char => !commonChars.includes(char)).join('');
        const remainingStr2 = str2.split('').filter(char => !commonChars.includes(char)).join('');

        return remainingStr1 + remainingStr2;
    }
    render() {
        const {firstName, secondName, relationshipStatus} = this.state;
        return(
            <div id="main">
               <input 
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={this.handleInputChange}
                data-testid="input1"
               />
               <input 
                type="text"
                placeholder="Enter second name"
                name="secondName"
                value={secondName}
                onChange={this.handleInputChange}
                data-testid="input2"
               />
               <button
                onClick={this.calculateRelationship}
                data-testid="calculate_relationship" 
                >
                 Calculate Relationship Future
               </button>
               <button 
                onClick={this.clearInputs}
                data-testid="clear"
                >
                 Clear
               </button>
            </div>
        )
    }
}


export default App;
