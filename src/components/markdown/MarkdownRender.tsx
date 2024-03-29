import { css } from '@emotion/react';
import unified from 'unified';
import remarkParse from 'remark-parse';
import sanitize from 'sanitize-html';
import stringify from 'rehype-stringify';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import breaks from 'remark-breaks';
import slug from 'remark-slug';
import remarkGfm from 'remark-gfm';
import prismPlugin from '../../lib/remark/prismPlugin';
import embedPlugin from '../../lib/remark/embedPlugin';
import palette, { darkmodeMarkdownColor } from '../../lib/styles/palette';
import { ssrEnabled } from '../../lib/constants';
import prismThemes from '../../lib/styles/prismThem';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import media from '../../lib/styles/media';
import { memo, useEffect, useMemo, useState } from 'react';
import optimizeImage from '../../lib/optimizeImage';

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
      img: (tagName, attribs) => {
        return {
          tagName: 'img',
          attribs: {
            ...attribs,
            src: optimizeImage(attribs.src, 768),
          },
        };
      },
    },
    allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io'],
  });
}

interface MarkdownRenderProps {
  markdownText: string;
}

function MarkdownRender({ markdownText }: MarkdownRenderProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const them = useMemo(() => {
    return darkmode ? 'atom-one-dark' : 'atom-one-light';
  }, [darkmode]);

  const [html, setHtml] = useState(
    ssrEnabled
      ? filter(
          unified()
            .use(breaks)
            .use(remarkParse)
            .use(remarkGfm)
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
    if (ssrEnabled || !markdownText) return;
    unified()
      .use(breaks)
      .use(stringify)
      .use(remarkParse)
      .use(remarkGfm)
      .use(slug)
      .use(prismPlugin)
      .use(embedPlugin as any)
      .use(remark2rehype, { allowDangerousHtml: true })
      .use(raw)
      .process(markdownText, (err: any, file: any) => {
        if (err) {
          return alert(`마크다운 파싱 에러: ${err}`);
        }
        const html = String(file);
        setHtml(filter(html));
      });
  }, [markdownText]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={them}
      css={block(darkmode)}
    />
  );
}

const block = (darkmode: boolean) => css`
  position: relative;
  height: auto;
  line-height: 1.725;
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
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
    code {
      font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
        'Courier New', monospace;
    }
  }

  a {
    font-weight: 600;
    color: ${palette.indigo5};
    text-decoration: none;
    &:hover {
      color: ${palette.indigo4};
      text-decoration: underline;
    }
  }

  p {
    code {
      padding: 0.125rem;
      color: ${palette.indigo9} !important;
      background: ${darkmode ? palette.indigo1 : palette.indigo0};
    }
  }

  blockquote {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid ${palette.indigo5};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${darkmode
      ? darkmodeMarkdownColor.blockquoteBackground
      : palette.gray0};
    margin-left: 0;
    margin-right: 0;
    padding: 1rem;
    padding-left: 2rem;
    p {
      color: ${darkmode ? darkmodeMarkdownColor.blockquoteP : palette.gray9};
    }
    ul,
    ol {
      padding-left: 1rem;
    }
    *:first-of-type {
      margin-top: 0;
    }
    *:last-of-type {
      margin-bottom: 0;
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

  li::marker {
    font-weight: bold;
    ${darkmode &&
    css`
      color: ${palette.gray0};
    `};
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
    color: ${palette.gray9};
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
    tr:nth-of-type(even) {
      background: ${palette.gray1};
    }
    tr:nth-of-type(odd) {
      background: ${palette.white};
    }
  }

  ${media.xsmall} {
    h1 {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.25rem;
    }
    h3 {
      font-size: 1.125rem;
    }
    h4 {
      margin: 1rem 0;
      font-size: 1rem;
    }
    h5 {
      margin: 0.875rem 0;
      font-size: 0.875rem;
    }
    h6 {
      margin: 0.85rem 0;
      font-size: 0.85rem;
    }
    p {
      font-size: 1rem;
    }
    li {
      font-size: 0.9rem;
    }
    pre {
      font-size: 0.85rem;
      code {
        &.language-null {
          font-size: 0.85rem;
        }
      }
    }
  }

  ${media.small} {
    h1 {
      font-size: 1.85rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.25rem;
    }
    h4 {
      margin: 1.125rem 0;
      font-size: 1.125rem;
    }
    h5 {
      margin: 1rem 0;
      font-size: 1rem;
    }
    h6 {
      margin: 0.875rem 0;
      font-size: 0.875rem;
    }
    p {
      font-size: 1rem;
    }
    li {
      font-size: 1rem;
    }
    pre {
      font-size: 0.875rem;
      code {
        &.language-null {
          font-size: 0.875rem;
        }
      }
    }
  }

  ${media.medium} {
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.825rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    h4 {
      margin: 1.25rem 0;
      font-size: 1.25rem;
    }
    h5 {
      margin: 1.125rem 0;
      font-size: 1.125rem;
    }
    h6 {
      margin: 1rem 0;
      font-size: 1rem;
    }
    p {
      font-size: 1.125rem;
    }
    li {
      font-size: 1.125rem;
    }
  }
`;

export default memo(MarkdownRender);
