import styles from "./InsertPhoto.module.css";
import { useState } from "react";

function InsertPhoto() {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState({});
    const onClick = () => {
        setShow(current => !current);
        setInput({});
    };
    return (
        <div>
            <div className={styles.btn_add} onClick={onClick}>
                <span>+</span>
            </div>
            {show && (
                <div className={styles.container}>
                    <label htmlFor='photoUrl'>image url:</label>
                    <input id='photoUrl' type='text' placeholder='url'></input>
                </div>
            )}
        </div>
    );
}

export default InsertPhoto;
