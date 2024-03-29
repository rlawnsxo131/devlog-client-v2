import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import MediaRatioWrapper from '../components/layout/MediaRatioWrapper';
import palette from '../lib/styles/palette';
import { RootState } from '../modules';

interface InfoPageProps {}

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
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}/info`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}/info`}
        />
      </Helmet>
      <div css={boundary(darkmode)}>
        <h3 css={title}>Personal Development blog by John</h3>
        <pre css={description}>
          2018년 1월, 28살이 되던해 int 가 무엇인지 배운 늦깎이 개발자 입니다.
          {'\n\n'}
          판교에 한 스타트업에서 백오피스 개발과 인앱 Web View 및 프론트엔드 를
          개발하고 있습니다. 필요에 따라 BackEnd API 를 개발하거나 배포를
          구성하기도 합니다.{'\n\n'}
          Serverless 한 BackEnd Architecture 를 선호하고,
          {'\n'}
          FrontEnd 의 자연스런 DataFlow 를 중요히 생각합니다.
        </pre>
        <a css={infoLink} href="mailto:public.juntae@gmail.com" target="_blank">
          public.juntae@gmail.com
        </a>
      </div>
      <div css={boundary(darkmode)}>
        <h3 css={title}>DevLog Tech Stack</h3>
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
              <li>
                v1
                <ul>
                  <li>Next.js</li>
                  <li>Styled components</li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                v2
                <ul>
                  <li>Webpack</li>
                  <li>React Router</li>
                  <li>Loadable Components</li>
                  <li>Unified</li>
                  <li>Emotion</li>
                  <li>Koa</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            GraphQL
            <ul>
              <li>Apollo Server</li>
              <li>Apollo Client</li>
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
      </div>
      <div css={boundary(darkmode)}>
        <h3 css={title}>Repository</h3>
        <a
          css={infoLink}
          href="https://github.com/rlawnsxo131/devlog-server"
          target="_blank"
        >
          devlog-server
        </a>
        <a
          css={infoLink}
          href="https://github.com/rlawnsxo131/devlog-client"
          target="_blank"
        >
          devlog-client
        </a>
        <a
          css={infoLink}
          href="https://github.com/rlawnsxo131/devlog-client-v2"
          target="_blank"
        >
          devlog-client-v2
        </a>
      </div>
    </MediaRatioWrapper>
  );
}

const boundary = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  margin-bottom: 2rem;
  li {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }
`;

const title = css`
  margin: 0;
  font-size: 1.825rem;
`;

const description = css`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 1.25rem;
`;

const infoLink = css`
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
