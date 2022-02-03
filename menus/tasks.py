from __future__ import absolute_import, unicode_literals

from celery import shared_task

import requests


@shared_task
def send_slack_message(message):

    payload = '{"text": "%s"}' % message

    response = requests.post(
        'https://hooks.slack.com/services/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',
        data=payload
    )
    print(response.text)