import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdViewColumn } from "react-icons/md";

const menu = [
    {
        label: "Carteira",
        path: "/",
        icon: TbLayoutDashboardFilled,
        role: "",
    },
    {
        label: "Gráficos",
        path: "/graficos",
        icon: MdViewColumn,
        role: "",
    }
];

export const getMenuByRole = (role) => {
  return menu.filter(item => {
    if (item.role && item.role !== role) return false;
    return true;
  });
};

export default menu;