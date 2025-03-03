import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatMessage } from './models/chat-types';

/**
 * Chat Message component
 * 
 * @element chat-message
 * @csspart message - Message container
 * @csspart user-message - User message styling
 * @csspart assistant-message - Assistant message styling
 */
@customElement('chat-message')
export class ChatMessageElement extends LitElement {
  /**
   * The message data to display
   */
  @property({ type: Object })
  message!: ChatMessage;

  render() {
    const roleName = this.message.role === 'user' ? 'user' : 'agent';
    const timeString = this.message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return html`
      <div class="terminal-line" part="message ${this.message.role}-message">
        <div class="message-header">
          <span class="message-timestamp">${timeString}</span>
          <span class="message-role ${this.message.role}-role">${roleName}@agentj</span>
        </div>
        <div class="message-content ${this.message.role}-text">
          ${this.message.content}
        </div>
      </div>
    `;
  }

  static styles = css`
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-message': ChatMessageElement;
  }
}
