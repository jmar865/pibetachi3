class ChapterApplicationMailer < ActionMailer::Base
  default from: "PBX"
  def chapter_application_email(chapter_application)
    @chapter_application = chapter_application
    mail(to: "ihq@pibetachi.org", subject: 'Chapter Application Submitted On PBX Website')
  end
end