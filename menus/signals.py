from .models import Menu
from .tasks import send_slack_message
from celery.result import AsyncResult


def m2m_change_menu(instance, sender, action, *args, **kwargs):
    if action == "post_add":
        message = 'Hello!\n I share with you today\'s menu :)\n'
        for index, value in enumerate(instance.plates.all()):
            message += f'Option {index + 1}: {value.name}\n'
        message += f"Choose your plate here: http://0.0.0.0:8000/#/{instance.id}/ \nHave a nice day!"
        try:
            send_slack_message.delay(message)
        except:
            send_slack_message(message)
