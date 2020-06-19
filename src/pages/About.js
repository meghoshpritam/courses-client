import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default () => {
  return (
    <Container maxWidth="md">
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: 80, marginBottom: 15 }}>
        <Typography component="h1" variant="h2">
          About Us
        </Typography>
        <Typography component="h2" variant="h6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quibusdam saepe omnis non
          dolor consequatur, veritatis nostrum aliquam voluptas veniam, reprehenderit nihil!
          Distinctio corporis dolore praesentium incidunt, minima cum voluptatem.
        </Typography>
      </Container>
      <Typography component="h2" variant="body1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, necessitatibus architecto
        praesentium veniam omnis vitae aperiam, fugit illo ad libero ea eaque facere ducimus
        quisquam veritatis corrupti dolores. Blanditiis necessitatibus voluptatibus culpa mollitia
        sed amet inventore porro veniam repudiandae fuga voluptatem suscipit, repellendus totam
        voluptas. Accusantium modi maxime esse quo itaque laboriosam repellendus laborum voluptas
        iste! Vero velit facilis corrupti ratione voluptatum soluta, quia nam enim quidem quam iste
        cum!
      </Typography>
    </Container>
  );
};
