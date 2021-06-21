import React, { useState } from "react";
import css from "./style.module.css";

export const AutoCompleteText = props => {
    // this.items = [
    //     "David",
    //     "Damien",
    //     "Sara",
    //     "Jane",
    // ];
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState("");

    const onTextChanged = e => {
        const { items } = props;
        console.log("TESTING DATA...", items);
        // const items = props.items;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        console.log("SUGGESTIONS: ", suggestions);
        setSuggestions(suggestions);
        setText(value);
    };

    const suggestionSelected = value => {
        setText(value);
        setSuggestions([]);
    };

    const renderSuggestions = (placeholder) => {
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul className={css.AutoCompleteText__ul}>
                {suggestions.map((item) => 
                    <li 
                        key={ Math.random().toString(36).substr(2, 9) } 
                        onClick={() => suggestionSelected(item)}
                    >
                        {item}
                    </li>)}
            </ul>
        );
    }

    return (
        <div className={css.AutoCompleteText}>
            <input value={text} onChange={onTextChanged} type="text" placeholder={props.placeholder} />
            {renderSuggestions()}
        </div>
    )
};

export default AutoCompleteText;