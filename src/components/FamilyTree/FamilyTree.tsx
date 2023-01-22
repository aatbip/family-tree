import { Box } from "@mui/material";
import React from "react";
import { FamilyMember } from "../../interfaces/app.interface";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import { selectApp, setSelectedMember } from "../../redux/app/appSlice";
import store from "../../redux/store";

const FamilyTree: React.FC = () => {
  const { familyMember, selectedMember } = useSelector(selectApp);

  const renderTreeItems = (nodes: FamilyMember) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => store.dispatch(setSelectedMember(nodes))}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: FamilyMember) => renderTreeItems(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      <Box
        sx={{
          flex: 1,
          minWidth: "23em",
          maxWidth: "18em",
          border: "2px solid #889cbf",
          borderRadius: "10px",
          "@media (max-width: 820px)": {
            minWidth: "100%",
          },
          "@media (max-width: 450px)": {
            minWidth: "23em",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: 1,
            borderBottom: "2px solid #889cbf",
          }}
        >
          <p>Family Tree</p>
        </Box>

        <Box
          sx={{
            px: 1,
            py: 1,
            height: 340,
            maxHeight: 340,
            overflowY: "auto",
          }}
        >
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 300, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            {renderTreeItems(familyMember)}
          </TreeView>
        </Box>
      </Box>
    </>
  );
};

export default FamilyTree;
