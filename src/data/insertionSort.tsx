import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import py from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import { docco as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('python', py)

const CODE =
  `const woah = fun => fun + 1;
const dude = woah(2) + 3;
function thisIsAFunction() {
  return [1,2,3].map(n => n + 1).filter(n !== 3);
}
console.log('making up fake code is really hard');

function itIs() {
  return 'no seriously really it is';
}`;


const ADDED = [1, 2];
const REMOVED = [6];

export function InsertionSort() {
  return (
    <div>
      <div style={{ paddingTop: 20 }}>
        <div style={{ width: '100%' }}>
          <SyntaxHighlighter
            language='python'
            style={style}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={lineNumber => {
              let style: any = { display: 'block' };
              if (ADDED.includes(lineNumber)) {
                style.backgroundColor = '#dbffdb';
              } else if (REMOVED.includes(lineNumber)) {
                style.backgroundColor = '#ffecec';
              }
              return { style };
            }}
          >
            {CODE}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
