import React from "react";
import Logo from "../img/TN-LOGO.png"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="foot-con">
                    <img src={Logo} alt="" />
                    <div className="disc">
                                <h4>TN-Solution</h4>
                                <p>439 ถนน จิระ ตำบล ในเมือง อำเภอเมืองบุรีรัมย์ บุรีรัมย์ 31000</p>
                    </div>
                    <div className="contact">
                        <p><i className="fab fa-facebook"></i> : TN-Solution</p>
                        <p><i className="fab fa-line"></i> : @TN-Solution</p>
                        <p><i className="fas fa-envelope"></i> : office1999.it4@gmail.com</p>
                    </div>
                </div>
                <div className="copy-r">
                    <p>© 2022 tn-solution</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;