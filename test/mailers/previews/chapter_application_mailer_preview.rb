# Preview all emails at http://localhost:3000/rails/mailers/chapter_application_mailer
class ChapterApplicationMailerPreview < ActionMailer::Preview
    def chapter_application_mail_preview
        ChapterApplicationMailer.chapter_application_email(ChapterApplication.first)
    end
end
