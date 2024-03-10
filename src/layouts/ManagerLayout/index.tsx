import { MANAGER_MENUS } from "~/routes/routes"
import MasterLayout from "../MasterLayout"


const ManagerLayout = ({ children }) => {
    return <MasterLayout children={children} menus={MANAGER_MENUS} />
}

export default ManagerLayout;