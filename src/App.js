import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CommentInput from './components/CommentInput';
import CommentsList from './components/CommentsList';
import { COMMENTS_GET, SOCKET_URL } from './config/env';

import './App.css';

import io from 'socket.io-client';

const socket = io(SOCKET_URL);

const App = () => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    fetch(COMMENTS_GET, { mode: 'cors' })
      .then(response => response.json())
      .then(data => setCommentsData(data));
  }, []);

  useEffect(() => {
    socket.on('message', function (msg) {
      setCommentsData([msg, ...commentsData]);
    });
    return () => {
      socket.off('message');
    };
  }, [commentsData]);

  return (
    <Container>
      <Row className="justify-content-md-center bg-light rounded-3 text-center">
        <Col md="auto">
          <h1 className="header ">Comments Board</h1>
          <Container className="p-3">
            <CommentInput />
          </Container>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <CommentsList commentsData={commentsData} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
