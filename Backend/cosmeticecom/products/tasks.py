import random
from celery import shared_task

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


@shared_task(name="send_mail_task")
def send_mail_to_customer(username, useremail):
    print("calling send_mail_to_customer ")
    subject = 'Order confrmation email'
    message = f'Hi {username}, thank you for shoping at cosmetics.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [useremail, ]
    send_mail(subject, message, email_from,
              recipient_list, fail_silently=False, )
    print("mail sent")

    return None


@shared_task(name="send_mail_task2")
def send_receipt_to_email(data):

    emailSubject = 'Order confrmation email'
    emailOfSender = settings.EMAIL_HOST_USER
    emailOfRecipient = data['email']

    context = data

    text_content = render_to_string(
        'email_templates/confrmation_email.txt', context, )
    html_content = render_to_string(
        'email_templates/confrmation_email.html', context, )

    try:
        # I used EmailMultiAlternatives because I wanted to send both text and html
        emailMessage = EmailMultiAlternatives(subject=emailSubject, body=text_content, from_email=emailOfSender, to=[
                                              emailOfRecipient,], reply_to=[emailOfSender,])
        emailMessage.attach_alternative(html_content, "text/html")
        emailMessage.send(fail_silently=False)

    except Exception as e:
        print('There was an error sending an email: ', e)
       # error = {'message': ",".join(e.args) if len(e.args) > 0 else 'Unknown Error'}
