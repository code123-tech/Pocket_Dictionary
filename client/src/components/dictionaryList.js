import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from 'react-icons/ai';
import FilteredWords from "./FilteredWords";

//DictionaryList component which will show all the added words on Home screen
export default class dictionaryList extends Component {
    constructor(){
        super();
        this.state = {
            results:[],
            isClicked:false,
            searchValue:""
        }
    }
    //As the DOM Loads below  functions will get Called automatically.
    componentDidMount(){
        axios
            .get("/api/dictionary")
            .then(res=>{
                    if(res.data){
                        res.data.forEach(data1=>{
                            //Concating previous Data with previous results so that we can fetch data from results.
                            this.setState((prevState)=>({results:prevState.results.concat({...data1})
                        })
                    )
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }
    //When Search icon is clicked then search box is present and isClicked becomes true
    Click = ()=>{
        this.setState({
            isClicked:!this.state.isClicked
        })
    }
    changeSearch = (e)=>{
        //When the inputField is changed then search Value is being changed.
        this.setState({
            searchValue:e.target.value
        })
        //When Search field doesn't contain any value then isClicked becomes false and searchbox disappears
        if(e.target.value===""){
            this.setState({isClicked:!this.state.isClicked});
        }
    }
    render() {
        const {results,searchValue} = this.state;
        //For Filtering words when searching is done
        const filteredWords = results.filter((wordData)=>{
            return wordData.word.toLowerCase().includes(searchValue.toLowerCase());
        });
        return(
            //<></> are Fragements to wrappe all components in a parent element.
            <>
            {
                filteredWords.length === 0?
                (
                    <>
                        <div className="header">
                            <h2>Vocab</h2>
                                {
                                    this.state.isClicked===false
                                    ?<AiOutlineSearch className="search-icon" onClick={this.Click}/>
                                    :
                                    (
                                        <input type="search" 
                                        className="search-field" 
                                        placeholder="Enter Your Word" 
                                        value={this.state.searchValue} 
                                        onChange={this.changeSearch}/>
                                    )
                                }
                        </div>
                        <div className="dictionary-center">
                            Words are not Present in Dictionary. Please Add a Word..
                        </div>
                        <Link to="/addword" className="add-btn">+</Link>
                    </>
                ):
                (
                    <div className="dictContainer">
                        <div className="header">
                            <h2>Vocab</h2>
                            {
                                this.state.isClicked===false?
                                <AiOutlineSearch className="search-icon" onClick={this.Click}/>:
                                (
                                <input type="search" 
                                className="search-field" 
                                placeholder="Enter Your Word" 
                                value={this.state.searchValue} 
                                onChange={this.changeSearch}/>
                            )}
                        </div>
                        <div>
                            <h2>Word List</h2><hr/>
                            <FilteredWords filtered={filteredWords} />
                        </div>
                        <Link to="/addword" className="add-btn">+</Link>
                    </div>
                )
            }  
            </>
        )
    }
}
