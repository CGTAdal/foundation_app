class TemplatesController < ApplicationController
  # before_filter signed_in_user
  layout "ng-app"

  def index
    # render layout: "app_layout"
  end

  def template
    render :template => 'templates/' + params[:path], :layout => nil
  end

end