from google.cloud import pubsub_v1
import json

SUBSCRIPTION_NAME = "projects/YOUR_PROJECT_ID/subscriptions/YOUR_SUBSCRIPTION_NAME"

def callback(message):
    data = json.loads(message.data)
    print(f"Task {data['task_id']} reminder at {data['reminder_at']}")
    # Add logic to send email, SMS, or push notification
    message.ack()

subscriber = pubsub_v1.SubscriberClient()
future = subscriber.subscribe(SUBSCRIPTION_NAME, callback=callback)

print(f"Listening for messages on {SUBSCRIPTION_NAME}...")
try:
    future.result()
except KeyboardInterrupt:
    future.cancel()
