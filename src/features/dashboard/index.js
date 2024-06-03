import BarChart from './components/BarChart'
import DoughnutChart from './components/DoughnutChart'
import Transactions from '../transactions'
import { ApiUrl } from '../../utils/api'
import DashboardStats from './components/DashboardStats'


function Dashboard() {

    return (
        <>

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                <DashboardStats />
            </div>



            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {/* <LineChart /> */}
                {/* <DoughnutChart /> */}
                {/* <BarChart /> */}
            </div>

            {/* ================ transaction table =========== */}
            <Transactions transactions={ApiUrl?.transaction_get} />
            {/* ================ transaction table =========== */}

            {/** ---------------------- Different stats content 2 ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard;