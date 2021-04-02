interface ButtonProps{
    onClick?: () => void,
    title: String
}

export function Button(props: ButtonProps){
    return(
        <button onClick={props.onClick} className="bg-orange w-24 h-8 rounded-md cursor-pointer dark:text-white font-semibold">{props.title}</button>
    )
}