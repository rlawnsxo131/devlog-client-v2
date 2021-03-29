import { ChunkExtractor } from '@loadable/server';
import { HelmetData } from 'react-helmet-async';

interface HtmlProps {
  content: string;
  apolloState: any;
  reduxState: any;
  extractor: ChunkExtractor;
  helmet: HelmetData;
}

function Html({
  content,
  apolloState,
  reduxState,
  extractor,
  helmet,
}: HtmlProps) {
  const { REACT_APP_IMAGE_URL } = process.env;
  return (
    <html>
      <head>
        {helmet.title.toComponent()}
        {helmet.link.toComponent()}
        {helmet.meta.toComponent()}
        {extractor.getLinkElements()}
        {extractor.getStyleElements()}
        {extractor.getLinkElements()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          href={`${REACT_APP_IMAGE_URL}/favicons/favicon.ico`}
        />
        <link
          rel="shortcut icon"
          href={`${REACT_APP_IMAGE_URL}/favicons/favicon-16x16.png`}
        />
        <link
          rel="shortcut icon"
          href={`${REACT_APP_IMAGE_URL}/favicons/favicon-32x32.png`}
        />
        <link
          rel="shortcut icon"
          href={`${REACT_APP_IMAGE_URL}/favicons/favicon-48x48.png`}
        />
        <link
          rel="shortcut icon"
          href={`${REACT_APP_IMAGE_URL}/favicons/favicon-96x96.png`}
        />
        <meta
          name="google-site-verification"
          content="cxSUqcooAfyS9ypQheVFaeT_mqAzuR_D8hjCLI5hP40"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H9C41MYXQ5"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  
                  gtag('config', 'G-H9C41MYXQ5', {
                    page_path: window.location.pathname,
                  });`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            console.log(
              '%cDevLog',
              'background-color: #5c7cfa; color: white; font-size: 2rem; padding: 0.25rem 0.5rem;'
            );
            `,
          }}
        />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              apolloState,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__REDUX_STATE__=${JSON.stringify(
              reduxState,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
        {extractor.getScriptElements()}
      </body>
    </html>
  );
}

export default Html;
