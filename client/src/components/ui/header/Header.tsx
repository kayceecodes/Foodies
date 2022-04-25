import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Headertabs from "./headertabs/Headertabs";
import Sidedrawer from "./sidedrawer/Sidedrawer";
import Box from "@mui/material/Box";
import ContainItems from "../grid/GridContainer";
import Hidden from "@mui/material/Hidden";
import Badge from "@mui/material/Badge";
import { shallowEqual, useSelector } from "react-redux";
import { createBreakpoints } from "@mui/system";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SignUp from "@/components/auth/sign-up";
import Login from "@/components/auth/login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type SetActionType<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  pageValue: number;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
  setOpen: SetActionType<boolean>
  setFormType: SetActionType<string>
}

interface HideOnScrollProps {
  children?: any;
}

export interface Route {
  name: string;
  link: any;
  activeIndex: number;
  selectIndex?: number;
  ariaOwns?: string;
  ariaHasPopup?: string;
  mouseOver?: any;
}

export interface MenuOption {
  name: string;
  link: string;
  activeIndex: number;
  selectedIndex: number;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AccountDropDown = (props: Pick<Props, "setOpen" | "setFormType">) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const routes = [   
    {
      href: "/sign-up",
      name: "Sign-up",
    },
    {
      href: "/login",
      name: "Login",
    },
  ];
  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div>
          <MenuItem>
            <AccountCircleIcon />
            <small>Account</small>
          </MenuItem>
          {routes.map((route) => (
            <MenuItem
              onClick={() => {
                handleClose();
                props.setFormType(route.name)
                props.setOpen(true);
              }}
              key={route.name}
            >
              {route.name}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
};

const useStyles = makeStyles(() => ({
  appbar: {
    fontFamily: "Inter",
    backgroundColor: "white",
  },  
  paper: {
    backgroundColor: "white",
  },
  tabs: {
    color: "#fff",
  },
}));

export default function Header(props: Omit<Props, "setFormType" | "setOpen">) {
  const classes = useStyles(); //useStyles is a funct that will build the classes object
  const breakpoints = createBreakpoints({});

  const matches = useMediaQuery(breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [open, setOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("login");
  enum FormType {
    login = "Login",
    signup = "Signup",
  }

  const routes: Route[] = [
    { name: "Home", link: "/", activeIndex: 0 }    
  ];

  useEffect(() => {
    [...routes].forEach((route: any) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.pageValue !== route.activeIndex) {
            props.setPageValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [props, props.pageValue, routes]);

  const tabs = (
    <Headertabs
      pageValue={props.pageValue}
      setPageValue={props.setPageValue}
      routes={routes}
      anchorEl={anchorEl}
    />
  );

  const sidedrawer = (
    <Sidedrawer
      routes={routes}
      pageValue={props.pageValue}
      setPageValue={props.setPageValue}
    />
  );

  return (
    <Box>
      {formType == FormType.login ? 
        <Login open={open} setOpen={setOpen} /> 
        :
        <SignUp open={open} setOpen={setOpen} />
      }

      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body2" component="div">
                  <Grid container>{matches ? sidedrawer : tabs}</Grid>
                </Typography>
              </Grid>
            </Grid>
            <Hidden smDown>
              <ContainItems
                xs={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <AccountDropDown setFormType={setFormType} setOpen={setOpen} />
              </ContainItems>
            </Hidden>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}
