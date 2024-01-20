import type { NextApiRequest, NextApiResponse } from "next";



async function getAllUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const users = await response.json();

    // Extract relevant user data
    const userData = users.map((user:any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    
  }
}

async function saveUser(newUser:any) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    const savedUser = await response.json();
    return savedUser;
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

export { getAllUsers, saveUser };