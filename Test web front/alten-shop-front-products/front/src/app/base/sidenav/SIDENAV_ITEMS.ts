import { SidenavItem } from "app/base/sidenav/sidenav.model";
import { PrimeIcons } from "primeng/api";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'Menu-item-1',
    icon: PrimeIcons.SHOPPING_CART,
    labels: {
      en: "Products",
      fr: "Produits"
    },
    link: '/products'

  },
  {
    id: 'Menu-item-2',
    icon: PrimeIcons.USERS,
    labels: {
      en: "Admin",
      fr: "Admin"
    },
    link: '/admin/products'

  }

];