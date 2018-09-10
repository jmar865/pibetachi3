class CreateChapterApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :chapter_applications do |t|
      t.string :applicant_name
      t.string :applicant_phone
      t.string :applicant_email
      t.string :city
      t.string :state
      t.string :school
      t.integer :members_num
      t.string :chapter_house
      t.text :mailing_address
      t.string :active_exec
      t.text :exec_positions
      t.text :purpose
      t.text :why_pbx
      t.text :philanthropy
      t.text :community_service
      t.string :former_org
      t.string :former_org_name
      t.text :former_org_reason

      t.timestamps
    end
  end
end
