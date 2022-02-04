import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import SingleRecipe from "./SingleRecipe";

function RecipeList({user}) {
  const [recipes, setRecipes] = useState([]);
  const [edit, setEdit] = useState(null)

  useEffect(() => {
    fetch("/api/recipes")
      .then((r) => r.json())
      .then(setRecipes);
  }, []);


  function deleteRecipe(recipe) {
    fetch(`/api/recipes/${recipe.id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((r) => { 
        if (r.ok) {
          window.location.reload(false);
          console.log('Item was deleted!')
    }})
  }

  const renderButtons = (recipe) => {
    if (recipe.user.id === user.id){
        return <div>
                <button onClick={() => setEdit(recipe.id)} >Edit Recipe</button>
                <button onClick={() => deleteRecipe(recipe)} >Delete Recipe</button>
              </div>
       }
    }

  return (
    <Wrapper>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Recipe key={recipe.id}>
            {edit === recipe.id ? (
              <Box>
              <SingleRecipe recipe={recipe} user={user} setEdit={setEdit} />
              </Box>
            ) : (
            <Box >
              <h2>{recipe.title}</h2>
              <p>
                <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {recipe.user.username}</cite>
              </p>
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
            </Box> 
            )}
            {edit === recipe.id ? '' : renderButtons(recipe)}
          </Recipe>
        ))
      ) : (
        <>
          <h2>No Recipes Found</h2>
          <Button as={Link} to="/new">
            Make a New Recipe
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default RecipeList;
