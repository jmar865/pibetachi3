json.extract! chapter_application, :id, :applicant_name, :applicant_phone, :applicant_email, :city, :state, :school, :members_num, :chapter_house, :mailing_address, :active_exec, :exec_positions, :purpose, :why_pbx, :philanthropy, :community_service, :former_org, :former_org_name, :former_org_reason, :created_at, :updated_at
json.url chapter_application_url(chapter_application, format: :json)
