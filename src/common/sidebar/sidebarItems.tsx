import { JSX, ReactNode } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";

export interface SidebarItem {
  name: string;
  route: string;
  icon: React.ReactNode;
  subItems?: SidebarItem[];
}
export const sidebarItems: SidebarItem[] = [
  {
    name: "Inicio",
    route: "/dashboard",
    icon: <HomeOutlinedIcon sx={{ color: "white" }} />,
  },
  {
    name: "Equipos",
    route: "/dashboard/equipos",
    icon: <TvOutlinedIcon sx={{ color: "white" }} />,
    subItems: [
      {
        name: "Inventario Equipos",
        route: "/dashboard/equipos/inventario",
        icon: <InventoryIcon sx={{ color: "white", width: "1.2rem" }} />,
      },
      {
        name: "Hojas de Vida",
        route: "/dashboard/equipos/hojasdevida",
        icon: <DescriptionIcon sx={{ color: "white", width: "1.2rem" }} />,
      },
      {
        name: "Contratos Vigentes",
        route: "/dashboard/equipos/contratos",
        icon: <LayersIcon sx={{ color: "white", width: "1.2rem" }} />,
      },
    ],
  },
  {
    name: "Mantenimientos",
    route: "/dashboard/mantenimientos",
    icon: <EventNoteOutlinedIcon sx={{ color: "white" }} />,
  },
  {
    name: "Usuarios",
    route: "/dashboard/usuarios",
    icon: <PersonOutlineOutlinedIcon sx={{ color: "white" }} />,
  },
];
