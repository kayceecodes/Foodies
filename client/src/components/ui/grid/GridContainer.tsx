import Grid, {
  // GridContentAlignment,
  GridDirection,
  GridSpacing,
  GridWrap,
  // GridJustification,
  
} from '@mui/material/Grid'
import { GridSize } from '@mui/material'
import GridContentAlignment from "@mui/material"
import GridJustification from "@mui/material"
import GridItemsAlignment from "@mui/material"

import React, { HtmlHTMLAttributes, ReactNode } from 'react'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx/styleFunctionSx'

interface Container {
  alignContent: typeof GridContentAlignment
  alignItems: string
  //   container: boolean;
  direction: GridDirection
  //   item: boolean;
  justifyContent: any
  spacing: GridSpacing
  wrap: GridWrap
  zeroMinWidth: boolean
  children: ReactNode[] | ReactNode
}

interface Item {
  xs: number
  sm: number
  md: number
  lg: number
}

interface Styles {
  width: string | number
  height: string | number
  margin: string | number
  padding: string | number
}

type Props = Item & Container & HtmlHTMLAttributes<any> & Styles

export default function ContainItems(props: Partial<Props>) {
  return (
    <Grid
      container
      alignContent={props.alignContent as ResponsiveStyleValue<any>}
      alignItems={props.alignItems}
      direction={props.direction as ResponsiveStyleValue<any>}
      justifyContent={props.justifyContent}
      spacing={props.spacing as GridSpacing}
      wrap={props.wrap as GridWrap}
      style={{
        width: props.width,
        height: props.height,
        margin: props.margin,
        padding: props.padding,
      }}
    >
      {Array.isArray(props.children) ? (
        props.children?.map((item, index) => (
          <Grid
            key={index}
            item
            xs={props.xs as GridSize}
            sm={props.sm as GridSize}
            md={props.md as GridSize}
            lg={props.lg as GridSize}
            zeroMinWidth={props.zeroMinWidth ?? false}
          >
            {item}
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={props.xs as GridSize}
          sm={props.sm as GridSize}
          md={props.md as GridSize}
          lg={props.lg as GridSize}
          zeroMinWidth={props.zeroMinWidth ?? false}
        >
          {props.children}
        </Grid>
      )}    
    </Grid>
  )
}
