"use client";
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {getAllUsers} from './api/user'
import Link from 'next/link';

type UserInterface = {
  id: number;
  name: string,
  email: string,
  phone: string,
};

export default function User() {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);

  const showAllUsers = async ()=>{
    try {
      const response = await getAllUsers(); // Assuming getAllUsers is defined
      setAllUsers(response);
      setUsers(response);
      // Handle the response data as needed
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error
    }
  }

  const filterUsers = (keyword:string) => {
    const filteredUsers = allUsers.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(keyword.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(keyword.toLowerCase());
      return nameMatch || emailMatch;
    });
    setUsers(filteredUsers);
  };

  useEffect(() => {
    showAllUsers();

  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        {/* <Navbar /> */}
        <div className=' class="w-3/12 bg-gray-200"'>
          <Sidebar />
        </div>

        <div className='w-9/12 bg-white-300'>
          <section className="container px-4 mx-auto">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">User List</h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These companies have purchased in the last 12 months.</p>
            <input
              type="text"
              className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 py-2 px-4"
              placeholder="Search"
              onChange={(e:  React.ChangeEvent<HTMLInputElement>)=> filterUsers(e.target.value)}
            />
            <Link href="/add_user" className='float-right -my-4'>
                <button className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                
                  <span className="mx-1">Add New</span>
              </button>
            </Link>
            <div className="flex flex-col mt-10">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <span>User ID</span>
                          </th>

                          <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Name
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Email
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Phone</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {users && users.map((user:any, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              {user?.id}
                            </td>
                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              {user?.name}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {user?.email}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {user?.phone}
                            </td>
                          </tr>
                        ))}

                       
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
