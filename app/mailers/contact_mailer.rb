class ContactMailer < ActionMailer::Base
  default from: "PBX"
  def contact_email(contact)
    @contact = contact
    mail(to: "ihq@pibetachi.org", subject: 'Contact Form Submitted On PBX Website')
  end
end