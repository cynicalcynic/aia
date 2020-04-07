import React, {useState} from 'react';
import './RatingSelector.scss'


const RatingSelector = (props) => {

    const [edit, setEdit] = useState(false);

    const options = [...Array(props.max).keys()].map(r => {
        return <option key={r}>{r + 1}</option>
    });

    return (
        <div className="rating-wrapper">
            {
                !edit ?
                    <button onClick={() => setEdit(true)}>{props.rating}/{props.max}</button> :
                    <select onChange={(e) => {
                        setEdit(false);
                        props.onChange(Number.parseInt(e.target.value));
                    }}>
                        {options}
                    </select>
            }
        </div>
    );
};

export default RatingSelector;