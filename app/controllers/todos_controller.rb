class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    todos = Todo.order(created_at: :desc)
    render json: todos
  end

  def create
    todo = Todo.create(todo_params)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_params)
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end

  private
  def todo_params
    params.require(:todo).permit(Todo.attribute_names.map(&:to_sym))
  end
end
