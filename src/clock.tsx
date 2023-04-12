/** @format */
import React from 'react';

type clockState = {
    date: Date;
};

class Clock extends React.Component<{}, clockState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount(): void {
        setInterval(() => this.tick(), 1000);
        // this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount(): void {
        // clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div>
                <h1>Welcom tic-tac-toe-ts!</h1>
                <h2>
                    It is
                    {this.state.date.toLocaleString()}
                </h2>
            </div>
        );
    }
}

export default Clock;
