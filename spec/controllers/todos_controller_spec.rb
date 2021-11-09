require "rails_helper"
require_relative "../support/devise"

RSpec.describe TodosController, type: :controller do
  describe "GET /" do
    login_user
    context "authorized user access" do
      it "should return 302 Found" do
        get :index
        expect(response).to have_http_status(:ok)
      end
    end

    context "Todos POST CREATE" do
      let(:todo) {create(:todo)}
      it "should create todo item" do
        expect{post :create, params: {:todo => {:title => "finish coding project", :complete => true}}}.to change(Todo, :count).by(1)
      end

      it "should successfully respond with todo item" do
        expect(response.status).to eq(200)
      end
    end

    context "TODO DESTROY" do
      let(:todo) {create(:todo)}
      it "it destroys todo item" do
        delete :destroy, params: {id: todo.id}
        expect {todo.reload}.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "TODO UPDATE" do
      let(:todo) {create(:todo)}
      let(:attributes) do
        {title: "new title", complete: false}
      end

      before(:each) do
        put :update, params: {:id => todo.id, :todo => attributes}
        todo.reload
      end

      it {expect(todo.title).to eql attributes[:title]}
      it {expect(todo.complete).to eql attributes[:complete]}
    end

  end
end