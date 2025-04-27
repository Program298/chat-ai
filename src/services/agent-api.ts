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
  const webhookUrl = 'http://127.0.0.1:5678/webhook-test/6bd1fbed-7a49-4387-9f71-6cce77983cd6'; // <<-- URL ของ webhook จริง ๆ

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // ถ้ามี token หรือ secret key ต้องส่ง header เพิ่ม เช่น Authorization
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message to agent: ${response.statusText}`);
  }


  const text = await response.text();

  // const data = await response.json();

  // สมมุติว่า data มีฟิลด์ `message` ที่ตอบกลับมา
  return {
    //message: data.message,
   message: text,
  };
}

// export async function sendMessageToAgent(message: string): Promise<AgentResponse> {
//   // TODO: Implement this by calling the AI agent's API endpoint.

//   return {
//     message: `Echo: ${message}`,
//   };
// }
