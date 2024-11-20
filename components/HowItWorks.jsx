import { Box, Card, Typography } from "@mui/material";

const HowItWorks = () => {
  return (
    <Box
      id="how-it-works"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          margin: "1rem",
          fontWeight: "bold",
          fontSize: "1.8rem",
        }}
      >
        How It Works
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            flex: 1, // Ensures equal width
            margin: "1rem",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.5s",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-0.4vmax)",
              boxShadow: "0px 6px 15px rgba(53, 53, 53,  0.363)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginBottom: "0.8rem",
            }}
          >
            <Typography variant="h4">1</Typography>
            <Typography
              variant="h5"
              sx={{
                margin: "1rem",
                fontWeight: "bold",
              }}
            >
              Upload Image
            </Typography>
          </Box>
          <Typography sx={{}}>
            Begin by selecting and uploading an image through our user-friendly
            interface. This image can be any photo or graphic that you want to
            analyze.
          </Typography>
        </Card>
        <Card
          sx={{
            flex: 1, // Ensures equal width
            margin: "1rem",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.5s",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-0.4vmax)",
              boxShadow: "0px 6px 15px rgba(53, 53, 53,  0.363)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginBottom: "0.8rem",
            }}
          >
            <Typography variant="h4">2</Typography>
            <Typography
              variant="h5"
              sx={{
                margin: "1rem",
                fontWeight: "bold",
              }}
            >
              AI Analysis
            </Typography>
          </Box>
          <Typography sx={{}}>
            Once the image is uploaded, it is seamlessly passed to our
            AI-powered analysis engine. Utilizing the Gemini API, the image is
            processed and analyzed to extract meaningful insights.
          </Typography>
        </Card>
        <Card
          sx={{
            flex: 1, // Ensures equal width
            margin: "1rem",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.5s",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-0.4vmax)",
              boxShadow: "0px 6px 15px rgba(53, 53, 53,  0.363)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginBottom: "0.8rem",
            }}
          >
            <Typography variant="h4">3</Typography>
            <Typography
              variant="h5"
              sx={{
                margin: "1rem",
                fontWeight: "bold",
              }}
            >
              Get Results
            </Typography>
          </Box>
          <Typography sx={{}}>
            Receive a comprehensive description of the image, along with related
            keywords and suggested questions for further exploration.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default HowItWorks;
