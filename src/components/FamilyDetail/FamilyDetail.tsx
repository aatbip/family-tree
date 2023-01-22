import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FamilyMember } from "../../interfaces/app.interface";
import { selectApp, updateFamilyDetail } from "../../redux/app/appSlice";
import store from "../../redux/store";
import bfs from "../../utils/bfs";

interface InputFieldProp {
  fieldName: string;
  children: React.ReactNode;
}

const InputField = (props: InputFieldProp) => {
  const { fieldName, children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        lineHeight: "2em",
        padding: "10px 0px",
      }}
    >
      <p
        style={{
          width: "200px",
        }}
      >
        {fieldName}
      </p>
      <span
        style={{
          marginRight: "0.5em",
        }}
      >
        :
      </span>
      {children}
    </Box>
  );
};

const Label = styled("label")({
  border: "2px dashed #889cbf",
  padding: "2px 10px",
  cursor: "pointer",
  textAlign: "center",
  width: "235px",
  "@media (max-width: 600px)": {
    width: "80%",
  },
});

const FamilyDetail = () => {
  const { typing, newMember, familyMember, selectedMember } =
    useSelector(selectApp);


  const [previewImage, setPreviewImage] = React.useState<string[]>([]);

  // React.useEffect(() => {
  //   setPreviewImage([]);
  //     for (
  //       let i = 0;
  //       i < selectedMember?.familyDetail?.familyPhoto.length;
  //       i++
  //     ) {
  //       setPreviewImage((prev) => {
  //         return [
  //           ...prev,
  //           URL.createObjectURL(selectedMember?.familyDetail?.familyPhoto[i]),
  //         ];
  //       });
  //     }
  // }, [selectedMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    store.dispatch(updateFamilyDetail({ name, value, type, files }));
  };

  return (
    <Box
      sx={{
        flex: 2,
        borderRadius: "10px",
        px: 5,
        border: "2px solid #889cbf",
      }}
    >
      <p
        style={{
          borderBottom: "2px solid #889cbf",
          textAlign: "center",
        }}
      >
        Family Details
      </p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          "@media (max-width: 800px)": {
            flexWrap: "wrap-reverse",
          },
        }}
      >
        {selectedMember?.familyDetail?.familyPhoto.length > 0 && (
          <Box
            sx={{
              display: "flex",
              width: "350px",
              flexWrap: "wrap",
              columnGap: "5px",
              rowGap: "5px",
              p: "10px 0px",
              height: 300,
              overflowY: "auto",
              "@media (max-width: 800px)": {
                width: "90%",
              },
            }}
          >
            {selectedMember?.familyDetail?.familyPhoto.map((el: any) => {
              return (
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  src={el}
                  alt="img"
                />
              );
            })}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <InputField fieldName="Name">
            <TextField
              size="small"
              id="outlined-basic"
              label={selectedMember.name ? "" : "Name"}
              name="name"
              variant="outlined"
              onChange={handleChange}
              value={typing ? newMember?.name : selectedMember?.name}
            />
          </InputField>

          <InputField fieldName="Spouse">
            <TextField
              size="small"
              id="outlined-basic"
              label={selectedMember.familyDetail?.spouse ? "" : "Spouse"}
              name="spouse"
              variant="outlined"
              onChange={handleChange}
              value={
                typing
                  ? newMember.familyDetail?.spouse
                  : selectedMember.familyDetail?.spouse
              }
            />
          </InputField>

          <InputField fieldName="Location">
            <TextField
              size="small"
              id="outlined-basic"
              label={selectedMember.familyDetail?.location ? "" : "Location"}
              name="location"
              variant="outlined"
              onChange={handleChange}
              value={
                typing
                  ? newMember.familyDetail?.location
                  : selectedMember.familyDetail?.location
              }
            />
          </InputField>

          <InputField fieldName="Birth Year">
            <TextField
              size="small"
              id="outlined-basic"
              label={selectedMember.familyDetail?.birthYear ? "" : "Birth Year"}
              name="birthYear"
              variant="outlined"
              onChange={handleChange}
              value={
                typing
                  ? newMember.familyDetail?.birthYear
                  : selectedMember.familyDetail?.birthYear
              }
            />
          </InputField>

          <InputField fieldName="Present Address">
            <TextField
              size="small"
              id="outlined-basic"
              label={
                selectedMember.familyDetail?.presentAddress
                  ? ""
                  : "Present Address"
              }
              name="presentAddress"
              variant="outlined"
              onChange={handleChange}
              value={
                typing
                  ? newMember.familyDetail?.presentAddress
                  : selectedMember.familyDetail?.presentAddress
              }
            />
          </InputField>

          <InputField fieldName="Family Photo">
            <Label htmlFor="images">Upload Photos</Label>
            <input
              id="images"
              type="file"
              name="familyPhoto"
              multiple={true}
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </InputField>
        </Box>
      </Box>
    </Box>
  );
};

export default FamilyDetail;
