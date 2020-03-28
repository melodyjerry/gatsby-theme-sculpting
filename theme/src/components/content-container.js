/** @jsx jsx */
import { jsx, Button} from 'theme-ui'
import React from "react"
import styled from '@emotion/styled'


const ContentContainer = ({children})=> {
  return (<div sx={{
    p: [0, 0, 5],
    mx: 'auto',
    my: 0,
    maxWidth: '900px' 
  }}>
    {children}
  </div>)
}

export default ContentContainer
