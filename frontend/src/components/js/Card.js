import React from "react";
import card1 from "../assets/product.png";
import carousel1 from "../assets/furniture.jpg";
import carousel2 from "../assets/carousel8.jpg";
import carousel3 from "../assets/carousel3.jpg";
import carousel4 from "../assets/carousel4.jpg";
import carousel5 from "../assets/carousel5.jpg";
import carousel6 from "../assets/carousel6.jpg";
import carousel7 from "../assets/pots.jpg";
import carousel8 from "../assets/tv.jpg";

function Card() {
    const card = [card1, carousel1, carousel8];
    const name=["Watches","Furnitures","Television"];
    const card2 = [carousel8, carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7];
    // const observer = new IntersectionObserver(entries=>{
    //     entries.forEach(entry=>{
    //         if(entry.isIntersecting){
    //             document.querySelectorAll(".card").classList.add("fadein");
    //         }
    //     })
    // })
    // observer.observe(document.querySelector(".section1"));
    return (
        <>
            <div className="section1">
                <h1 className="text-center mt-5" style={{ color: 'white' }}>Top <span style={{ color: '#175243', padding: '5px' }}>Trendings</span></h1>
                <div className="card_cont">
                    {
                        card.map((val,index) => {
                            return <div className="card fadein">
                                <img src={val} className="card-img-top" alt="card1"style={{backgroundColor:'white'}}/>
                                <form className="card_after">
                                <div style={{width:"fit-content",height:'fit-content',border:'2px solid white',borderRadius:'5px',color:'white',padding:'5px',backgroundColor:'#ffffff47'}}>Bestsellers</div>
                                <div>
                                    <h2 style={{color:'white'}}>New {name[index]} Collections</h2>
                                </div>
                                <div>
                                <button type="submit" class="btn btn-primary">see more &#8594;</button>
                                </div>
                                </form>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="section2">
                <h1 className="text-center mt-5" style={{ color: '#175243' }}>Our <span style={{ backgroundColor: '#175243', color: 'white', padding: '5px' }}>Popular Collections</span></h1>
                <div className="card_cont2">
                    {
                        card2.map((val) => {
                            return <div className="card2 fadein">
                                <img src={val} className="card-img-top" alt="card1" style={{height:'175px'}}/>
                                <div className="card-body">
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Card;