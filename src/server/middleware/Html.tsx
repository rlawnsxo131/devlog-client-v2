import * as React from 'react';
import { ChunkExtractor } from '@loadable/server';

type HtmlProps = {
  content: string;
  styledElement: React.ReactNode; // styled-components
  extractor: ChunkExtractor;
  apolloState: any;
  reduxState: any;
  //   helmet: HelmetData;
};

function Html({
  content,
  styledElement,
  extractor,
  apolloState,
  reduxState,
}: HtmlProps) {
  return (
    <html>
      <head>
        {/* {helmet.title.toComponent()}
        {helmet.link.toComponent()}
        {helmet.meta.toComponent()} */}
        {styledElement}
        {extractor.getLinkElements()}
        {extractor.getStyleElements()}
        {extractor.getLinkElements()}
        {/* {favicons.map((favicon) => (
          <link
            key={favicon.path}
            rel={favicon.rel}
            sizes={favicon.sizes}
            href={process.env.PUBLIC_URL.concat(favicon.path)}
          />
        ))} */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
