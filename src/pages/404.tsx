import Head from 'next/head'

function Page404(){
    return(
        <div className="h-screen flex justify-center items-center bg-white dark:bg-darkgray">
            <Head>
                <title>TodoFire - 404</title>
            </Head>
            <h1 className="font-montserrat text-4xl mr-4 dark:text-white">Todo<strong className="text-orange">Fire</strong></h1>
            <p className="dark:text-white">404 error - Not found</p>
        </div>
    )
}

export default Page404