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
`;
