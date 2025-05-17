const typeorm = require('typeorm');

const testMessages = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message from John.',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    message: 'Hello from Jane! Just testing the messaging system.',
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    message: 'Great application! Looking forward to using it more.',
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    message: 'Just wanted to say hello and test this out.',
  },
  {
    name: 'Robert Brown',
    email: 'robert@example.com',
    message: 'Testing the pagination feature with this message.',
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com',
    message: 'This is message number 6 for testing.',
  },
  {
    name: 'James Wilson',
    email: 'james@example.com',
    message: 'Another test message to fill the database.',
  },
  {
    name: 'Patricia Moore',
    email: 'patricia@example.com',
    message: 'Hello world! This is a test.',
  },
  {
    name: 'Michael Taylor',
    email: 'michael@example.com',
    message: 'Almost done with the test messages!',
  },
  {
    name: 'Linda Anderson',
    email: 'linda@example.com',
    message: 'This is the final test message for pagination testing.',
  },
];

// We'll simply use the raw queries directly and avoid the class definition issues

async function createTestMessages() {
  const connection = await typeorm.createConnection({
    type: 'mysql',
    host: 'db', // Force the host to be 'db'
    port: parseInt(process.env.APP_DB_PORT || '3306', 10),
    username: process.env.APP_DB_USER || 'app',
    password: process.env.APP_DB_PASS || 'app',
    database: process.env.APP_DB_NAME || 'app',
    entities: [],
    synchronize: false,
  });

  // Execute a raw SQL query to insert messages
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  
  try {
    // Check if messages already exist
    const result = await queryRunner.query('SELECT COUNT(*) as count FROM user_messages');
    const count = result[0].count;
    
    if (count > 0) {
      console.log(`${count} messages already exist. Skipping test data creation.`);
      return;
    }

    // Create test messages
    for (const testMessage of testMessages) {
      await queryRunner.query(
        'INSERT INTO user_messages (name, email, message) VALUES (?, ?, ?)',
        [testMessage.name, testMessage.email, testMessage.message]
      );
      console.log(`Created message: ${testMessage.name}`);
    }

    console.log('Successfully created 10 test messages');
  } catch (error) {
    console.error('Error creating test messages:', error);
  } finally {
    await queryRunner.release();
    await connection.close();
  }
}

createTestMessages().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 