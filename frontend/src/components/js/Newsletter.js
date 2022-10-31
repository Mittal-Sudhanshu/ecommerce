import React from "react";

function Newletter() {
    return (
        <>
            <div className="newsletter">
                <h1>
                    Newsletter
                </h1>
                <h4>
                    Get timely updates from your favourite products
                </h4>
                <form>
                    <div class="mb-3 d-flex align-items-center">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" style={{width:'40vw'}}/>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                        
                    </div>
                </form>
            </div>
        </>
    )
}

export default Newletter;