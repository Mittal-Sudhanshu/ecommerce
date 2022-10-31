import React from "react";

function Footer() {
    return (
        <>
            <div className="d-flex foot">
                <div  style={{width:'50%',textAlign:'center'}}>
                    <div className="foot_heading">About Shop</div>
                    <p>This shop is made under the usde sdlksjdif sjdfh s dh e sdfsdu sldjhfsd  lore ms duia s idna  sdfjhsd
                        sldfj sldhjoas lsidjne lsdhfksdnfkjhdhf fkjhd nd ;sjd ;hdjhsdnhaksjnhfiuhf sd h
                    </p>
                </div>
                <div>
                    <div className="foot_heading">Contacts</div>
                    <p><i class="fa fa-envelope" aria-hidden="true" style={{marginRight:'6px'}}> </i> <span> mittal234@gmail.com</span></p>
                    <p><i class="fa fa-map-marker" aria-hidden="true" style={{marginRight:'6px'}}> </i> <span> Ranchi,Jharkhand</span></p>
                    <p><i class="fa fa-phone" aria-hidden="true" style={{ transform: 'rotateY(180deg)',marginRight:'6px' }}> </i> <span> 9456738495</span></p>
                </div>
            </div>
            <div className="copyright">
                &#169; copyright claim
            </div>
        </>
    )
}

export default Footer;