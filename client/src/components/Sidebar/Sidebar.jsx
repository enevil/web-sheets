import css from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import { ReactComponent as GearSvg } from "../../svg/Combined Shape.svg";
import { ReactComponent as CalendarSvg } from "../../svg/Dial-numbers.svg";
import { ReactComponent as StatisticSvg } from "../../svg/Statistic.svg";
import { ReactComponent as ProfileIcon } from "../../svg/Profile-icon.svg";
import { ReactComponent as WineSvg } from "../../svg/Wine.svg";

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.container}>
        <SidebarItem text="Мой профиль" svg={<ProfileIcon />} />
        <SidebarItem to="calendar" text="Календарь" svg={<CalendarSvg />} />
        <SidebarItem to="statistic" text="Статистика" svg={<StatisticSvg />} />
        <SidebarItem to="recipes" text="Мои раскладки" svg={<WineSvg />} />
        <SidebarItem to="settings" text="Настройки" svg={<GearSvg />} />
      </div>
    </div>
  );
};

export default Sidebar;
