import "./App.css";
import store from "./redux/store";
import {
  addFamily,
  exportJSON,
  printPDF,
  selectApp,
  setFamilyMember,
} from "./redux/app/appSlice";
import FamilyTree from "./components/FamilyTree/FamilyTree";
import FamilyDetail from "./components/FamilyDetail/FamilyDetail";
import { Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { FamilyMember } from "./interfaces/app.interface";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  gap: "10px",
});

const buttonStyles = {
  fontWeight: "bold",
  width: 150,
  border: "2px solid #889cbf",
  height: 45,
  color: "#000",
};

const App = () => {
  const { newMember, familyMember, selectedMember } = useSelector(selectApp);

  const handleAddFamily = () => {
    if (
      !newMember.id ||
      !newMember.name ||
      !newMember.familyDetail.spouse ||
      !newMember.familyDetail.presentAddress ||
      !newMember.familyDetail.location ||
      !newMember.familyDetail.familyPhoto
    ) {
      toast.error("Please enter details!");
      return;
    }
    if (Object.keys(familyMember).length !== 0) {
      if (Object.keys(selectedMember).length === 0) {
        toast.error("Please choose parent!");
        return;
      }
    }

    store.dispatch(addFamily());
  };

  const importJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.name = "json";
    input.click();

    input.onchange = (ev: Event) => {
      ev.preventDefault();
      if (!input.files) return;
      let file = input.files[0];
      let reader = new FileReader();

      reader.readAsText(file, "UTF-8");
      reader.onload = function (ev) {
        let json = ev.target?.result;
        store.dispatch(setFamilyMember(JSON.parse(json as string)));
      };
    };
  };

  return (
    <Box
      sx={{
        p: 5,
        minWidth: 350,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <FamilyTree />
        <FamilyDetail />
      </Box>

      <Box
        sx={{
          width: "22em",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 1,
        }}
      >
        <ButtonContainer>
          <Button onClick={importJSON} sx={buttonStyles} variant="outlined">
            Import JSON
          </Button>

          <Button
            onClick={handleAddFamily}
            sx={buttonStyles}
            variant="outlined"
          >
            Add Family
          </Button>
        </ButtonContainer>

        <ButtonContainer>
          <Button
            onClick={() => store.dispatch(exportJSON())}
            sx={buttonStyles}
            variant="outlined"
          >
            Export JSON
          </Button>

          <Button
            onClick={() => store.dispatch(printPDF())}
            sx={buttonStyles}
            variant="outlined"
          >
            Print Family Tree
          </Button>
        </ButtonContainer>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <p>Shape of JSON:</p>
          <img
            style={{ width: "350px" }}
            src="/snippet.png"
            alt="json format"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
