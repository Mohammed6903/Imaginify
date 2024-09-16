// app/api/create-user/route.ts

import { NextResponse } from 'next/server';
import { createUser } from '@/lib/actions/user.actions'; // Adjust the import path as needed
import { connectToDatabase } from '@/lib/database/mongoose'; // Adjust the import path as needed

// Define the POST request handler
export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse JSON data from the request body
    const userData = await req.json();

    // Create a new user using the createUser function
    const newUser = await createUser(userData);

    // Return a success response with the created user data
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error: unknown) {
    // Handle errors and return an appropriate response
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
      return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
