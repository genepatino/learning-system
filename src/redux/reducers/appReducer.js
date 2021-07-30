import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setActiveCategory: ["activeCategory"],
  setActiveSesion: ["activeSesion"],
  setMenuData: ["menuData"],
  setActiveItem: ["activeItem"],
  setUsers: ["users"],
  setEditUser: ["editUser"],
  setActiveTitleItem: ["activeTitleItem"],
  setLanguage: ["language"],
  setError: ["error"],
  setOpenModal: ["openModal"],
  setLoader: ["loader"],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  activeCategory: null,
  activeSesion: false,
  activeItem: null,
  activeTitleItem: null,
  openModal: false,
  loader: true,
  users: [],
  editUser: {},
  menuData: [
    {
      id: 0,
      icon: "cubes",
      span: "menu.resourses",
      items: [
        {
          id: 0,
          name: "menu.notes",
          rute: "/admin/notes",
        },
        {
          id: 1,
          name: "menu.people",
          rute: "/admin",
        },
        {
          id: 2,
          name: "menu.service",
          rute: "/admin",
        },
        {
          id: 3,
          name: "menu.conveyors",
          rute: "/admin",
        },
      ],
    },
    {
      id: 1,
      icon: "users",
      span: "menu.users",
      items: [
        { id: 4, name: "menu.user-list", rute: "/admin/users" },
        { id: 5, name: "menu.item", rute: "/admin" },
        {
          id: 6,
          name: "menu.item",
          rute: "/admin",
        },
        {
          id: 7,
          name: "menu.item",
          rute: "/admin",
        },
      ],
    },
    {
      id: 2,
      icon: "route",
      span: "menu.routes",
      items: [
        {
          id: 8,
          name: "menu.directions",
          rute: "/admin/directions",
        },
        { id: 9, name: "menu.item", rute: "/admin" },
        { id: 10, name: "menu.item", rute: "/admin" },
        { id: 11, name: "menu.item", rute: "/admin" },
      ],
    },
    {
      id: 3,
      icon: "tools",
      span: "menu.setting",
      items: [
        { id: 12, name: "menu.item", rute: "/admin" },
        { id: 13, name: "menu.item", rute: "/admin" },
        { id: 14, name: "menu.item", rute: "/admin" },
        { id: 15, name: "menu.item", rute: "/admin" },
      ],
    },
    {
      id: 4,
      icon: "edit",
      span: "menu.audit",
      items: [
        { id: 16, name: "menu.item", rute: "/admin" },
        { id: 17, name: "menu.item", rute: "/admin" },
        { id: 18, name: "menu.item", rute: "/admin" },
        { id: 19, name: "menu.item", rute: "/admin" },
      ],
    },
  ],
});

/* ------------- Reducers ------------- */

export const setActiveCategory = (state, { activeCategory }) =>
  state.merge({ activeCategory });

export const setActiveSesion = (state, { activeSesion }) =>
  state.merge({ activeSesion });

export const setMenuData = (state, { menuData }) => state.merge({ menuData });

export const setActiveItem = (state, { activeItem }) =>
  state.merge({ activeItem });

export const setUsers = (state, { users }) => state.merge({ users });

export const setEditUser = (state, { editUser }) => state.merge({ editUser });

export const setActiveTitleItem = (state, { activeTitleItem }) =>
  state.merge({ activeTitleItem });

export const setOpenModal = (state, { openModal }) =>
  state.merge({ openModal });

export const setLoader = (state, { loader }) => state.merge({ loader });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ACTIVE_CATEGORY]: setActiveCategory,
  [Types.SET_ACTIVE_SESION]: setActiveSesion,
  [Types.SET_MENU_DATA]: setMenuData,
  [Types.SET_ACTIVE_ITEM]: setActiveItem,
  [Types.SET_USERS]: setUsers,
  [Types.SET_EDIT_USER]: setEditUser,
  [Types.SET_ACTIVE_TITLE_ITEM]: setActiveTitleItem,
  [Types.SET_OPEN_MODAL]: setOpenModal,
  [Types.SET_LOADER]: setLoader,
});
