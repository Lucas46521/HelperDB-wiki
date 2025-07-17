
import { visit } from 'unist-util-visit';

export function remarkCodeBlock() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang) {
        // Cria um novo nó MDX para o CodeBlock
        const newNode = {
          type: 'mdxJsxFlowElement',
          name: 'CodeBlock',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'code',
              value: node.value
            },
            {
              type: 'mdxJsxAttribute',
              name: 'language',
              value: node.lang
            }
          ],
          children: []
        };
        
        // Substitui o nó original pelo novo
        parent.children[index] = newNode;
      }
    });
  };
}
