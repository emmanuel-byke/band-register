
export default function ChooserCard(props) {
    const handleClick = (e, item) => {
        e.preventDefault();
        if(!props.currentImg || props.currentImg.value!==props.item.value) {
            props.setCurrentImg(item);
        }
    }
    return(
        <header 
            className={
                `${
                    props.currentImg && props.currentImg.value===props.item.value? "border-1 border-emerald-200 bg-gray-300": "border-transparent border-0"
                }
                 w-15 h-15 rounded-full shadow-2xl ml-2 cursor-pointer flex flex-row flex-wrap bg-amber-300/20 justify-center items-center`
            }>
                <a href="">
                    <img
                        src={props.item.value}
                        alt={props.item.name}
                        onClick={(e)=>handleClick(e, props.item)}
                        className="w-[50px] h-[50px] object-contain"
                    />
                </a>
        </header>
    );
}