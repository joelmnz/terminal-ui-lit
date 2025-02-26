import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

/**
 * Chat message interface
 */
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

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
        content: '(This is a placeholder response. AI implementation will go here.)',
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
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">Terminal</div>
        </div>
        <div class="terminal-content" part="messages">
          <slot></slot>
          ${this._messages.map(message => html`
            <div class="terminal-line">
              ${message.role === 'user' 
                ? html`<span class="prompt user-prompt">user@localhost:~$</span> <span class="user-text">${message.content}</span>` 
                : html`<span class="prompt system-prompt">system@localhost:~$</span> <span class="system-text">${message.content}</span>`
              }
              <div class="message-timestamp">
                # ${message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          `)}
          ${this._isLoading ? html`<div class="loading-indicator">_</div>` : ''}
        </div>
        
        <form @submit=${this._handleSubmit} class="terminal-input-line">
          <div class="input-container">
            <span class="prompt">user@localhost:~$</span>
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

  static styles = css`
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
      --terminal-button-red: #f38ba8;
      --terminal-button-yellow: #f9e2af;
      --terminal-button-green: #a6e3a1;
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
      background-color: var(--terminal-header-bg);
      padding: 8px 12px;
      border-bottom: 1px solid var(--terminal-border);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    
    .terminal-buttons {
      display: flex;
      gap: 8px;
      margin-right: 12px;
    }
    
    .terminal-button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    
    .terminal-button.close {
      background-color: var(--terminal-button-red);
    }
    
    .terminal-button.minimize {
      background-color: var(--terminal-button-yellow);
    }
    
    .terminal-button.maximize {
      background-color: var(--terminal-button-green);
    }
    
    .terminal-title {
      color: var(--terminal-text);
      opacity: 0.8;
      font-size: 14px;
      margin: 0 auto;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-agent': ChatAgent;
  }
}