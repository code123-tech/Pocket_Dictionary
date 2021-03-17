import React, { Component } from 'react'
import axios from "axios";

export default class AddWord extends Component {
    constructor(){
        super();
        this.state = {
          word:"",
          isLoading:true
        };
    }
    change = (e)=>{
      this.setState({[e.target.name]:e.target.value});
    }
    onSubmitWord = (e)=>{
      this.setState({
        isLoading:false
      });
      e.preventDefault();
      axios
        .post("/api/dictionary",this.state)
        .then(res=>{
          this.setState({word:""})
          this.props.history.push("/");
        })
      .catch(err=>{
        console.log(err);
      })
    }
    render() {
        return (
          <>
          {
            this.state.isLoading?(
            <div className="add-word-container">
              <h1>Add word in Dictionary</h1>
              <form noValidate onSubmit={this.onSubmitWord}>
                  <input 
                  type="text" 
                  placeholder="Enter a Word" 
                  name="word" 
                  value={this.state.word} 
                  onChange={this.change}/>
                  <button type="submit">Add Word</button>
              </form>
            </div>)
            :(
            <h1 className="dictionary-center">
                Word is being Added into the Dictionary...
            </h1>)
          } 
          </>
         );
    }
}
