import React from "react";
import {useNavigate} from '@remix-run/react'
import Button from "~/components/Button";

const _index = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Seleziona Modalità</h1>
                <div className="grid grid-cols-1 gap-4">
                    <Button onClick={() => navigate("/store")} icon={"shopping-bag"}>Negozio</Button>
                    <Button onClick={() => navigate("/bar")} icon={"coffee"}>Bar</Button>
                    {/* Future modes can be added here */}
                </div>
            </div>
        </div>
    )
}

export default _index