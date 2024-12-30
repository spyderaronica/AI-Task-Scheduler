from datetime import datetime
from google.cloud import pubsub_v1

def publish_reminder(message: str, topic_name: str = "reminder-topic"):
    """Publish a reminder message to a Google Cloud Pub/Sub topic."""
    # Initialize the Publisher client
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path('your-project-id', topic_name)

    # Convert the message to bytes
    data = message.encode("utf-8")

    # Publish the message to the topic
    future = publisher.publish(topic_path, data)
    print(f"Message published to {topic_path}: {future.result()}")

# Example usage
if __name__ == "__main__":
    publish_reminder("This is a test reminder!")
