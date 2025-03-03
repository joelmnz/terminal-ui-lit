import { css } from 'lit';

export const chatAgentStyles = css`
  :host {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    height: 100%;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Source Code Pro', 'Ubuntu Mono', Consolas, monospace;
    --terminal-bg: #1e1e2e;
    --terminal-header-bg: #181825;
    --terminal-text: #cdd6f4;
    --terminal-prompt-color: #a6e3a1;
    --terminal-user-text: #89b4fa;
    --terminal-system-text: #f5c2e7;
    --terminal-timestamp: #6c7086;
    --terminal-cursor: #f38ba8;
    --terminal-selection: rgba(245, 224, 166, 0.2);
    --terminal-border: #313244;
    --scrollbar-track: #181825;
    --scrollbar-thumb: #45475a;
  }
  
  .terminal {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    background-color: var(--terminal-bg);
    color: var(--terminal-text);
    border: 1px solid var(--terminal-border);
  }
  
  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--terminal-header-bg);
    padding: 8px 12px;
    border-bottom: 1px solid var(--terminal-border);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .terminal-title {
    color: var(--terminal-text);
    opacity: 0.8;
    font-size: 14px;
  }
  
  .terminal-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
    scroll-behavior: smooth;
  }
  
  .terminal-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .terminal-content::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
  
  .terminal-content::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb);
    border-radius: 4px;
  }
  
  .terminal-line {
    margin: 0 0 14px 0;
    line-height: 1.5;
    width: 100%;
    animation: typing 0.2s steps(40, end);
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .prompt {
    font-weight: bold;
    margin-right: 10px;
    color: var(--terminal-prompt-color);
  }
  
  .user-prompt {
    color: var(--terminal-prompt-color);
  }
  
  .system-prompt {
    color: var(--terminal-system-text);
  }
  
  .user-text {
    color: var(--terminal-user-text);
  }
  
  .system-text {
    color: var(--terminal-text);
  }
  
  .message-timestamp {
    font-size: 0.75rem;
    margin-top: 4px;
    opacity: 0.6;
    color: var(--terminal-timestamp);
  }
  
  .loading-indicator {
    margin-left: 24px;
    font-size: 1.5rem;
    color: var(--terminal-cursor);
    animation: blink 1s step-end infinite;
  }
  
  .terminal-input-line {
    display: flex;
    flex-direction: column;
    padding: 14px 16px;
    background-color: var(--terminal-bg);
    border-top: 1px solid var(--terminal-border);
  }
  
  .input-container {
    display: flex;
    align-items: flex-start;
  }
  
  .terminal-input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--terminal-user-text);
    font-size: 14px;
    font-family: inherit;
    padding: 0;
    caret-color: var(--terminal-cursor);
    resize: vertical;
    min-height: 24px;
    max-height: 200px;
    overflow-y: auto;
    line-height: 1.5;
    margin-top: 2px;
  }
  
  .terminal-input::selection {
    background-color: var(--terminal-selection);
  }
  
  .terminal-input:focus {
    outline: none;
  }
  
  .terminal-input::placeholder {
    color: var(--terminal-timestamp);
  }
  
  .terminal-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding-left: 24px;
  }
  
  .enter-sends-toggle {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--terminal-timestamp);
    user-select: none;
    cursor: pointer;
  }
  
  .enter-sends-toggle input {
    margin-right: 6px;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 1px solid var(--terminal-border);
    border-radius: 3px;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }
  
  .enter-sends-toggle input:checked::before {
    content: "✓";
    position: absolute;
    color: var(--terminal-prompt-color);
    font-size: 12px;
    top: -3px;
    left: 2px;
  }
  
  .send-button {
    background-color: transparent;
    color: var(--terminal-prompt-color);
    border: 1px solid var(--terminal-border);
    border-radius: 4px;
    padding: 6px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .send-button:hover:not(:disabled) {
    background-color: rgba(166, 227, 161, 0.1);
  }
  
  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Animations */
  @keyframes typing {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
