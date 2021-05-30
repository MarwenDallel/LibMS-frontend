/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { selectUserProfile } from '../../pages/CommonPages/UserProfilePage/slice/selectors';
import HeaderLogo from './assets/SMU-LOGO.png';

interface Item {
  name: string;
  link: string;
}

interface Props {
  title?: string;
  navItems?: Item[];
}

export const Header = memo(({ title, navItems, ...props }: Props) => {
  const user = useSelector(selectUserProfile);
  return (
    <>
      <TopNavbar>
        <Container>
          <Link to="/">
            <img src={HeaderLogo} alt="" width={263} height={122} />
          </Link>
        </Container>
      </TopNavbar>

      <BottomNavbar
        collapseOnSelect
        expand="lg"
        className="navbar navbar-expand-md navbar-dark"
      >
        <BottomNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BottomNavbar.Collapse id="responsive-navbar-nav">
          <Container className="justify-content-md-between">
            {title?.length ? (
              <div className="font-weight-light mr-0 text-white">{title}</div>
            ) : (
              navItems && (
                <Nav className="mx-auto">
                  {navItems.map((item, i) => (
                    <Nav.Link
                      href={item.link}
                      className="text-white px-5"
                      key={i}
                    >
                      {' '}
                      {item.name}{' '}
                    </Nav.Link>
                  ))}
                </Nav>
              )
            )}
            {user.email && (
              <Nav>
                <Nav.Link className="text-white p-0" href="/logout">
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Container>
        </BottomNavbar.Collapse>
      </BottomNavbar>
    </>
  );
});

// Extending original bootstrap Navbar
const BottomNavbar = styled(Navbar)`
  background-color: #007ea4;
`;
const TopNavbar = styled(Navbar)`
  background-color: #203549;
`;
