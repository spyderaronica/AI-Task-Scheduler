from datetime import datetime
from google.cloud import pubsub_v1

# Initialize Publisher
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path('taskscheduler-443220', 'task-reminders')

def publish_reminder(task_id: int, reminder_at: str):
    """
    Publish a reminder message to Pub/Sub.
    :param task_id: ID of the task.
    :param reminder_at: ISO format datetime string for the reminder.
    """
    message = f"Task ID: {task_id}, Reminder At: {reminder_at}"
    future = publisher.publish(topic_path, message.encode('utf-8'))
    print(f"Published reminder for task {task_id} scheduled at {reminder_at}. Message ID: {future.result()}")

# Example usage
if __name__ == "__main__":
    task_id = 1  # Example task ID
    reminder_at = datetime.now().isoformat()  # Current time in ISO format
    publish_reminder(task_id, reminder_at)
