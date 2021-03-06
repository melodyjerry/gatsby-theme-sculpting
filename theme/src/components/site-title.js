/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import ContextConsumer from "./context"
import XSJTitle from "./xsj/title"

const SiteMetadata = () => {
  return (
    <ContextConsumer>
      {({siteMetadata: {title, siteUrl}}) => {
        if (title  === '小书匠') {
          return (<XSJTitle />)
        }
        const style = {
          ml: 3,
          fontWeight: 'bold',
          fontSize: '1.5em',
          a: {
            color: 'inherit',
            textDecoration: 'none'
          }
        }
        return (
          <div sx={style}>
            <a href={siteUrl}>
            {title}
            </a>
          </div>
        )
      }}
    </ContextConsumer>
  )
}

export default SiteMetadata

