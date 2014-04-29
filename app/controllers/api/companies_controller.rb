class Api::CompaniesController < Api::BaseController
  # before_action :check_owner, only: [:show, :update, :destroy]
  # before_action only: [:show, :update, :destroy]
  respond_to :html, :json

  def index
    # render json: current_user.companies
    respond_with current_user.companies
    # respond_with Company.all
  end

  def show
    # render json: company
    respond_with company
  end

  def create
    company = current_user.companies.create!(safe_params)
    render json: company
  end

  def update
    company.update_attributes(safe_params)
    render nothing: true
  end

  def destroy
    # company = Company.find(params[:id])
    company.destroy
    render nothing: true, status: 204
  end

  private
    # def check_owner
    #   permission_denied if current_user != company.owner
    # end

    def company
      @company ||= Company.find(params[:id])
    end

    def safe_params
      params.require(:company).permit(:name, :url)
    end
end
