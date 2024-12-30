from google.cloud import pubsub_v1
import json

SUBSCRIPTION_NAME = "projects/taskscheduler-443220/subscriptions/task-reminders-sub"

def callback(message):
    data = json.loads(message.data)
    print(f"Task {data['task_id']} reminder at {data['reminder_at']}")
    # Add logic to send email, SMS, or push notification
    message.ack()

subscriber = pubsub_v1.SubscriberClient()
future = subscriber.subscribe(SUBSCRIPTION_NAME, callback=callback)

print(f"Listening for messages on task-reminders-sub...")
try:
    future.result()
except KeyboardInterrupt:
    future.cancel()
