
import React, { useState } from 'react';

interface CodeOption {
  label: string;
  code: string;
}

interface MultiCodeBlockProps {
  title?: string;
  options: CodeOption[];
  language?: string;
}

export function MultiCodeBlock({ title, options, language = 'bash' }: MultiCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
        <button
          className="multi-codeblock-copy"
          onClick={() => copyToClipboard(options[activeTab].code)}
          title="Copy to clipboard"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="m5 15-4-4a2 2 0 0 1 0-2.83l0 0a2 2 0 0 1 2.83 0l4 4"></path>
            <path d="m12 8 4-4a2 2 0 0 1 2.83 0l0 0a2 2 0 0 1 0 2.83l-4 4"></path>
          </svg>
        </button>
      </div>
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
