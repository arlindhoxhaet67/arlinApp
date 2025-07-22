import React from "react";
import { Box } from "../../../component-library";
import { useLocation } from "react-router-dom";

const Page = ({ children, className = "", ...props }) => {
  const location = useLocation();
  const hasAppHeader =
    Boolean(location.pathname) && !hideAppHeader({ location });

  return (
    <Box
      width="full"
      height="full"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      backgroundColor="backgroundDefault"
      className={[
        "multichain-page",
        hasAppHeader ? "multichain-page--has-app-header" : "",
        className,
      ].join(" ")}
    >
      <Box
        width="full"
        height="full"
        display="flex"
        flexDirection="column"
        backgroundColor={BackgroundColor.backgroundDefault}
        className={[className].filter(Boolean).join(" ").trim()}
       {...props}
     >
       {children}
     </Box>
   </Box>
 );
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
