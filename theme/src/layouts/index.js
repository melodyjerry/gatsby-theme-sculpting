/** @jsx jsx */
import React, { useState, useRef } from "react"
import { navigate, PageRenderer } from "gatsby"
import SiteMetadata from "../components/site-metadata"
import ContextConsumer, { ContextProviderComponent } from "../components/context"

import { Global } from '@emotion/core'
import { Styled, Container, jsx, useThemeUI } from 'theme-ui'

import Header from './header'
import Footer from './footer'
import Sidenav from './sidenav'

const tocStyle = (menuOpen)=>{
  const displayResult = menuOpen?`flex`: `none`
  return {
  position: [`fixed`],
  maxWidth: `210px`,
  display: [displayResult, `none`, `none`, `flex`],
  '.toc-list': {
    bg: 'background',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    pl: 3,
    pt: 3,
    '.toc-list-item': {
      lineHeight: '1.2em',
      pb: 3,
      ':last-child': {
        pb: 0
      }
    },
    '.toc-link': {
      color: 'gray',
      textDecoration: 'none'
    },
    '.is-active-link': {
      color: 'text',
      fontWeigth: 'bold'
    },
  },
  top: 0,
  bottom: 0,
  left: ['initial', 0],
  right: [0, 'initial'],
  justifyContent: 'center',
  alignItems: 'center'
}}

export default ({pageContext, location, children}) => {
  const { theme: { colors = {} } } = useThemeUI()
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useRef(null)
  const bodyStyles = {
    body: {
      margin: 0,
      color: colors.text,
      backgroundColor: colors.background
    }
  }
  return (
    <div sx={{
      minHeight: '100VH',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Global styles={bodyStyles} />
      <SiteMetadata pathname={location.pathname} />
      <ContextProviderComponent>
        <ContextConsumer>
          {({data, set})=>{
            return (
              <>
                <Header nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <div
                  ref={nav}
                  sx={{
                    display: ['block', 'flex'],
                    flex: 1,
                  }}
                >
                  <Sidenav
                    open={menuOpen}
                    onFocus={() => setMenuOpen(true)}
                    onBlur={() => setMenuOpen(false)}
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="toc" sx={tocStyle(menuOpen)}></div>
                  <div
                    sx={{
                      flex: 1,
                      overflow: 'hidden',
                    }}
                  >
                  {children}
                  </div>
                </div>
                <Footer />
              </>
            )
          }}
        </ContextConsumer>
      </ContextProviderComponent>
    </div>
  )
}
