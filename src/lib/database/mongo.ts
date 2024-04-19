import { connect, connections, ConnectOptions } from 'mongoose';

export const connectDB = async () => {
  if (connections[0].readyState) {
    console.log('Already connected to database');
    return;
  }
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    console.log('No DATABASE_URI found');
    process.exit(1);
  }

  const options = {} as ConnectOptions;

  const conn = await connect(uri, options);

  console.log(`Connected to database: ${conn.connection.name} collection: ${conn.connection.db.databaseName}`);
};
