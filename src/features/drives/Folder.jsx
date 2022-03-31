import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: "#1A2027",
  padding: theme.spacing(2),
  fontStyle: "bold",
  fontSize: "1.5rem",
  color: "#ffff",
  width: "100%",
  ":hover": { backgroundColor: "#1A2592" },
}));

export default function Folder() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item startIcon={<FolderIcon />}>
              Nếu có 1 ngày em ỉa trong quần
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
