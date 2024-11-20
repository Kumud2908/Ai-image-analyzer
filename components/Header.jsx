import { Avatar, Box, Link, Typography } from "@mui/material";
const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "4rem",
        backgroundColor: "#ffffff",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "1rem",
          alignItems: "center"
        }}
      >
        <Avatar
          src="/assets/analysis.png"
          alt="Logo"
          sx={{ marginRight: "10px" }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#0077b6",
            fontWeight: "bold",
            backgroundColor: "#ffffff",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
            },
          }}
        >
          Image Analyzer
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{margin: {
                xs: "0",
                sm:"1rem",
            }, }}>
        <Link
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            margin: {
                xs: "0",
                sm:"0.6rem",
            },
            fontSize: {
              xs: "0.9rem",
              sm: "1.2rem",
            },
            "&:hover": {
                color: "#0056a0", // Color on hover
              },
          }}
          href="#"
        >
          Home
        </Link>
        <Link
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            margin: "0.6rem",
            fontSize: {
              xs: "0.9rem",
              sm: "1.2rem",
            },
            "&:hover": {
                color: "#0056a0", // Color on hover
              },
          }}
          href="#how-it-works"
        >
          How It Works
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
