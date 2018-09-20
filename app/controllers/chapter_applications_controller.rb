class ChapterApplicationsController < ApplicationController
  before_action :set_chapter_application, only: [:show, :edit, :update, :destroy]

  # GET /chapter_applications
  # GET /chapter_applications.json
  def index
    @chapter_applications = ChapterApplication.all
  end

  # GET /chapter_applications/1
  # GET /chapter_applications/1.json
  def show
    if $chapterAppCreatedAt.to_s == @chapter_application.created_at.to_s
      render "chapter_applications/show"
    else
      redirect_to root_url
    end
  end

  # GET /chapter_applications/new
  def new
    @chapter_application = ChapterApplication.new
  end

  # GET /chapter_applications/1/edit
  def edit
  end

  # POST /chapter_applications
  # POST /chapter_applications.json
  def create
    @chapter_application = ChapterApplication.new(chapter_application_params)

    respond_to do |format|
      if @chapter_application.save
        
        $chapterAppCreatedAt = @chapter_application.created_at
        ChapterApplicationMailer.chapter_application_email(@chapter_application).deliver
        
        format.html { redirect_to @chapter_application, notice: 'Your Chapter application was sent successfully. You\'ll hear back from us soon.' }
        format.json { render :show, status: :created, location: @chapter_application }
      else
        format.html { render :new }
        format.json { render json: @chapter_application.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /chapter_applications/1
  # PATCH/PUT /chapter_applications/1.json
  def update
    respond_to do |format|
      if @chapter_application.update(chapter_application_params)
        format.html { redirect_to @chapter_application, notice: 'Chapter application was successfully updated.' }
        format.json { render :show, status: :ok, location: @chapter_application }
      else
        format.html { render :edit }
        format.json { render json: @chapter_application.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chapter_applications/1
  # DELETE /chapter_applications/1.json
  def destroy
    @chapter_application.destroy
    respond_to do |format|
      format.html { redirect_to chapter_applications_url, notice: 'Chapter application was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chapter_application
      @chapter_application = ChapterApplication.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def chapter_application_params
      params.require(:chapter_application).permit(:applicant_name, :applicant_phone, :applicant_email, :city, :state, :school, :members_num, :chapter_house, :mailing_address, :active_exec, :exec_positions, :purpose, :why_pbx, :philanthropy, :community_service, :former_org, :former_org_name, :former_org_reason)
    end
end
