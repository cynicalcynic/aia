import React from 'react';
import './PokemonEntry.scss';
import RatingSelector from "./RatingSelector";

const PokemonEntry = (props) => {

    return (
        <div className="pokemon-entry">
            <div className="pokemon-entry__image-wrapper">
                <img className="pokemon-entry__image" src={props.pokemon.image} alt="pokemon"/>
            </div>
            <div className="pokemon-entry__text">
                <h5 className="pokemon-entry__title">{props.pokemon.name}</h5>
                <p className="pokemon-entry__description">{props.pokemon.description}</p>
            </div>
            <RatingSelector max={6} rating={props.pokemon.rating}
                            onChange={(rating) => props.onRate(props.pokemon.id, rating)}/>
            <button className="pokemon-entry__delete" onClick={() => props.onDelete(props.pokemon.id)}>Delete</button>
        </div>
    );
};

export default PokemonEntry;