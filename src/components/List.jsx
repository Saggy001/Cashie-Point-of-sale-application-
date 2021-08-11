import React, { Component } from 'react'

export default class List extends Component {
    state = {
        cities : ["Mohali","Ambala","Chandigarh"],
    };

    updatecities = (e)=>{
        if(e.code === "Enter"){
            this.setState({cities : [...this.state.cities, e.target.value] });
            e.target.value = "";
        }
    };

    onDeleteByIndex = (index) => {
        const newCities = [...this.state.cities];
        newCities.splice(index, 1);
        this.setState(state => ({
            cities: newCities
        }));
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.cities.map((item, index) => (
                        <li>
                            <span class="name">{item} </span>
                            <input class="specialbtn" type="button" value="Delete" onClick={() => this.onDeleteByIndex(index)} />
                        </li>))}
                </ul>
                <input class="mr" onKeyUp={this.updatecities} type="text" placeholder="Enter New City Here"/>
            </div>
        );
    }
}
