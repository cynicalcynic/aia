import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import './NewPokemonForm.scss'

const NewPokemonForm = (props) => {

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    const handleFileUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <form className="pokemon-form">
            <div className="pokemon-form__inputs-wrapper">
                <div className="pokemon-form__text-inputs">
                    <label>Name</label>
                    <input className="pokemon-form__input" onChange={(e) => setName(e.target.value)}/>
                    <label>Description</label>
                    <textarea className="pokemon-form__input" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Rating</label>
                    <select onChange={(e) => {
                        setRating(e.target.value)
                    }}>
                        {[1, 2, 3, 4, 5].map(el => {
                            return <option key={el}>{el}</option>
                        })}
                    </select>
                    <label>Select an image</label>
                    <input className="pokemon-form__input" type="file" onChange={handleFileUpload}/>
                </div>
            </div>
            <button className="button-primary" onClick={(e) => {
                e.preventDefault();
                props.onAddPokemon({
                    id: uuid(),
                    name,
                    description,
                    rating,
                    image
                });
            }}>Add the pokemon
            </button>
        </form>
    );
};

export default NewPokemonForm;