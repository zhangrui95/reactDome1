import React, { Component, PropTypes } from 'react'
class Main extends Component {

    render(){
        const {Form,PageList} = this.props;
        return (
            <div id="mainright">
                { Form }
                { PageList }
            </div>
        )
    }
}

Main.propTypes = {
    Form: PropTypes.node,
    List: PropTypes.node
};

export default Main;