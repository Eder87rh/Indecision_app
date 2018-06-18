import React from 'react'

import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component{

    state = {
        options:[],
        selectedOption:undefined
    }

    componentDidMount() {
        try{
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
    
            if(options){
                this.setState((prevState)=> ({ options }))
            }
        }catch(err){
            // Do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length != this.state.options.length ){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
            console.log('saving data!')
        }
    }
    
    handleDeleteOptions =() => {
        this.setState({ options:[] })
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        
        this.setState(() => ({
            selectedOption : option
        }))
    }
    
    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This item already exists'
        }

        this.setState( (prevState) => ({options: prevState.options.concat(option)}) )
    }

    handleRevomeSelectedOption = () => {
        this.setState({ selectedOption : undefined })
    }

    render(){

        const subtitle = 'Put your life in the hands of a computer'
        
        return(
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <Options 
                        options={this.state.options}
                        handleDeleteOptions = {this.handleDeleteOptions}
                        handleDeleteOption = {this.handleDeleteOption}
                    />
                    <AddOption 
                        handleAddOption = {this.handleAddOption}
                    />
                </div>

                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleRevomeSelectedOption = {this.handleRevomeSelectedOption}
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options : []
}