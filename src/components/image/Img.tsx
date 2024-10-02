import { BRANCH1 } from "@/src/assets";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Img({ imageData, width, height }: ImgProps) {
  let src;
  if (imageData) {
    src = "data:image/png;base64," + imageData;
  } else {
    src = BRANCH1;
  }

  return (
    <Box
      sx={{
        "&:hover img": { scale: "1.02" },
        "& img": {
          transition: "0.3s ease-out",
          borderRadius: 2,
          width: "100%",
          maxWidth: "100%",
          position: "relative",
        },
      }}
    >
      <Image
        placeholder={"blur"}
        blurDataURL={placeholderImg}
        loading="lazy"
        src={src}
        alt={imageData}
        // objectFit="cover"
        // width={width}
        // height={height}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
      />
    </Box>
  );
}

interface ImgProps {
  imageData: string;
  width: number;
  height: number;
}

export const placeholderImg =
  "data:image/png;base64,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";
