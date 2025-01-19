import { Heading } from "@radix-ui/themes"
import KeyAccount from "./KeyAccount"
import Clients from "./Clients"

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">

                <div className="flex flex-col p-36 py-24 gap-24 justify-center  border border-gray-300 rounded-lg">
                    <Heading>Dashboard</Heading>
                    <div className="flex flex-col gap-8">
                        <Clients />

                        <KeyAccount />
                    </div>
                </div>
            </div>



        </>
    )
}

export default Dashboard
