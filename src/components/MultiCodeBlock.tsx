import React, { useState } from 'react';

interface CodeOption {
  label: string;
  code: string;
  filename?: string;
}

interface MultiCodeBlockProps {
  title?: string;
  options: CodeOption[];
  language?: string;
}

export function MultiCodeBlock({ title, options, language = 'bash' }: MultiCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="multi-codeblock">
      <div className="multi-codeblock-header">
        <div className="multi-codeblock-title-nav">
          {title && <span className="multi-codeblock-title">{title}</span>}
          <div className="multi-codeblock-nav">
            {options.map((option, index) => (
              <button
                key={index}
                className={`multi-codeblock-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {options[activeTab].filename && (
        <div className="multi-codeblock-filename">
          {options[activeTab].filename}
        </div>
      )}
      <div className="multi-codeblock-content">
        <pre className="multi-codeblock-pre">
          <code className={`language-${language}`}>
            {options[activeTab].code}
          </code>
        </pre>
      </div>
    </div>
  );
}