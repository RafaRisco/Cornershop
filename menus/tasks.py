from __future__ import absolute_import, unicode_literals

from celery import shared_task

import requests

from django.conf import settings

SLACK_CHANNEL_HOOKS = settings.SLACK_CHANNEL_HOOKS


@shared_task
def send_slack_message(message):
    print(SLACK_CHANNEL_HOOKS, 'SLACK_CHANNEL_HOOKS')

    payload = '{"text": "%s"}' % message

    response = requests.post(
        SLACK_CHANNEL_HOOKS,
        data=payload
    )
    print(response.text)