import { useEffect } from "react";
import "./Header.css";

const Header = () => {
    const isSticky = e => {
        const header = document.querySelector(".header_container");
        const scrollTop = window.scrollY;
        scrollTop >= 150 ? header.classList.add("fixed") : header.classList.remove("fixed");
    };
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    });

    return (
        <div>
            <header>
                <div className='header_container'>
                    <div className='header_logo'>
                        <svg
                            width='32'
                            height='32'
                            className='hic6U'
                            viewBox='0 0 32 32'
                            version='1.1'
                            aria-labelledby='home-LOGO'
                            aria-hidden='false'
                        >
                            <path d='M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z'></path>
                        </svg>
                    </div>
                    <div className='nav'>
                        <h1>GNB AREA : Responsive Web Application with SPA</h1>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
