import React, {useState} from 'react';
import './FilterForm.scss'

const FilterForm = (props) => {

    const [sortDirection, setSortDirection] = useState('ascending');

    const buttonText = sortDirection === 'ascending' ? 'Sort descending' : 'Sort ascending';

    return (
        <form className="filter-form">
            <input className="filter-form__input" onChange={(e) => {
                props.onFilter(e.target.value)
            }} placeholder="Filter by name"/>
            <button className="filter-form__button" onClick={(e) => {
                e.preventDefault();
                setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                props.onSort(sortDirection);
            }}>{buttonText}</button>
        </form>
    );
};

export default FilterForm;