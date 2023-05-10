import {ROUTE, BASE} from '../../../../shared/constants/index';

export const galleryDetail = {
  title: BASE.gallary,
  addBtn: BASE.addImage,
  addBtnUrl: ROUTE.add,
};

export const adminMenu = [
  {menuName: BASE.adminProduct, menuUrl: ROUTE.product},
  {menuName: BASE.adminCategory, menuUrl: ROUTE.category},
  {menuName: BASE.adminGallery, menuUrl: ROUTE.gallery},
];
