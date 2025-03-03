import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }
  
  .terminal-line {
    margin: 0 0 8px 0;
    line-height: 1.4;
    width: 100%;
    animation: typing 0.2s steps(40, end);
    white-space: pre-wrap;
    word-break: break-word;
    border-left: 2px solid var(--terminal-border, #313244);
    padding-left: 8px;
  }
  
  .message-header {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    font-size: 0.85rem;
  }
  
  .message-timestamp {
    color: var(--terminal-timestamp, #6c7086);
    margin-right: 10px;
  }
  
  .message-role {
    font-weight: bold;
  }
  
  .user-role {
    color: var(--terminal-prompt-color, #a6e3a1);
  }
  
  .assistant-role {
    color: var(--terminal-system-text, #f5c2e7);
  }
  
  .message-content {
    width: 100%;
    padding-left: 2px;
  }
  
  .user-text {
    color: var(--terminal-user-text, #89b4fa);
  }
  
  .assistant-text {
    color: var(--terminal-text, #cdd6f4);
  }
  
  /* Animations */
  @keyframes typing {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .markdown-body {
    line-height: 1.5;
  }
  
  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  
  .markdown-body h1 { font-size: 2em; }
  .markdown-body h2 { font-size: 1.5em; }
  .markdown-body h3 { font-size: 1.3em; }
  
  .markdown-body p {
    margin-bottom: 1em;
  }
  
  .markdown-body pre,
  .markdown-body code {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    font-family: monospace;
  }
  
  .markdown-body pre {
    padding: 0.5em;
    overflow-x: auto;
    margin-bottom: 1em;
  }
  
  .markdown-body code {
    padding: 0.2em 0.4em;
  }
  
  .markdown-body ul, 
  .markdown-body ol {
    padding-left: 2em;
    margin-bottom: 1em;
  }
  
  .markdown-body blockquote {
    border-left: 3px solid #ddd;
    padding-left: 1em;
    margin-left: 0;
    color: #777;
  }
`;
