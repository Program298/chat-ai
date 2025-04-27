// 'use server';

import { sendMessageToAgent } from '@/services/agent-api';
import type { AgentResponse } from '@/services/agent-api';

/**
 * Server action to send a message to the AI agent.
 * @param message The message from the user.
 * @returns A promise that resolves to the agent's response or an error object.
 */
export async function sendMessage(
  message: string
): Promise<{ data: AgentResponse | null; error: string | null }> {
  try {
    // Input validation (optional, but good practice)
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return { data: null, error: 'Invalid message provided.' };
    }

    const response = await sendMessageToAgent(message.trim());
    return { data: response, error: null };
  } catch (error) {
    console.error('Error sending message to agent:', error);
    // Return a generic error message to the client for security
    return { data: null, error: 'Failed to get response from agent.' };
  }
}
