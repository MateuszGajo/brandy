import { Box } from "@mui/material";
import { sxCondition } from "app/utils/MaterailUI";
import { LinkProps, Link, useResolvedPath, useMatch } from "react-router-dom";
import styles from "./styles/CustomLink.style";

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Box
      sx={{
        ...styles.wrapper,
        ...sxCondition([styles.wrapperActive], !!match),
      }}
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </Box>
  );
};

export default CustomLink;
