import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            email: props.email,
            password: props.password,
            created_at: props.created_at,
            birth_date: props.birth_date
        };
    }

    render() {
        return (
            <div>
                <p>Email: {this.state.email}</p>
                <p>Created At: {this.state.created_at}</p>
                <p>User name: {this.username}</p>
            </div>
        );
    }
}

export default User;
