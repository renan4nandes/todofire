import axios from 'axios'

import { Button } from "../components/Button";

import { signIn, signOut, useSession, getSession } from "next-auth/client"

export default function Home({ todos }){
    const [session] = useSession()

    console.log(todos)

    return(
        <div className="h-screen bg-white dark:bg-gray-900">
            <header className="flex p-4 items-center justify-between">
                <h1 className="font-montserrat text-2xl dark:text-white">Todo<strong className="text-orange">Fire</strong></h1>
                {
                    session ? ( <Button title="Logout" onClick={() => signOut()} /> ) : ( <Button title="Login" onClick={() => signIn()} /> )
                }
            </header>

            <main className="p-4">
                {
                    session ? (
                        <>
                            <Button title="Create todo" />
                            {
                                todos.map(todo => {
                                    <li className="dark:text-white">{todo.name}</li>
                                })
                            }
                        </>
                    ) : (
                        <li className="dark:text-white">Login to see your todos</li>
                    )
                }
                
                {
                    session && (
                        <div className="absolute bottom-0 mb-4 dark:text-white opacity-30">
                            <p>{session.user.name}</p>
                        </div>
                    )
                }
            </main>
        </div>
    )
}