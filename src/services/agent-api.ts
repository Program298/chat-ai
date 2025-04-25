/**
 * Represents the response from the AI agent.
 */
export interface AgentResponse {
  /**
   * The AI agent's response message.
   */
  message: string;
}

/**
 * Asynchronously sends a message to the AI agent via webhook and retrieves the response.
 *
 * @param message The user's message to send to the AI agent.
 * @returns A promise that resolves to an AgentResponse object containing the AI agent's reply.
 */
export async function sendMessageToAgent(message: string): Promise<AgentResponse> {
  // TODO: Implement this by calling the AI agent's API endpoint.

  return {
    message: `Echo: ${message}`,
  };
}
