import React from 'react';
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

const SingleRecipe = ({recipe, user, setEdit}) => {

    const [editTitle, setEditTitle] = useState(recipe.title);
    const [editTime, setEditTime] = useState(recipe.minutes_to_complete);
    const [editInstructions, setEditInstructions] = useState(recipe.instructions);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const editData = {title: editTitle, minutes_to_complete: editTime, instructions: editInstructions}
        fetch(`/api/recipes/${recipe.id}`, 
        {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
        })
        .then((r) => {
            setIsLoading(false);
            if (r.ok) {
                console.log('All good');
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
          })
          .then(window.location.reload(false))
        }
        

    function cancelEdit(){
        setEdit(null)
    }

    return (
        <Wrapper>
        <WrapperChild>
          <h2>Edit your Recipe</h2>
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={editTitle}
                onChange={(e)=> setEditTitle(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label htmlFor="minutesToComplete">Minutes to complete</Label>
              <Input
                type="number"
                id="minutesToComplete"
                value={editTime}
                onChange={(e)=> setEditTime(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                rows="10"
                value={editInstructions}
                onChange={(e)=> setEditInstructions(e.target.value)}
              />
            </FormField>
            <div>
                    <button type="submit">Submit edit</button>
                    <button onClick={cancelEdit} >Cancel</button>
                </div>
            <FormField>
              {errors.map((err) => (
                <Error key={err}>{err}</Error>
              ))}
            </FormField>
          </form>
        </WrapperChild>
        <WrapperChild>
          <h1>{editTitle}</h1>
          <p>
            <em>Time to Complete: {editTime} minutes</em>
            &nbsp;·&nbsp;
            <cite>By {user.username}</cite>
          </p>
          <ReactMarkdown>{editInstructions}</ReactMarkdown>
        </WrapperChild>
      </Wrapper>
            // <form onSubmit={handleSubmit}>
            //     <h2>Edit your recipe:</h2>
            //     <br/ >
            //     <textarea 
            //             onChange={(e)=> setEditTitle(e.target.value)}
            //             value={editTitle} />
            //             <br/>
            //             Time to Complete: 
            //     <textarea 
            //             onChange={(e)=> setEditTime(e.target.value)}
            //             value={editTime} />
            //             <br/>
            //     <textarea 
            //             onChange={(e)=> setEditInstructions(e.target.value)}
            //             value={editInstructions} />
            //             <br/>
                // <div>
                //     <button type="submit">Submit edit</button>
                //     <button onClick={cancelEdit} >Cancel</button>
                // </div>
            // </form>
    );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;


export default SingleRecipe;

