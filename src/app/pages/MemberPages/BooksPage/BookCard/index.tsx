/**
 *
 * BookCard
 *
 */
import { ASSETS_ENDPOINTS } from 'app/configs/endpoints';
import * as React from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

interface Image {
  name: string;
}

interface Props {
  id: string;
  image?: Image;
  title: string;
  copiesNumber: number;
}

export function BookCard(props: Props) {
  useEffect(() => {
    showImagePreview(props.image);
  }, [props.image]);

  function showImagePreview(image) {
    if (!image || !image.name) {
      return (
        <CardImg
          variant="top"
          forwardedAs="svg"
          width="100%"
          height="320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Placeholder: Thumbnail"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            Thumbnail
          </text>
        </CardImg>
      );
    }
    return (
      <CardImg variant="top" src={`${ASSETS_ENDPOINTS.images}/${image.name}`} />
    );
  }
  return (
    <CustomCard className="flex-fill m-2 shadow-sm">
      {showImagePreview(props.image)}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/books/${props.id}`} className="stretched-link" />
          <small className="text-muted">{`${props.copiesNumber}/100`}</small>
        </div>
      </Card.Body>
    </CustomCard>
  );
}

const CustomCard = styled(Card)`
  width: 15rem;
  max-width: 15rem;
`;

const CardImg = styled(Card.Img)`
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;
