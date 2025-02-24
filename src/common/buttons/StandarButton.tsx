import { Button } from "@mui/material";
import Link from "next/link";

export default function StandardButton({
  text,
  disabled,
  type,
  href,
  ...props
}: {
  text: string;
  disabled: boolean;
  type: "button" | "submit" | "reset";
  href: string;
  props?: any;
}) {
  return (
    <Link href={href} passHref>
      <Button
        {...props}
        variant="outlined"
        disabled={disabled}
        type={type}
        sx={{
          color: "#fff",
          borderColor: "#fff",
          margin: "0.5rem",
          height: "2.5rem",
          "&:hover": {
            backgroundColor: "#303030",
            color: "#fff",
            borderColor: "green",
          },
        }}
      >
        {text}
      </Button>
    </Link>
  );
}
