import * as React from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./InfiniteGrid_gallery.css";
import { useState, useEffect } from "react";
function getItems(nextGroupKey, count) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}
const Item = ({ photos, num }) => (
    <div className='item'>
        <div className='thumbnail'>
            <img
                //src={photos[num % 30].download_url}
                src={`https://picsum.photos/id/${photos[num % 30].id}/300/${Math.round(
                    (photos[num % 30].height * 300) / photos[num % 30].width
                )}`}
                alt='grid_gallery'
            />
        </div>
    </div>
);

const InfiniteGrid_gallery = ({ photos }) => {
    const [items, setItems] = React.useState(() => getItems(0, 30));
    const [isMobile, setIsMobile] = useState();
    const checkMobile = () => {
        window.innerWidth < 769 ? setIsMobile(true) : setIsMobile(false);
    };
    useEffect(() => {
        checkMobile();
    }, []);

    return (
        <div className='grid_container'>
            <MasonryInfiniteGrid
                className='container'
                gap={5}
                align={"justify"}
                onRequestAppend={e => {
                    const nextGroupKey = (+e.groupKey || 0) + 1;
                    e.wait();
                    setTimeout(() => {
                        e.ready();
                        setItems([...items, ...getItems(nextGroupKey, 30)]);
                    }, 1000);
                    checkMobile();
                    isMobile ? console.log(1) : console.log(2);
                }}
                onRenderComplete={e => {
                    //console.log(e);
                    const banner = document.querySelectorAll(".item");
                    for (var i = 0; i < banner.length; ++i) {
                        banner[i].classList.add("animated");
                    }
                }}
            >
                {items.map(item => (
                    <Item photos={photos} data-grid-groupkey={item.groupKey} key={item.key} num={item.key} />
                ))}
            </MasonryInfiniteGrid>
        </div>
    );
};

export default InfiniteGrid_gallery;
