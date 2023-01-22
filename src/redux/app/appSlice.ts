import { createSlice } from "@reduxjs/toolkit";
import { FamilyMember } from "../../interfaces/app.interface";
import store, { RootState } from "../store";
import { v4 as uuid } from "uuid";
import bfs from "../../utils/bfs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InitialState {
  familyMember: FamilyMember | any;
  selectedMember: FamilyMember | any;
  newMember: FamilyMember;
  typing: boolean;
}

const initialState: InitialState = {
  familyMember: {},

  selectedMember: {},
  newMember: {
    id: "",
    parentId: null,
    name: "",
    familyDetail: {
      spouse: "",
      location: "",
      birthYear: "",
      presentAddress: "",
      familyPhoto: [],
    },
    children: [],
  },
  typing: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addFamily: (state) => {
      if (Object.keys(state.familyMember).length === 0) {
        state.familyMember = {
          ...state.newMember,
          id: "root",
        };
        state.newMember = {
          id: "",
          parentId: null,
          name: "",
          familyDetail: {
            spouse: "",
            location: "",
            birthYear: "",
            presentAddress: "",
            familyPhoto: [],
          },
          children: [],
        };
        state.typing = false;
        return;
      }

      let n: any = bfs(
        state.selectedMember.id,
        state.familyMember,
        state.newMember
      );

      state.familyMember = n;
      state.newMember = {
        id: "",
        parentId: null,
        name: "",
        familyDetail: {
          spouse: "",
          location: "",
          birthYear: "",
          presentAddress: "",
          familyPhoto: [],
        },
        children: [],
      };
      state.typing = false;
    },

    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
    updateFamilyDetail: (state, action) => {
      const { name, value, type, files } = action.payload;
      state.typing = true;

      if (name === "name") {
        state.newMember = {
          ...state.newMember,
          id: uuid(),
          name: value,
        };
      }

      if (type === "file") {
        let blob: any = [];
        for (let i = 0; i < files.length; i++) {
          blob = [...blob, URL.createObjectURL(files[i])];
        }
        state.newMember = {
          ...state.newMember,
          familyDetail: {
            ...state.newMember.familyDetail,
            familyPhoto: [...blob],
          },
        };
        return;
      }

      state.newMember = {
        ...state.newMember,
        familyDetail: {
          ...state.newMember.familyDetail,
          [name]: value,
        },
      };
    },

    exportJSON: (state) => {
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(state.familyMember)
      )}`;

      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "family.json";

      link.click();
    },

    setFamilyMember: (state, action) => {
      state.familyMember = action.payload;
    },

    printPDF: (state) => {
      const doc = new jsPDF();

      let body: string[][] = [];

      function appendFamily(family: any) {
        let b: any = [];
        b.unshift(family.familyDetail.presentAddress);
        b.unshift(family.familyDetail.birthYear);
        b.unshift(family.familyDetail.location);
        b.unshift(family.familyDetail.spouse);
        b.unshift(family.name);

        body.unshift(b);
        b = [];

        if (family.children.length === 0) {
          return;
        }

        if (Array.isArray(family.children)) {
          family.children.forEach((family: any) => {
            appendFamily(family);
          });
        }
      }

      appendFamily(state.familyMember);


      autoTable(doc, {
        head: [["Name", "Spouse", "Location", "Birth Year", "Present Address"]],
        body: body.map((el: string[]) => el),
      });

      doc.save("family.pdf");
    },
  },
});

export const selectApp = (state: RootState) => state.app;

export const {
  addFamily,
  setSelectedMember,
  updateFamilyDetail,
  exportJSON,
  setFamilyMember,
  printPDF,
} = appSlice.actions;

export default appSlice.reducer;
