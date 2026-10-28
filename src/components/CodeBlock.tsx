import { Highlight, themes } from 'prism-react-renderer';

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <Highlight theme={themes.dracula} code={code.trim()} language={language as never}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`${className} overflow-x-auto rounded-xl p-4 text-xs`} style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default CodeBlock;
