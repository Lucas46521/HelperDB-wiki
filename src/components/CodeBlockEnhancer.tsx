
import { useEffect } from 'react';

export function CodeBlockEnhancer() {
  useEffect(() => {
    // Add copy buttons to existing code blocks
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.expressive-code');
      
      codeBlocks.forEach((block) => {
        // Skip if already has copy button
        if (block.querySelector('.copy-button')) return;
        
        const header = block.querySelector('.title, .header');
        const pre = block.querySelector('pre');
        
        if (pre && header) {
          const copyButton = document.createElement('button');
          copyButton.className = 'copy-button';
          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="m5 15-4-4a2 2 0 0 1 0-2.83l0 0a2 2 0 0 1 2.83 0l4 4"></path>
              <path d="m12 8 4-4a2 2 0 0 1 2.83 0l0 0a2 2 0 0 1 0 2.83l-4 4"></path>
            </svg>
          `;
          
          copyButton.addEventListener('click', async () => {
            const code = pre.textContent || '';
            try {
              await navigator.clipboard.writeText(code);
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              `;
              setTimeout(() => {
                copyButton.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="m5 15-4-4a2 2 0 0 1 0-2.83l0 0a2 2 0 0 1 2.83 0l4 4"></path>
                    <path d="m12 8 4-4a2 2 0 0 1 2.83 0l0 0a2 2 0 0 1 0 2.83l-4 4"></path>
                  </svg>
                `;
              }, 2000);
            } catch (err) {
              console.error('Failed to copy text: ', err);
            }
          });
          
          header.appendChild(copyButton);
        }
      });
    };

    // Run on mount and when content changes
    addCopyButtons();
    
    // Observer for dynamically added content
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return null;
}
