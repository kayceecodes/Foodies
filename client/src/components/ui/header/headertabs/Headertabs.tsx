import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import Link from "../../../../Link";
import { Route } from "../Header";
import { MouseEvent } from "../../../../types/aliases";
import Grid from "@mui/material/Grid"
import { connect } from "react-redux";
import { darken } from "@mui/system";
import { Theme } from "@mui/material";
import colors from "../../../../Theme/ColorPalette";

interface IProps {
  pageValue: number;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
  routes: Route[];
  anchorEl?: HTMLElement;
}

const useStyles = makeStyles(() => ({
  indicator: {
    height: "1.5px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      boxShadow: "0 0 7px rgba(0,0,0,1)",
      width: "70%",
      backgroundColor: colors.offWhite,
    },
  },
  tab: {
    minWidth: 10,
    fontFamily: "Arial",
    color: 'green',
    fontSize: "1.1rem",
    transition: "color 0.3s",
    textTransform: "none", // Remove the button transformation styles
    marginLeft: "2.5% !important",
    "&:hover": {
      textDecoration: "none",
    },
  },
  tabs: {
    width: "100%",
  },
}));

function Headertabs(props: IProps) {
  const classes = useStyles();
  const handleChange = (e: any, pageValue: number) => {
    e;
    props.setPageValue(pageValue);
  };

  return (
    <>
      <Tabs
        value={props.pageValue}
        onChange={handleChange}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        TabIndicatorProps={{ children: <span /> }}
      >
        {props.routes.map((route: Route) => (
          <Tab
            key={`${route.link} ${classes.tab}`}
            aria-owns={route.ariaOwns}
            aria-haspopup={props.anchorEl ? "true" : undefined}
            // className={classes.tab}
            component={Link}
            href={route.link}
            onMouseOver={route.mouseOver}
            label={route.name}
          />
        ))}
      </Tabs>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  // cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(Headertabs);
