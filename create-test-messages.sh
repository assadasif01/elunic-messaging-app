#!/bin/bash

# Database connection details
DB_HOST=${APP_DB_HOST:-localhost}
DB_PORT=${APP_DB_PORT:-3306}
DB_USER=${APP_DB_USER:-app}
DB_PASS=${APP_DB_PASS:-app}
DB_NAME=${APP_DB_NAME:-app}

# Check if messages already exist
COUNT=$(mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "SELECT COUNT(*) FROM user_messages;" -s)

if [ "$COUNT" -gt "0" ]; then
  echo "$COUNT messages already exist. Skipping test data creation."
  exit 0
fi

# Create test messages
echo "Creating test messages..."

# Message 1
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('John Doe', 'john.doe@example.com', 'This is a test message from John.');"

# Message 2
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Jane Smith', 'jane.smith@example.com', 'Hello from Jane! Just testing the messaging system.');"

# Message 3
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Mike Johnson', 'mike@example.com', 'Great application! Looking forward to using it more.');"

# Message 4
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Sarah Williams', 'sarah@example.com', 'Just wanted to say hello and test this out.');"

# Message 5
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Robert Brown', 'robert@example.com', 'Testing the pagination feature with this message.');"

# Message 6
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Emily Davis', 'emily@example.com', 'This is message number 6 for testing.');"

# Message 7
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('James Wilson', 'james@example.com', 'Another test message to fill the database.');"

# Message 8
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Patricia Moore', 'patricia@example.com', 'Hello world! This is a test.');"

# Message 9
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Michael Taylor', 'michael@example.com', 'Almost done with the test messages!');"

# Message 10
mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASS $DB_NAME -e "INSERT INTO user_messages (name, email, message) VALUES ('Linda Anderson', 'linda@example.com', 'This is the final test message for pagination testing.');"

echo "Successfully created 10 test messages" 