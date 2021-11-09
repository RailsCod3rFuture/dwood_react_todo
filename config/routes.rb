Rails.application.routes.draw do
  devise_for :users
  scope '/api/v1' do
    resources :todos
  end

  controller :dashboard do
    get 'my_dashboard', to: "dashboard#index", as: :dashboard
  end

  controller :home do
    get '/home', to: 'home#index', as: :home
  end

  root 'home#index'
end
