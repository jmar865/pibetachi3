class CreateApplications < ActiveRecord::Migration
  def change
    create_table :applications do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :school
      t.string :new_or_existing_org
      t.text :purpose

      t.timestamps null: false
    end
  end
end
