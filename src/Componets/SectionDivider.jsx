


export default function SectionDivider(props) {
    const borderColor = props.borderColor?? "border-gray/60";
    const color = props.color?? "bg-blue-500";
    const value = props.value?? "Category";

    return (
        <header className="flex flex-row justify-center items-center gap-3">
            <div className={`border-1 ${borderColor} w-45 h-0 rounded-2xl`}></div>
            <div className={`${color} rounded-2xl px-4 py-1`}>
                <h1 className="text-white text-[18px] font-roboto-slab">{value}</h1>
            </div>
            <div className={`border-1 ${borderColor} w-45 h-0 rounded-2xl`}></div>

        </header>
    );
}