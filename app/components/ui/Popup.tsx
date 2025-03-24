import React from 'react'


const Popup: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div className={"fixed top-0 left-0 w-screen h-screen bg-black z-50 bg-opacity-30 flex  m-2 justify-around items-center"}>
            <div className={"bg-white border-2 max-w-[90%] max-h-[80%] min-w-[400px] min-h-[250px] p-2 drop-shadow items-center flex flex-col justify-around"}>
                {children}
            </div>
        </div>
    )
}

export default Popup