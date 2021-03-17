import React ,{Component} from 'react';
import {Link} from "react-router-dom";
import {IoIosClose} from "react-icons/io";
import axios from "axios";
import WordInfoContainer from "./WordInfoContainer";

export default class wordPage extends Component{
    constructor(props){
        super(props);
        this.state={
            word:"",
            results:[]
        }
    }
    //As PAge Loads ComponentDidMount gets called after constructor, it is making a get request for fetching word information
    componentDidMount(){
        axios
            .get(`/api/dictionary/`+this.props.match.params.word)
            .then(res=>{
                const {word,results} = res.data;
                this.setState({
                    word,
                    results
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render(){
    //Checking if word is present or not, if not then loading condition is shown.
        return (
            <>
                {this.state.word===""?<div className="dictionary-center">Word Information is being loaded...</div>
                    :(<div className="show-word-container">
                        <h2>{this.state.word}</h2>
                        <Link to="/">
                            <IoIosClose className="close-page"/>
                        </Link>
                        <hr/>
                        <WordInfoContainer results={this.state.results}/>
                    </div>)
                }
            </>
        )
    }
}
