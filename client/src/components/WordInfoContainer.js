import React, { Component } from 'react';

class WordInfoContainer extends Component {
    render() {
    return(
         this.props.results.map((word,index)=>{
        return (
            <div className="word-info-container" key={index}>
                {/* Checking whether word id is present or not */}
                {
                    word.lexicalEntries[0].lexicalCategory.id?<h5>{word.lexicalEntries[0].lexicalCategory.id}</h5>:<h5>noun</h5>
                }
                {/* Checking whether wordInfo is present or not, if not then give default value*/}
                { 
                    word.lexicalEntries[0].entries[0].etymologies?
                    <p>Origin :{word.lexicalEntries[0].entries[0].etymologies[0]}</p>:
                    <p>
                    Origin: having lived or existed for a very long time. : of, coming from, or belonging to a time that was long ago in the past
                    </p>
                }
                {/* using Dictionary to present data and description about data  */}
                <dl>
                    {
                        word.lexicalEntries[0].entries[0].senses.map((info,index)=>{
                            return (
                                <dl key={index} className="word-info-center">
                                    <dt><h2>{info.definitions[0]}</h2></dt>
                                    <dd> 
                                        <h4>Examples -</h4>
                                            {
                                            (info.examples)?
                                                info.examples.map((ex,index)=>{
                                                return <p key={index}>     - {ex.text}</p>
                                            }):<p>No Example is Present</p>
                                        }
                                        <h4>Other Definitions -</h4>
                                        <dl>
                                            {
                                                (info.subsenses)?
                                                info.subsenses.map((subinfo,index)=>{
                                                return <dt key={index}>
                                                        - {subinfo.definitions}
                                                    </dt>
                                                }):<p>No Other Defination</p>
                                            }
                                        </dl>
                                    </dd>
                                </dl>
                                )
                        })
                    }
                </dl>
            </div>
        )
    })
    )
}
}
export default WordInfoContainer;