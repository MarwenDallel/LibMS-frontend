import { dashboardFeatures } from 'app/configs/dashboard-features';
import React, { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LibMSLogo from './assets/LibMS-logo.png';

export const Sidebar = memo(() => {
  return (
    <Nav
      className="col-md-3 col-lg-2 d-none pt-4 d-md-block sidebar p-0"
      style={{ backgroundColor: 'white' }}
    >
      <a className="nav-link mt-2 text-center" href="/">
        <img className="img-fluid" src={LibMSLogo} alt="LibMS logo" />
      </a>
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
