import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import MetaTag from './constants/SEOMetaTag';
import NotFound from './pages/NotFound';
import Create from './pages/Board/Create';

const Wrapper = styled.div`
    width: 100%;

    ${({ theme }) => theme.media.desktop`
    
    `}
    ${({ theme }) => theme.media.tablet`
    
    `}
    ${({ theme }) => theme.media.mobile`
    
    `};
`;

function App() {
    /* const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onClick = (): void => {
    alert(`${value} 입력값을 입력받았습니다.`);
  }; */

    return (
        <>
            <MetaTag title="project" description="side-project with react" />
            <Wrapper>
                <Layout>
                    {/*     <Input type="text" value={value} onChange={onChange} />
                    <Button onClick={onClick} text="click alert" /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/boards" element={<Board />}>
                            <Route path=":category" element={<Board />} />
                        </Route>
                        <Route path="/boards/create" element={<Create />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Wrapper>
        </>
    );
}

export default App;