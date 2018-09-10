# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180910171554) do

  create_table "chapter_applications", force: :cascade do |t|
    t.string   "applicant_name"
    t.string   "applicant_phone"
    t.string   "applicant_email"
    t.string   "city"
    t.string   "state"
    t.string   "school"
    t.integer  "members_num"
    t.string   "chapter_house"
    t.text     "mailing_address"
    t.string   "active_exec"
    t.text     "exec_positions"
    t.text     "purpose"
    t.text     "why_pbx"
    t.text     "philanthropy"
    t.text     "community_service"
    t.string   "former_org"
    t.string   "former_org_name"
    t.text     "former_org_reason"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
