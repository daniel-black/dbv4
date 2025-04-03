"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodeBlock(props: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={codeStyle}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
}
