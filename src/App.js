import React from "react";
import ReactDOM from "react-dom";
import InfiniteGrid_gallery from "./components/InfiniteGrid_gallery";
import MainBanner from "./components/MainBanner";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import "./styles.css";
import { useState, useEffect } from "react";

function App() {
    const [carousel_photos, setCarousel_photos] = useState([]);
    const [gallery_photos, setGallery_photos] = useState([]);
    const [loading, setLoading] = useState(true);
    const start = Date.now();
    const getPhotos = async () => {
        const json = await (await fetch("https://picsum.photos/v2/list?page=1&limit=40")).json();
        setCarousel_photos(json.slice(0, 10));
        setGallery_photos(json.slice(10));
        setLoading(false);
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    useEffect(() => {
        getPhotos();
    }, []);

    const [loadedImages, setLoadedImages] = useState(0);
    const imageOnLoad = async () => {
        setLoadedImages(current => current + 1);
        if (loadedImages > 10) {
            const end = Date.now();
            const duration = end - start;
            if (duration < 3000) {
                await sleep(3000 - duration);
            }
            document.getElementById("loader-wrapper").style.display = "none";

            const banner = document.querySelectorAll(".bannerItem .box");
            for (var i = 0; i < banner.length; ++i) {
                banner[i].classList.add("animated");
            }
        }
    };

    return (
        <div>
            <Header />
            <div id='PageContainer'>
                <div id='loader-wrapper'>
                    <div id='loader'></div>
                </div>
                {!loading && (
                    <div onLoad={imageOnLoad}>
                        <Carousel photos={carousel_photos} />
                        <MainBanner />
                        <InfiniteGrid_gallery photos={gallery_photos} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
