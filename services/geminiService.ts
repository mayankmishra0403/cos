// DeepSeek AI Service for AI Tutor
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

let conversationHistory: Message[] = [];
let responseCache: { [key: string]: string } = {};

// Local fallback responses for common questions
const fallbackResponses: { [key: string]: string } = {
  'hello': 'Hello! How can I help you with your AKTU studies today?',
  'hi': 'Hi there! Ready to learn about computer science and programming?',
  'what is programming': 'Programming is the process of creating instructions for computers to follow. It involves writing code in programming languages like C++, Java, Python, etc. to solve problems and create applications.',
  'what is data structure': 'Data structures are ways of organizing and storing data so that it can be accessed and modified efficiently. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs.',
  'what is algorithm': 'An algorithm is a step-by-step procedure or formula for solving a problem. It\'s like a recipe that tells the computer exactly what to do to accomplish a specific task.',
  'aktu syllabus': 'The AKTU (Dr. A.P.J. Abdul Kalam Technical University) syllabus for Computer Science includes subjects like Data Structures, Algorithms, Operating Systems, Database Management Systems, Computer Networks, and various programming languages.',
  'c++ basics': 'C++ is an object-oriented programming language. Basic concepts include variables, data types, loops, functions, classes, and objects. Here\'s a simple "Hello World" program:\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}',
  'python basics': 'Python is a high-level, interpreted programming language known for its simplicity. Basic concepts include variables, lists, dictionaries, loops, and functions. Here\'s a simple example:\n\nprint("Hello World!")\n\n# Variables\nname = "Student"\nprint(f"Hello, {name}!")',
  'time complexity': 'Time complexity measures how the runtime of an algorithm grows as the input size increases. Common complexities include:\n- O(1): Constant time\n- O(log n): Logarithmic time\n- O(n): Linear time\n- O(n²): Quadratic time\n- O(2^n): Exponential time',
  'space complexity': 'Space complexity measures the amount of memory an algorithm uses relative to the input size. It includes both auxiliary space and space used by input.',
};

function getFallbackResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase().trim();
  
  // Direct matches
  if (fallbackResponses[lowerMessage]) {
    return fallbackResponses[lowerMessage];
  }
  
  // Partial matches
  for (const [key, response] of Object.entries(fallbackResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return null;
}

export const getChatSession = () => {
  // Initialize with system instruction if empty
  if (conversationHistory.length === 0) {
    conversationHistory.push({
      role: 'system',
      content: `You are an expert AI tutor specialized in computer science, programming, data structures, algorithms, and AKTU syllabus. 
      Provide clear, concise explanations with code examples when needed. Be helpful, friendly, and educational.
      Help students understand concepts deeply, not just provide answers.`
    });
  }
  return conversationHistory;
};

export const sendMessageStream = async (message: string) => {
  try {
    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Check cache first
    const cacheKey = message.toLowerCase().trim();
    if (responseCache[cacheKey]) {
      // Return cached response as mock stream
      const mockResponse = {
        body: {
          getReader: () => {
            let sent = false;
            return {
              read: async () => {
                if (!sent) {
                  sent = true;
                  return {
                    done: false,
                    value: new TextEncoder().encode(
                      `data: ${JSON.stringify({ choices: [{ delta: { content: responseCache[cacheKey] } }] })}\n\n`
                    )
                  };
                } else {
                  return { done: true, value: undefined };
                }
              }
            };
          }
        }
      };
      
      // Add cached response to history
      conversationHistory.push({
        role: 'assistant',
        content: responseCache[cacheKey]
      });
      
      return mockResponse;
    }

    // Check for local fallback response
    const fallbackResponse = getFallbackResponse(message);
    if (fallbackResponse) {
      // Cache the fallback response
      responseCache[cacheKey] = fallbackResponse;
      
      // Create a mock streaming response for fallback
      const mockResponse = {
        body: {
          getReader: () => {
            let sent = false;
            return {
              read: async () => {
                if (!sent) {
                  sent = true;
                  return {
                    done: false,
                    value: new TextEncoder().encode(
                      `data: ${JSON.stringify({ choices: [{ delta: { content: fallbackResponse } }] })}\n\n`
                    )
                  };
                } else {
                  return { done: true, value: undefined };
                }
              }
            };
          }
        }
      };
      
      // Add fallback response to history
      conversationHistory.push({
        role: 'assistant',
        content: fallbackResponse
      });
      
      return mockResponse;
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: conversationHistory,
        stream: true,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('429');
      }
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error("Error sending message to DeepSeek:", error);
    throw error;
  }
};

export const resetSession = () => {
  conversationHistory = [];
};

export const cacheResponse = (key: string, response: string) => {
  responseCache[key] = response;
};