import * as React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  icon: string;
  title: string;
  link: string;
}

export default function FeatureCard({ icon, title, link }: Props) {
  return (
    <Link to={link}>
      <StyledCard className="shadow-sm">
        <i className={`bi bi-${icon}`} style={{ fontSize: '3.8rem' }}></i>
        {title}
      </StyledCard>
    </Link>
  );
}

const StyledCard = styled(Card)`
  width: 130px;
  height: 130px;
  color: white;
  background-color: #007ea4 !important;
`;
