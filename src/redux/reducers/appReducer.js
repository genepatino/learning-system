import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setActiveCategory: ["activeCategory"],
  setActiveSesion: ["activeSesion"],
  setMenuData: ["menuData"],
  setActiveItem: ["activeItem"],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  activeCategory: null,
  activeSesion: false,
  activeItem: null,
  menuData: [
    {
      id: 0,
      icon: "cubes",
      span: "Recursos",
      items: [
        {
          id: 0,
          name: "Notas",
          rute: "/admin/notes",
        },
        {
          id: 1,
          name: "Personas",
          rute: "/admin",
        },
        {
          id: 2,
          name: "Servicio",
          rute: "/admin",
        },
        {
          id: 3,
          name: "Transportadoras",
          rute: "/admin",
        },
      ],
    },
    {
      id: 1,
      icon: "dolly",
      span: "Logística",
      items: [
        { id: 4, name: "item 1", rute: "/admin" },
        { id: 5, name: "item 2", rute: "/admin" },
        {
          id: 6,
          name: "item 3",
          rute: "/admin",
        },
        {
          id: 7,
          name: "item 4",
          rute: "/admin",
        },
      ],
    },
    {
      id: 2,
      icon: "hand-holding-usd",
      span: "Finanzas",
      items: [
        {
          id: 8,
          name: "item 1",
          rute: "/admin",
        },
        { id: 9, name: "item 2", rute: "/admin" },
        { id: 10, name: "item 3", rute: "/admin" },
        { id: 11, name: "item 4", rute: "/admin" },
      ],
    },
    {
      id: 3,
      icon: "tools",
      span: "Configuración",
      items: [
        { id: 12, name: "item 1", rute: "/admin" },
        { id: 13, name: "item 2", rute: "/admin" },
        { id: 14, name: "item 3", rute: "/admin" },
        { id: 15, name: "item 4", rute: "/admin" },
      ],
    },
    {
      id: 4,
      icon: "edit",
      span: "Auditoría",
      items: [
        { id: 16, name: "item 1", rute: "/admin" },
        { id: 17, name: "item 2", rute: "/admin" },
        { id: 18, name: "item 3", rute: "/admin" },
        { id: 19, name: "item 4", rute: "/admin" },
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ACTIVE_CATEGORY]: setActiveCategory,
  [Types.SET_ACTIVE_SESION]: setActiveSesion,
  [Types.SET_MENU_DATA]: setMenuData,
  [Types.SET_ACTIVE_ITEM]: setActiveItem,
});
