class Api::RecipesController < ApplicationController
  
  def index
    render json: Recipe.all
  end

  def show
    recipe = Recipe.find_by(id: params[:id])
    if recipe
      render json: recipe
    else 
      render json: {error: "Not Found"}, status: :not_found
    end
  end

  def create
    recipe = @current_user.recipes.create!(recipe_params)
    render json: recipe, status: :created
  end

  def update
    recipe = Recipe.find_by(id: params[:id])
    if (recipe.user_id == @current_user.id)
      recipe.update(recipe_params)
      render json :recipe, status: :accepted
    end
  end

  def destroy
    recipe = Recipe.find_by(id: params[:id])
    if (recipe.user_id == @current_user.id)
      recipe.destroy
    else 
      render json: {error: "Not Found"}, status: :not_found
    end
  end

  private

  def recipe_params
    params.permit(:title, :instructions, :minutes_to_complete)
  end

end
