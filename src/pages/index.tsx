import { useState } from 'react'
import axios from 'axios'

import { Button } from "../components/Button";
import { signIn, signOut, useSession, getSession } from "next-auth/client"
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

function Home(){
    const [session] = useSession()

    async function createTodo(){
        const todoName = prompt('What is the todo name?')
        
        await axios.post(`/api/todos/post/${session.user.email}/${todoName}`)

        window.location.reload()
    }

    async function deleteTodo(id){
        await axios.post(`/api/todos/delete/${id}`)
    }

    function LoadTodos() {
        const { data, error } = useSWR(`/api/todos/get/${session?.user.email}`, fetcher)
    
        if (error) return <div>failed to load</div>
        if (!data) return (
            <div className="w-full h-20 mt-10 bg-gray-200 mb-3 rounded-md dark:bg-opacity-10 flex items-center justify-center animate-pulse" />
        )
        if(data != undefined) {
            return (
              data.map(todo => (
                 <div className="flex flex-row items-center">
                    <li id="todo" className="mt-6 mr-4 dark:text-white">
                        {todo.name}
                    </li>
                    <Button title="Delete" onClick={() => deleteTodo(todo._id)} />
                 </div>
               ))
            )
    
        } else {
            return (
                <div className="w-full h-20 bg-gray-200 mb-3 rounded-md dark:bg-opacity-10flex items-center justify-center">
                        <h1 className="dark:text-white font-semibold question mb-1">Error ao carregar os dados</h1>
                        <h3 className="dark:text-white opacity-80 font-normal answer text-xs">Dados não existente ou não foi possível se conectar ao banco de dados</h3>
                </div>
            )
        }
    }

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
                            <Button title="Create todo" onClick={createTodo} />
                            {
                                LoadTodos()
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

export default Home