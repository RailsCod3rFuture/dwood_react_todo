require "rails_helper"
require_relative "../support/devise"

RSpec.describe DashboardController, type: :controller do
  describe "GET /" do
    login_user
    context "login user" do
      it "should return 200" do
        get :index
        expect(response).to have_http_status(:ok)
      end
    end
  end
end