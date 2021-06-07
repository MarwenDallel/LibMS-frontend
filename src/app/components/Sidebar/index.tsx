import { dashboardFeatures } from 'app/configs/dashboard-features';
import React, { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LibMSLogo from './assets/LibMS-logo.png';

export const Sidebar = memo(() => {
  return (
    <Nav>
      <Nav.Link className="mt-2 mx-auto" href="/">
        <img className="img-fluid" src={LibMSLogo} alt="LibMS logo" />
      </Nav.Link>
      <div className="sidebar-sticky mx-xl-3 mx-lg-auto">
        <Nav
          defaultActiveKey="/dashboard/books"
          className="d-flex flex-column align-self-stretch mt-2"
        >
          {dashboardFeatures.map((navigate, i) => (
            <Nav.Item key={i}>
              <Nav.Link
                as={Link}
                to={navigate.link}
                key={i}
                className="px-lg-1"
                style={{
                  fontSize: '1.3em',
                }}
              >
                <i className={`bi bi-${navigate.icon} mr-2`}></i>
                {navigate.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </Nav>
  );
});
