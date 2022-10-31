import React from "react";
import bg3 from "../assets/furniture.jpg";
import bg2 from "../assets/tv2.jpg";
import bg1 from "../assets/solidbg6.jpg";
import bg4 from "../assets/carousel7.jpg";
import bg5 from "../assets/bg5.jpg";
import bg6 from "../assets/bg2.jpg";

function Carousel() {
    return (
        <>
        <div style={{marginTop:'35px'}}>
            <h1 style={{textAlign:'center',color:'#175243'}}>Top <span style={{color:'white',backgroundColor:'#175243',padding:'10px'}}>Categories</span></h1>
           <div style={{display:'grid',gridTemplateColumns:"30% 30% 30%",width:'90vw',margin:'auto',height:'45vw',alignItems:'center',justifyContent:'center'}}>
            <div style={{display:'grid',gridTemplateRows:'50% 50%',alignItems:'center',justifyContent:'center'}}>
                
                <img className="design" src={bg3} alt="bg3" style={{width:'95%',height:'95%'}}></img>
                
                <img className="design" src={bg2} style={{width:'95%',height:'95%'}} alt="bg2"></img>
                
                
            </div>
            <img className="design" src={bg1} alt="bg1" style={{width:'90%'}}></img>
            <div style={{display:'grid',gridTemplateRows:'50% 50%',alignItems:'center',justifyContent:'center',height:'90%',width:'100%'}}>
                <img className="design" src={bg4} alt='bg4' style={{width:'100%',height:'95%'}}></img>
                <div style={{display:'grid',gridTemplateColumns:"50% 50%",alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
                    <img className="design" src={bg5} style={{width:'96%',height:'95%'}} alt="bg5"></img>
                    <img className="design" src={bg6} style={{width:'100%',height:'95%'}} alt="bg6"></img>
                </div>

            </div>
            </div>
           </div>
        </>
    )
}

export default Carousel;