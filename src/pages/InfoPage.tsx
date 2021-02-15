import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MediaRatioWrapper from '../components/layout/MediaRatioWrapper';
import palette from '../lib/styles/palette';
import { RootState } from '../modules';

type InfoPageProps = {};

function InfoPage(props: InfoPageProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <MediaRatioWrapper type="column">
      <Helmet>
        <title>소개 - DevLog</title>
        <meta
          name="description"
          content="판교에 있는 한 스타트업에서 웹/앱의 서버와 웹 프론트엔드 개발을하고있습니다..."
        />
        <meta property="og:title" content="DevLog" />
        <meta property="og:description" content="소개 - DevLog" />
        <meta
          property="og:image"
          content={`${process.env.REACT_APP_IMAGE_URL}/logo/devlog.png`}
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}/info`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}/info`}
        />
      </Helmet>
      <Boundary darkmode={darkmode}>
        <Title>Personal Development blog by John</Title>
        <Description>
          2018년 1월, 28살이 되던해 int 가 무엇인지 배운 늦깎이 개발자 입니다.
          {'\n'}
          판교에 있는 한 스타트업에서 웹/앱의 서버와 웹 프론트엔드 개발을하고
          있습니다.{'\n'}
          새로운걸 이것저것 해보고 싶은 개발자 입니다.
        </Description>
        <InfoLink href="mailto:public.juntae.kim@gmail.com" target="_blank">
          public.juntae.kim@gmail.com
        </InfoLink>
      </Boundary>
      <Boundary darkmode={darkmode}>
        <Title>DevLog Tech Stack</Title>
        <ul>
          <li>TypeScript</li>
          <li>MariaDB</li>
          <li>Docker</li>
          <li>Serverless Framework</li>
          <li>
            NodeJS
            <ul>
              <li>Koa</li>
            </ul>
          </li>
          <li>
            React
            <ul>
              <li>Webpack</li>
              <li>React-Router</li>
              <li>Loadable-Component</li>
              <li>Remark</li>
              <li>Styled-Components</li>
            </ul>
          </li>
          <li>
            GraphQL
            <ul>
              <li>Apollo-Server</li>
              <li>Apollo-Client</li>
            </ul>
          </li>
          <li>
            AWS
            <ul>
              <li>EC2</li>
              <li>S3</li>
              <li>Route53</li>
              <li>CloudFront</li>
              <li>API Gateway</li>
              <li>Lambda / Lambda@Edge</li>
            </ul>
          </li>
        </ul>
      </Boundary>
      <Boundary darkmode={darkmode}>
        <Title>Repository</Title>
        <InfoLink
          href="https://github.com/rlawnsxo131/devlog-server"
          target="_blank"
        >
          devlog-server
        </InfoLink>
        <InfoLink
          href="https://github.com/rlawnsxo131/devlog-client-v2"
          target="_blank"
        >
          devlog-client-v2
        </InfoLink>
      </Boundary>
    </MediaRatioWrapper>
  );
}

const Boundary = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray3)};
  margin-bottom: 2rem;
  li {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.825rem;
`;

const Description = styled.pre`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 1.5rem;
`;

const InfoLink = styled.a`
  margin-top: 0.5rem;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border-left: 3px solid ${palette.indigo9};
  color: ${palette.indigo9};
  background: ${palette.indigo0};
  font-weight: bold;
  &:hover {
    color: ${palette.indigo5};
  }
`;

export default InfoPage;
