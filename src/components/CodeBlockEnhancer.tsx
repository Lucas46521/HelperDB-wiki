import { useEffect } from 'react';

export function CodeBlockEnhancer() {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.expressive-code pre');

      codeBlocks.forEach((pre) => {
        // Evita duplicar botão
        if (pre.querySelector('.copy-button')) return;

        const wrapper = pre.parentElement; // geralmente .expressive-code
        if (!wrapper) return;

        // Prepara o botão
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '0.5rem';
        copyButton.style.right = '0.5rem';
        copyButton.style.zIndex = '10';

        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            `;
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="m5 15-4-4a2 2 0 0 1 0-2.83l0 0a2 2 0 0 1 2.83 0l4 4"></path>
                  <path d="m12 8 4-4a2 2 0 0 1 2.83 0l0 0a2 2 0 0 1 0 2.83l-4 4"></path>
                </svg>
              `;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text:', err);
          }
        });

        // Garante que o wrapper seja relativo
        wrapper.style.position ||= 'relative';
        wrapper.appendChild(copyButton);
      });
    };

    addCopyButtons();

    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}