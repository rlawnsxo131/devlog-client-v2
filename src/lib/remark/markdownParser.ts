import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import stringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';

export default function markdownParser(markdownText: string) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remark2rehype, { allowDangerousHtml: false })
    .use(raw)
    .use(stringify)
    .processSync(markdownText)
    .toString()
    .replace(/(<([^>]+)>)/gi, '');
}
