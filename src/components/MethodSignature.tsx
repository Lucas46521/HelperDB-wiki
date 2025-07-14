
import React from 'react';
import { Badge } from './ui/badge';

interface Parameter {
  name: string;
  type: string;
  optional?: boolean;
  description: string;
}

interface MethodSignatureProps {
  name: string;
  parameters: Parameter[];
  returnType: string;
  isStatic?: boolean;
  isAsync?: boolean;
  isDeprecated?: boolean;
  description: string;
}

export function MethodSignature({ 
  name, 
  parameters, 
  returnType, 
  isStatic, 
  isAsync, 
  isDeprecated, 
  description 
}: MethodSignatureProps) {
  return (
    <div className="api-method">
      <div className="api-method-header">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {isStatic && <Badge variant="static">Static</Badge>}
          {isAsync && <Badge variant="async">Async</Badge>}
          {isDeprecated && <Badge variant="deprecated">Deprecated</Badge>}
        </div>
        <div className="method-signature bg-black/20 rounded p-3">
          <code className="text-white">
            {isStatic && 'static '}
            {isAsync && 'async '}
            {name}({parameters.map((param, index) => (
              <span key={index}>
                {param.name}{param.optional ? '?' : ''}: {param.type}
                {index < parameters.length - 1 ? ', ' : ''}
              </span>
            ))}) → {returnType}
          </code>
        </div>
      </div>
      
      <div className="api-method-content">
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {parameters.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Parameters</h4>
            <table className="params-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index}>
                    <td>
                      <code className="param-name">
                        {param.name}{param.optional ? '?' : ''}
                      </code>
                    </td>
                    <td>
                      <code className="param-type">{param.type}</code>
                    </td>
                    <td>{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
