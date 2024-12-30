import os
from google.cloud import pubsub_v1

# Set the environment variable for authentication
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/aadyamanchanda/Downloads/taskscheduler-443220-2695613cae3e.json'

# Initialize the Subscriber client
subscriber = pubsub_v1.SubscriberClient()

# Define your subscription path
project_id = 'taskscheduler-443220'
subscription_id = 'task-reminders-sub'
subscription_path = subscriber.subscription_path(project_id, subscription_id)

def callback(message):
    print(f"Received message: {message.data.decode('utf-8')}")
    # Acknowledge the message to confirm successful processing
    message.ack()

# Subscribe to the subscription and listen for messages
streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
print(f"Listening for messages on {subscription_path}...")

try:
    # Keep the main thread alive to listen for messages
    streaming_pull_future.result()
except KeyboardInterrupt:
    # Gracefully shut down on interrupt
    streaming_pull_future.cancel()
    streaming_pull_future.result()


# Initialize the Publisher client
publisher = pubsub_v1.PublisherClient()

# Define your topic path
project_id = 'taskscheduler-443220'
topic_id = 'task-reminders'
topic_path = publisher.topic_path(project_id, topic_id)

# Publish a message
message = "Hello, this is a test message!"
future = publisher.publish(topic_path, message.encode('utf-8'))
print(f"Published message ID: {future.result()}")
