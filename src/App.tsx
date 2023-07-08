import './App.css'
import Fishbone from "@hophiphip/react-fishbone";

function App() {

    return (
        <>
            <Fishbone
                items={{
                    "name": "Flaws",
                    "children": [
                        {
                            "name": "Machines",
                            "children": [
                                {"name": "Speed"},
                                {"name": "Bits"},
                                {"name": "Sockets"}
                            ]
                        },{
                            "name": "Machines",
                            "children": [
                                {"name": "Speed"},
                                {"name": "Bits"},
                                {"name": "Sockets"}
                            ]
                        },{
                            "name": "Machines",
                            "children": [
                                {"name": "Speed"},
                                {"name": "Bits"},
                                {"name": "Sockets"}
                            ]
                        }
                    ]
                }}
                wrapperStyle={{
                    width: 1200,
                    height: 500,
                }}
            />
        </>
    )
}

export default App
