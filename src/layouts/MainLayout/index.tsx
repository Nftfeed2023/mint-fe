import { MAIN_MENUS } from "~/routes/routes"
import MasterLayout from "../MasterLayout"


const MainLayout = ({ children }) => {
  return <MasterLayout children={children} menus={MAIN_MENUS} />
}

export default MainLayout;
