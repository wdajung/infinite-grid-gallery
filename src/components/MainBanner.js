import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./MainBanner.css";

const grid = 3;
const bannerItems = [
    {
        image_url: "https://picsum.photos/id/201/400/300",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    },
    {
        image_url: "https://picsum.photos/id/180/400/300",
        desc: "Temporibus eaque voluptatem nam nulla nisi minus",
    },
    {
        image_url: "https://picsum.photos/id/20/400/300",
        desc: "ncidunt in velit saepe illum dignissimos asperiores",
    },
];
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: (
            <div>
                <img src={bannerItems[k].image_url} />
                <h2>{bannerItems[k].desc}</h2>
            </div>
        ),
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    display: "flex",
    padding: grid,
});

class MainBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(grid),
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(this.state.items, result.source.index, result.destination.index);
        this.setState({
            items,
        });
    }

    render() {
        return (
            <div className='mainBanner_container'>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId='droppable' direction='horizontal' className='droppable'>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                className='bannerItem'
                                            >
                                                <div className='box'>{item.content}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default MainBanner;
