import React from 'react'

export default class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleSubmit(e){
        e.preventDefault()
        console.log('testting')
        const option = e.target.elements.option.value.trim()
        const error = this.props.handleAddOption(option);

        this.setState( { error } )

        if(!error){
            e.target.elements.option.value = ''
        }
    }

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <input name="option" type="text"/>
                    <button >AddOption</button>
                </form>
            </div>
        )
    }
}