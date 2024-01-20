"use client";
import { FormHTMLAttributes, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { saveUser } from './api/user'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserInterface = {
    name: string,
    email: string,
    phone: string,
};

export default function AddUser() {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [form, setForm] = useState<UserInterface>({
        name: '',
        email: '',
        phone: '',
      });
    const { push } = useRouter();

    const handleForm = async (e: React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(validateForm()){
            // save form
            const res = await saveUser(form);
            console.log('saveUser', res);
            if(res?.id){
                push('/user');
            }
        }
    }

    const validateForm = ()=>{
        setErrorMsg('');
        if(!form.name){
            setErrorMsg('Please Type Name');
            return false;
        }
        if(!form.email){
            setErrorMsg('Please Type Email Id');
            return false;
        }
        if(!form.phone){
            setErrorMsg('Please Type Phone No');
            return false;
        }
        if(form.phone.length < 10){
            setErrorMsg('Please Enter Valid Phone No');
            return false;
        }
        return true;
    }

    return (
        <div>
            <Navbar />
            <div className="flex">
                {/* <Navbar /> */}
                <div className=' className="w-3/12 bg-gray-200"'>
                    <Sidebar />
                </div>

                <div className='w-9/12 bg-white-300'>
                    <section className="container px-4 mx-auto">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Add User</h2>

                        <p className="mt-1 text-sm text-red-500">* fields are mandatory.</p>
                        {JSON.stringify(form)}
                        <Link href="/user" className='float-right -my-4'>
                            <button className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                               
                                <span className="mx-1">Back</span>
                            </button>
                        </Link>
                        <div className="flex flex-col mt-10">
                            <section className="p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
                                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                                    Account settings
                                </h2>

                                <form onSubmit={handleForm}>
                                    <div className='text text-sm text-red-500'>
                                        {errorMsg}
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                        <div>
                                            <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
                                            <input name="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })}
                                            value={form.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                        <div>
                                            <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email Address</label>
                                            <input name="email" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })}
                                            value={form.email}/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                        <div>
                                            <label className="text-gray-700 dark:text-gray-200" htmlFor="phone">Phone</label>
                                            <input name="phone" type="tel" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })}
                                            value={form.phone}/>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                        <div className="flex justify-center mt-6">
                                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type='reset'>
                                                    Reset
                                            </button>
                                            <button className="mx-2 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600" type='submit'>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
