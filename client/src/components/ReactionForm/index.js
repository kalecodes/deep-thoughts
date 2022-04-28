import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

// the prop thoughtId will be necessary when we call the mutation
const ReactionForm = ({ thoughtId }) => {
    // add state variables and handler functions to the form
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // declare mutation variables
    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add reaction to database
            await addReaction({
                variables: { reactionBody, thoughtId }
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form 
                className='flex-row jusstify-center justify-space-between-md align-stretch'
                onClick={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input col-12 col-md-9"
                ></textarea>
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    value={reactionBody}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactionForm;