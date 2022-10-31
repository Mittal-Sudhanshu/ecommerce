import React from 'react';
import "../css/styles.css";

function Navbar(props) {
    const nav=["Home","Products","About","Contacts"];
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{color:'rgb(155, 0, 29)',fontSize:'25px',fontWeight:'700'}}>{props.title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav" style={{margin:"auto"}}>
                            {
                                nav.map((val)=>{
                                    return<li className="nav_li" style={{marginRight:"15px",fontWeight:'600',color:'rgba(0,0,0,1)',fontSize:'20px'}}>
                                <a className="nav_property" aria-current="page" href="/">{val}</a>
                            </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;