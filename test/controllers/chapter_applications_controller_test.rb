require 'test_helper'

class ChapterApplicationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @chapter_application = chapter_applications(:one)
  end

  test "should get index" do
    get chapter_applications_url
    assert_response :success
  end

  test "should get new" do
    get new_chapter_application_url
    assert_response :success
  end

  test "should create chapter_application" do
    assert_difference('ChapterApplication.count') do
      post chapter_applications_url, params: { chapter_application: { active_exec: @chapter_application.active_exec, applicant_email: @chapter_application.applicant_email, applicant_name: @chapter_application.applicant_name, applicant_phone: @chapter_application.applicant_phone, chapter_house: @chapter_application.chapter_house, city: @chapter_application.city, community_service: @chapter_application.community_service, exec_positions: @chapter_application.exec_positions, former_org: @chapter_application.former_org, former_org_name: @chapter_application.former_org_name, former_org_reason: @chapter_application.former_org_reason, mailing_address: @chapter_application.mailing_address, members_num: @chapter_application.members_num, philanthropy: @chapter_application.philanthropy, purpose: @chapter_application.purpose, school: @chapter_application.school, state: @chapter_application.state, why_pbx: @chapter_application.why_pbx } }
    end

    assert_redirected_to chapter_application_url(ChapterApplication.last)
  end

  test "should show chapter_application" do
    get chapter_application_url(@chapter_application)
    assert_response :success
  end

  test "should get edit" do
    get edit_chapter_application_url(@chapter_application)
    assert_response :success
  end

  test "should update chapter_application" do
    patch chapter_application_url(@chapter_application), params: { chapter_application: { active_exec: @chapter_application.active_exec, applicant_email: @chapter_application.applicant_email, applicant_name: @chapter_application.applicant_name, applicant_phone: @chapter_application.applicant_phone, chapter_house: @chapter_application.chapter_house, city: @chapter_application.city, community_service: @chapter_application.community_service, exec_positions: @chapter_application.exec_positions, former_org: @chapter_application.former_org, former_org_name: @chapter_application.former_org_name, former_org_reason: @chapter_application.former_org_reason, mailing_address: @chapter_application.mailing_address, members_num: @chapter_application.members_num, philanthropy: @chapter_application.philanthropy, purpose: @chapter_application.purpose, school: @chapter_application.school, state: @chapter_application.state, why_pbx: @chapter_application.why_pbx } }
    assert_redirected_to chapter_application_url(@chapter_application)
  end

  test "should destroy chapter_application" do
    assert_difference('ChapterApplication.count', -1) do
      delete chapter_application_url(@chapter_application)
    end

    assert_redirected_to chapter_applications_url
  end
end
