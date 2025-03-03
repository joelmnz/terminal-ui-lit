import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { ChatMessage } from './models/chat-types';
import { styles } from './chat-message.styles';
import { marked } from 'marked';

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

  /**
   * Renders markdown content to HTML
   */
  private renderMarkdown(content: string): string {
    const result = marked(content);
    if (result instanceof Promise) {
      throw new Error('Markdown rendering returned a Promise');
    }
    return result;
  }

  render() {
    const roleName = this.message.role === 'user' ? 'user' : 'agent';
    const timeString = this.message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const markdownContent = this.renderMarkdown(this.message.content);
    
    return html`
      <div class="terminal-line" part="message ${this.message.role}-message">
        <div class="message-header">
          <span class="message-timestamp">${timeString}</span>
          <span class="message-role ${this.message.role}-role">${roleName}@agentj</span>
        </div>
        <div class="message-content ${this.message.role}-text">
          ${unsafeHTML(markdownContent)}
        </div>
      </div>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-message': ChatMessageElement;
  }
}
