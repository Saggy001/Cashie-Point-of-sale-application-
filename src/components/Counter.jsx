import React, { Component } from 'react'

export default class Counter extends Component {
    state = {
        count: 0
    };

    increment = ()=>{
        this.setState({
            count: this.state.count + 1
        });
    }

    decrement = ()=>{
        this.setState({count: this.state.count -1});
    }

    render() {
        return (
            <div>
                <h1 class={this.state.count >= 0?'pink':'yellow'}>{this.state.count}</h1>
                <button onClick={this.increment} class="btn btn-outline-success">Increment</button>
                <button onClick={this.decrement} class="btn btn-outline-info">Decrement</button>
            </div>
        )
    }
}
