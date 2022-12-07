
import React, { ReactNode, useState } from "react";
// import { addCommentaryToLand } from '../../lib/FirebaseUtilities'


interface CommentaryBoxProps {
    showCard: boolean;
    landId: any;
}

interface CommentaryBoxState {
    commentary: any;
    isLiked: boolean;
    isDisliked: boolean;
    stats: any;
}

class CommentaryBox extends React.Component<CommentaryBoxProps, CommentaryBoxState> {

    isLiked: boolean = false;
    isDisliked: boolean = false;
    commentary: string = '';

    constructor(props:any) {
        super(props);
        this.state = {
            stats: {},
            isLiked: false,
            isDisliked: false,
            commentary: ''
        }    
        this.commentaryChanged = this.commentaryChanged.bind(this);
    }

    gotLiked() {
        this.setState({isLiked: true, isDisliked: false, commentary: this.state.commentary});
    }

    gotDisliked() {
        this.setState({isLiked: false, isDisliked: true, commentary: this.state.commentary});
    }

    async submitCommentary(){
        const liked = (this.state.isLiked && !this.state.isDisliked)
        // const done = await addCommentaryToLand(this.props.landId, '0x0000', this.state.commentary, liked)
        // console.log("done", done);
    }

    componentDidMount() {
        this.setState({isLiked: false, isDisliked: false, commentary: this.state.commentary});
    }

    commentaryChanged(event: any){
        this.setState({commentary: event.target.value});
    }

    render() {
        return (
            <>
                <div className={`${ this.props.showCard ? "animate__fadeIn" : "hidden"} mt-5`}>
                    <div className="container">
                            <div className="flex row relative flex-wrap items-center mb-3 pl-1 text-left w-full max-w-sm">
                                <p className="font-medium text-gray-300">How happy are you with this valuation?</p>
                            </div>
    
                            <div className="flex row items-center justify-around gap-8">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12  w-90">
                                    {/* <input required id="commentInput" value={this.commentary} onChange={this.commentaryChanged} type="text" placeholder="Tell us what you think" } /> */}
                                    <textarea  value={this.state.commentary} placeholder="Tell us what you think" onChange={this.commentaryChanged} className={`bg-transparent w-full text-white font-medium p-4 focus:outline-none border hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />
                                </div>
                            </div>
                            
                            <div className="flex row items-center justify-around gap-8 mt-10">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    {/* <form onSubmit={(e) => this.submitCommentary(e)}> */}
                                        <div className="flex row items-center gap-5">
                                            
                                            <div className="button-container">
                                                <div className={ this.state.isLiked ? `glass-btn red-btn bg-white` : `glass-btn red-btn`} >
                                                    <img src="https://img.icons8.com/cotton/50/000000/like--v3.png" alt="heart" onClick={()=> this.gotLiked()}/>                                                    
                                                </div>

                                                <div className={this.state.isDisliked ? `glass-btn blue-btn bg-white` : `glass-btn blue-btn`}>
                                                    <img src="https://img.icons8.com/nolan/64/thumbs-down.png" onClick={()=> this.gotDisliked()}/>
                                                </div>

                                            </div> 
                                        </div>
                                        <div className="row">
                                            <button type="submit" onClick={()=> this.submitCommentary()} className="w-full items-center justify-around bg-gray-200 hover:bg-white transition ease-in-out duration-500 rounded-xl m-1 ml-2 lg:ml-1 shadow-dark hover:shadow-button ">Send</button>
                                        </div>
                                    {/* </form> */}
                                </div>
                            </div>  
                    </div>
                </div>
            </>
        );
    }
}



export default CommentaryBox;