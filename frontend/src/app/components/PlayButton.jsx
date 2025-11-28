export default function PlayButton({children}){
    return (
        <button className="playButton px-8 py-2 rounded-3xl cursor-pointer ">
            {children ? children : "Jouer"}
        </button>
    )
}