import React from 'react';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import Section from '../components/Section';

export default () => {
  const { type } = useParams();

  return (
    <Container maxWidth="lg">
      {type === 'courses' && <Section title="All Courses" cards={[1, 2, 3, 4, 5, 6, 7, 8]} />}
      {type === 'projects' && <Section title="All Projects" cards={[1, 2, 3, 4, 5, 6, 7, 8]} />}
    </Container>
  );
};
