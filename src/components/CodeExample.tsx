
import React from 'react';

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
}

export function CodeExample({ title, code, language = 'javascript' }: CodeExampleProps) {
  return (
    <div className="example-block">
      <div className="example-header">
        {title}
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
