import * as React from 'react';
import styled from 'styled-components';
import remark from 'remark';
import remarkParse from 'remark-parse';
import sanitize from 'sanitize-html';
import stringify from 'rehype-stringify';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import breaks from 'remark-breaks';
import slug from 'remark-slug';
import prismPlugin from '../../lib/remark/prismPlugin';
import embedPlugin from '../../lib/remark/embedPlugin';
import palette from '../../lib/styles/palette';
import { ssrEnabled } from '../../lib/constants';
import prismThemes from '../../lib/styles/prismThem';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

function filter(html: string) {
  return sanitize(html, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'iframe',
      'span',
      'img',
      'del',
      'input',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
      iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
      '*': ['class', 'id', 'aria-hidden'],
      span: ['style'],
      input: ['type'],
      ol: ['start'],
    },
    allowedStyles: {
      '*': {
        // Match HEX and RGB
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
    },
    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            target: '_blank',
          },
        };
      },
    },
    allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io'],
  });
}

type MarkdownRenderProps = {
  markdownText?: string;
};

const { useState, useEffect, memo } = React;
function MarkdownRender({ markdownText }: MarkdownRenderProps) {
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
  );
  const [html, setHtml] = useState(
    ssrEnabled && markdownText
      ? filter(
          remark()
            .use(breaks)
            .use(remarkParse)
            .use(slug)
            .use(prismPlugin)
            .use(embedPlugin)
            .use(remark2rehype, { allowDangerousHtml: true })
            .use(raw)
            .use(stringify)
            .processSync(markdownText)
            .toString(),
        )
      : '',
  );

  useEffect(() => {
    if (!markdownText) return;
    setHtml(
      filter(
        remark()
          .use(breaks)
          .use(remarkParse)
          .use(slug)
          .use(prismPlugin)
          .use(embedPlugin)
          .use(remark2rehype, { allowDangerousHtml: true })
          .use(raw)
          .use(stringify)
          .processSync(markdownText)
          .toString(),
      ),
    );
  }, [markdownText]);

  return (
    <MarkdownRenderBlock
      dangerouslySetInnerHTML={{ __html: html }}
      className={darkMode ? 'atom-one-dark' : 'atom-one-light'}
    />
  );
}

const MarkdownRenderBlock = styled.div`
  position: relative;
  height: 100%;
  line-height: 1.5;
  word-break: break-all;
  word-wrap: break-word;
  &.atom-one-dark {
    ${prismThemes['atom-one-dark']}
  }
  &.atom-one-light {
    ${prismThemes['atom-one-light']}
  }
  &.github {
    ${prismThemes['github']}
  }
  &.monokai {
    ${prismThemes['monokai']}
  }
  &.dracula {
    ${prismThemes['dracula']}
  }
  pre {
    white-space: pre;
    font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
      'Courier New', monospace;
    font-size: 0.875rem;
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
    code {
      font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
        'Courier New', monospace;
    }
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    margin-left: auto;
    margin-right: auto;
  }
  iframe {
    width: 768px;
    height: 430px;
    max-width: 100%;
    background: black;
    display: block;
    margin: auto;
    border: none;
    border-radius: 4px;
    overflow: hidden;
  }
  .twitter-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: none;
    background: none;
    padding: none;
  }
  table {
    min-width: 40%;
    max-width: 100%;
    border: 1px solid ${palette.gray7};
    border-collapse: collapse;
    font-size: 0.875rem;
    thead > tr > th {
      /* text-align: left; */
      border-bottom: 4px solid ${palette.gray7};
    }
    th,
    td {
      word-break: break-word;
      padding: 0.5rem;
    }
    td + td,
    th + th {
      border-left: 1px solid ${palette.gray7};
    }
    tr:nth-child(even) {
      background: ${palette.gray1};
    }
    tr:nth-child(odd) {
      background: white;
    }
  }
`;

export default memo(MarkdownRender);