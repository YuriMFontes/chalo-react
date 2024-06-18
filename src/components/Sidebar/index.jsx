import React from 'react'
import { Container, Content } from './styles'
import { FaTimes, FaHome } from 'react-icons/fa'
import { PiPantsLight } from "react-icons/pi";
import { GiClothes, GiPirateCoat, GiLargeDress, GiSkirt } from "react-icons/gi";
import { GrCoatCheck } from "react-icons/gr";

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem Icon={FaHome} Text="Início" />
        <SidebarItem Icon={GiLargeDress} Text="Vestido" />
        <SidebarItem Icon={PiPantsLight} Text="Calças" />
        <SidebarItem Icon={GiClothes} Text="Conjuntos" />
        <SidebarItem Icon={GrCoatCheck} Text="Croppeds" />
        <SidebarItem Icon={GiSkirt} Text="Saias" />
        <SidebarItem Icon={GiPirateCoat} Text="Casacos" />
      </Content>
    </Container>
  )
}

export default Sidebar