import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { ChatMessage } from './models/chat-types';
import './chat-message'; // Import the chat-message component
import { chatAgentStyles } from './styles/chat-agent-styles';

/**
 * Chat Agent component
 * 
 * @element chat-agent
 * @slot - Default slot for any initial content
 * @csspart input - Input field for user messages
 * @csspart message - Individual message container
 * @csspart user-message - User message styling
 * @csspart assistant-message - Assistant message styling
 */
@customElement('chat-agent')
export class ChatAgent extends LitElement {
  /**
   * Chat conversation history
   */
  @state()
  private _messages: ChatMessage[] = [];

  /**
   * Current input value
   */
  @state()
  private _inputValue = '';

  /**
   * Loading state
   */
  @state()
  private _isLoading = false;
  
  /**
   * Controls whether pressing Enter sends the message
   */
  @state()
  private _enterSends = false;

  /**
   * Optional placeholder for the input field
   */
  @property({ type: String })
  placeholder = 'Type a message...';

  /**
   * Optional greeting message from the assistant
   */
  @property({ type: String })
  greeting = '';

  connectedCallback(): void {
    super.connectedCallback();
    
    // Add greeting message if provided
    if (this.greeting) {
      this._messages.push({
        id: crypto.randomUUID(),
        content: this.greeting,
        role: 'assistant',
        timestamp: new Date()
      });
    }
  }
  
  /**
   * After the component has been rendered, initialize the textarea
   * and handle auto-scrolling
   */
  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    
    // Initialize the textarea height
    const textarea = this.shadowRoot?.querySelector('textarea');
    if (textarea) {
      this._autoResizeTextarea(textarea);
    }
    
    // Auto-scroll to the latest message when messages change
    if (changedProperties.has('_messages')) {
      this._scrollToLatestMessage();
    }
  }
  
  /**
   * Scroll to the latest message
   * Only scrolls if user is already at or near the bottom (within 100px)
   * or if forceScroll is true
   */
  private _scrollToLatestMessage(forceScroll = false): void {
    // Use setTimeout to ensure DOM has updated
    setTimeout(() => {
      const terminalContent = this.shadowRoot?.querySelector('.terminal-content');
      if (terminalContent) {
        // Check if user is already at or near the bottom
        const isNearBottom = terminalContent.scrollHeight - terminalContent.scrollTop - terminalContent.clientHeight < 100;
        
        // Scroll to bottom if user is already near bottom or if forced
        if (isNearBottom || forceScroll) {
          terminalContent.scrollTop = terminalContent.scrollHeight;
        }
      }
    }, 0);
  }

  /**
   * Handle user input submission
   */
  private _handleSubmit(e: Event): void {
    e.preventDefault();
    
    if (!this._inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: this._inputValue,
      role: 'user',
      timestamp: new Date()
    };
    
    this._messages = [...this._messages, userMessage];
    this._inputValue = '';
    this._isLoading = true;
    
    // Force scroll to the latest message when user sends a message
    this._scrollToLatestMessage(true);
    
    // Simulate assistant reply (placeholder)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: '(This is a **placeholder** response. AI implementation will go here.)',
        role: 'assistant',
        timestamp: new Date()
      };
      
      this._messages = [...this._messages, assistantMessage];
      this._isLoading = false;
    }, 1000);
  }

  /**
   * Handle input changes and auto-resize the textarea
   */
  private _handleInput(e: InputEvent): void {
    const textarea = e.target as HTMLTextAreaElement;
    this._inputValue = textarea.value;
    
    // Auto-resize the textarea
    this._autoResizeTextarea(textarea);
  }
  
  /**
   * Auto-resize textarea to fit content
   */
  private _autoResizeTextarea(textarea: HTMLTextAreaElement): void {
    // Reset height to calculate the new height
    textarea.style.height = 'auto';
    
    // Set the new height based on scrollHeight with a small padding
    const newHeight = Math.min(200, Math.max(24, textarea.scrollHeight));
    textarea.style.height = `${newHeight}px`;
  }
  
  /**
   * Toggle the Enter Sends setting
   */
  private _toggleEnterSends(): void {
    this._enterSends = !this._enterSends;
  }
  
  /**
   * Handle keydown events in the input
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      // If Shift+Enter is pressed, always insert a newline
      if (e.shiftKey) {
        // Let the default behavior occur (newline insertion)
        return;
      }
      
      // If enterSends is true, submit the form
      if (this._enterSends) {
        e.preventDefault();
        if (this._inputValue.trim()) {
          this._handleSubmit(e);
        }
      }
      // If Alt+Enter is pressed when enterSends is false, submit the form
      else if (e.altKey) {
        e.preventDefault();
        if (this._inputValue.trim()) {
          this._handleSubmit(e);
        }
      }
      // Otherwise, let the default behavior occur (newline insertion)
    }
  }

  render() {
    return html`
      <div class="terminal">
        <div class="terminal-header">
          <div class="terminal-title">Terminal</div>
        </div>
        <div class="terminal-content" part="messages">
          <slot></slot>
          ${this._messages.map(message => html`
            <chat-message .message=${message}></chat-message>
          `)}
          ${this._isLoading ? html`<div class="loading-indicator">_</div>` : ''}
        </div>
        
        <form @submit=${this._handleSubmit} class="terminal-input-line">
          <div class="input-container">
            <span class="prompt">user@jdev:~$</span>
            <textarea
              part="input"
              placeholder=${this.placeholder}
              .value=${this._inputValue}
              @input=${this._handleInput}
              @keydown=${this._handleKeyDown}
              ?disabled=${this._isLoading}
              class="terminal-input"
              rows="1"
            ></textarea>
          </div>
          <div class="terminal-controls">
            <label class="enter-sends-toggle">
              <input 
                type="checkbox" 
                .checked=${this._enterSends} 
                @change=${this._toggleEnterSends}
              />
              <span>Enter sends${!this._enterSends ? ' (Alt+Enter to send)' : ''}</span>
            </label>
            <button 
              type="submit" 
              class="send-button" 
              ?disabled=${this._isLoading || !this._inputValue.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    `;
  }

  static styles = chatAgentStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-agent': ChatAgent;
  }
}