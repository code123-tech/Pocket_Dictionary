import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class FilteredWords extends Component {
    render() {
        return (
            this.props.filtered.map((wordsarr,index)=>{
                return(
                <div key={index } className="card">
                    <Link to={`show-word/${wordsarr["word"]}`} className="word-show">
                    <div className="card-container">
                        <h3>{wordsarr["word"]}</h3>
                        {
                            wordsarr["results"][0].lexicalEntries[0].lexicalCategory.id?<p>{wordsarr["results"][0].lexicalEntries[0].lexicalCategory.id}</p>:<p>noun</p>
                        }
                        {/* if False then default data is Going */}
                        {
                            wordsarr["results"][0].lexicalEntries[0].entries[0].etymologies?<p>{wordsarr["results"][0].lexicalEntries[0].entries[0].etymologies[0]}</p>:<p> having lived or existed for a very long time. : of, coming from, or belonging to a time that was long ago in the past</p>
                        }
                    </div>
                    </Link>
                    <hr/>
                </div>
                )
            })
        )
    }
}
