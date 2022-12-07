import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { getValuationScores } from '../../lib/FirebaseUtilities'

interface ScoreBoxProps {
    showCard: boolean;
    landId: any;
}

interface ScoreBoxState {
    stats: any;
}


class ScoreBox extends React.Component<ScoreBoxProps, ScoreBoxState> {

    scores: any;
    constructor(props:any) {
        super(props);
        this.state = {
            stats: {}
        }    
    }

    async componentDidUpdate() {
        // this.scores = await getValuationScores(this.props.landId);
    }

    render() { 
        return (
            <>
                <div className={` ${this.props.showCard ? "animate__fadeIn" : "hidden"} mt-5`}>
                    <div className="container">
                            <div className="flex row relative flex-wrap items-center mb-3 pl-1 text-left w-full max-w-sm">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <p className=" text-lg xl:text-xl font-medium text-gray-300">Valuation Score: </p>
                                </div>
                                
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ml-5">
                                    <div className="flex row items-center gap-5 w-100 mt-2">
    
                                        <div className="button-container w-50">
                                            <div className="glass-btn red-btn wide-btn tall-btn span-hover">
                                                <img className="regular-icon" src="https://img.icons8.com/cotton/50/000000/like--v3.png" alt="heart"/>
                                                <span className="font-medium ml-5">
                                                   { this.scores? (this.scores['liked-count'] != 0) ? this.scores['liked-count']: '0' : '0'}
                                                </span>
                                            </div>

                                            <div className=' wide-btn tall-btn '>

                                            </div>
    
                                            <div className="glass-btn blue-btn wide-btn tall-btn span-hover">
                                                <img className="regular-icon" src="https://img.icons8.com/nolan/64/thumbs-down.png"/>
                                                <span className="font-medium ml-5">
                                                    {this.scores? (this.scores['disliked-count'] != 0) ? this.scores['disliked-count']: '0' : '0' }
                                                </span>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </>
        );
    }
}



export default ScoreBox;