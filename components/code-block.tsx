"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodeBlock(props: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              // @ts-expect-error: dude please what the hell idk why the types are bad but just let me do this
              style={nord}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
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
