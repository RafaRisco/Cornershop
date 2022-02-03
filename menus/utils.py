import requests
from django.conf import settings

SLACK_CHANNEL_HOOKS = settings.SLACK_CHANNEL_HOOKS

def send_slack_message(message):

    payload = '{"text": "%s"}' % message

    response = requests.post(
        SLACK_CHANNEL_HOOKS,
        data=payload
    )
    print(response.text)
