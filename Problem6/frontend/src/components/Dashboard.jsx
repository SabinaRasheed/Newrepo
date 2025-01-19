import { Heading } from "@radix-ui/themes"
import KeyAccount from "./KeyAccount"
import Clients from "./Clients"

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">

            <div className="flex flex-col p-16 md:p-24 lg:p-32 gap-16 justify-center border border-gray-200 shadow-md rounded-lg bg-white max-w-4xl mx-auto">
  <Heading className="text-2xl font-semibold text-gray-800 text-center">
    Dashboard
  </Heading>
  <div className="flex flex-col gap-12">
    <Clients />
    <KeyAccount />
  </div>
</div>

            </div>



        </>
    )
}

export default Dashboard
