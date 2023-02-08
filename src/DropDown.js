import { useState } from "react";
import useComponentVisible from "./utils/useComponentVisible";
import ChevronDown from "./chevron-down.png"
import ChevronUp from "./chevron-up.png"

const DropDown = ({ value, onChange, items, error }) => {
    const [textSearch, setTextSearch] = useState("");
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const changeOriginalValue = (v) => {
        setTextSearch("");
        onChange(v)
        setIsComponentVisible(false);
    }

    const filteredData = items ? items.filter((item) => {
        const regex = new RegExp("^" + textSearch, "i");
        return regex.test(item);
    }) : null

    return (
        <div className="contenedor" ref={ref}>
            <div className='contenedor-header'>

                {
                    isComponentVisible ? (
                        <input autoFocus={true} className='text-input' placeholder='This is a search input' value={textSearch} onChange={(ev) => setTextSearch(ev.target.value)} />
                    ) : value !== "" ? (<p className='texto-sucess'>{value}</p>) : (<p className='texto'>Select an item</p>)
                }
                <div className='check'>
                    {

                        isComponentVisible ? (
                            <img src={ChevronUp} alt="chevron" />
                        ) : (

                            <img src={ChevronDown} alt="chevron" />
                        )
                    }
                </div>
            </div>
            {
                isComponentVisible && (

                    <div className='contenedor-content'>
                        {filteredData ? filteredData.length > 0 ? filteredData.map((item) => (
                            <div onClick={() => changeOriginalValue(item)} className='item'><p className='item-text'>{item}</p></div>
                        ))
                            : (
                                <div className='item-false'><p className='item-text'>No items were found.</p></div>
                            ) : error ? (
                                <div className='item-false'><p className='item-text'>Server Error</p></div>
                            ) : (
                            <div className='item-false'><p className='item-text'>Loading...</p></div>
                        )}

                    </div>
                )
            }
        </div >
    )
}

export default DropDown;