import React, { useState } from "react";
import Image from 'next/image'
import Link from "../../../../Link"
import { Route } from "../Header";

import { makeStyles } from "@mui/styles";
import ListItem from "@mui/material/ListItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid"
import { Theme } from "@mui/material";
import theme from "@/src/Theme/Theme" 
import colors from "@/src/Theme/ColorPalette"

interface IProps {
  pageValue: number;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
  selectedIndex?: number;
  routes: Route[];
}

const useStyles = makeStyles(() => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  drawer: {
    backgroundColor: '#dcdcdc',
  },
  drawerItem: {
    ...theme.typography,
    color: colors.dimGray,
    opacity: 0.7,
  },
  drawerIcon: {
    height: "35px",
    width: "35px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  svgGridContainer: {
    height: '100px',
    marginTop: '50px',
    paddingLeft: '10px'
  }
}));

export default function Sidedrawer(props: IProps) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <SwipeableDrawer
        disableBackdropTransition={iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {props.routes.map((route: Route) => (
            <ListItem
              key={`${route.link} + ${route.name}`}
              button
              component={Link}
              href={route.link}
              selected={props.pageValue === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                props.setPageValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <Grid
            container
            className={classes.svgGridContainer}
            direction="column"
            justifyContent="space-around"
          >
            <Grid
              item
              xs={4}
              component={"a"}
              href=""
              rel="noopener noreferrer"
              target="_blank"
              data-aos='fade-right'
            >
              <Image width={30} height={30} src='/assets/svg/facebook.svg' alt="Link To Instagram" />

              {/* <img src='/assets/svg/facebook.svg' alt="Link To Instagram" /> */}
            </Grid>
            <Grid
              item
              xs={4}
              component={"a"}
              href=""
              rel="noopener noreferrer"
              target="_blank"
              data-aos='fade-right'
            >
              <img src='/assets/svg/instagram.svg' alt="Link To Instagram" />
            </Grid>
          </Grid>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
}
