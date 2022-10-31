import React from "react";
import product from "../assets/model.png";
import "../css/styles.css";
import "../css/animation.css";

function Enter(){
    return (
        <>
            <div className="cont">
                <div className="cont_ins">
                <div className="cont_child1">
                <h1 style={{color:'white'}}>
                    Welcome to <span className="content_span"><span className="c c1">T</span><span className="c c2">h</span><span className="c c3">e</span><span className="c c4">B</span><span className="c c5">e</span><span className="c c6">s</span><span className="c c7">t</span><span className="c c8">F</span><span className="c c9">i</span><span className="c c10">t</span></span>
                </h1>
                <h3 style={{color:'white'}}>
                    Choose the option that suits you the best
                </h3>
                <a className='start' href="/">Get Started</a>
                </div>
                <div className="cont_child2">
                <img src={product} alt="product" style={{width:'70%'}} />
                </div>
            </div>
            </div>
        </>
    )
}

export default Enter;