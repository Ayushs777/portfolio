import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = await streamText({
      model: google('gemini-2.5-flash') as any,
      messages,
      system: `You are a helpful AI assistant for Ayush Chaudhary's portfolio. 
    Ayush is a Data Analyst, Cybersecurity Enthusiast, and AI/ML Learner.
    
    Key Information about Ayush:
    - Bio: Turning data into intelligence and securing the digital world.
    - Skills: Python, SQL, Power BI, Tableau, Machine Learning, Cybersecurity Fundamentals, Network Security.
    - Education: [Mention education if available, otherwise focus on interests].
    - Projects: [Mention projects if available].
    - Contact: ayushchaudhary7652@gmail.com
    - Links: 
      - GitHub: https://github.com/Ayushs777
      - LinkedIn: https://www.linkedin.com/in/ayush777
      - Fiverr: https://www.fiverr.com/ayushchaudh/buying?source=avatar_menu_profile

    Be professional, friendly, and concise. Your goal is to answer questions about Ayush and his work. 
    If you don't know something, suggest contacting Ayush directly via email or LinkedIn.
    Keep the tone futuristic and tech-savvy to match the portfolio's theme.`,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    // If API fails (due to invalid OpenAI key or Google quota), provide a relevant fallback response based on the user's prompt
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
    let fallbackText = "";

    if (lastMessage.includes('skill') || lastMessage.includes('tech') || lastMessage.includes('stack')) {
      fallbackText = "My core skills include Python, SQL, Power BI, Tableau, Machine Learning, Cybersecurity Fundamentals, and Network Security.";
    } else if (lastMessage.includes('contact') || lastMessage.includes('email') || lastMessage.includes('reach')) {
      fallbackText = "You can contact me at ayushchaudhary7652@gmail.com or through my LinkedIn: https://www.linkedin.com/in/ayush777";
    } else if (lastMessage.includes('project') || lastMessage.includes('work') || lastMessage.includes('experience')) {
      fallbackText = "I have worked on various projects turning data into intelligence and securing the digital world. Check out my GitHub: https://github.com/Ayushs777";
    } else if (lastMessage.includes('hello') || lastMessage.includes('hi ') || lastMessage === 'hi' || lastMessage.includes('hey')) {
      fallbackText = "Hello! I'm Ayush's AI assistant. How can I help you today? You can ask me about his skills, projects, or contact info.";
    } else {
      fallbackText = "I apologize, but my AI capabilities are currently unavailable due to API limits. To summarize Ayush: He is a Data Analyst & Cybersecurity Enthusiast skilled in Python, SQL, and ML. Contact him at ayushchaudhary7652@gmail.com.";
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send the fallback message in chunks to simulate streaming
        const words = fallbackText.split(' ');
        let index = 0;

        const sendWord = () => {
          if (index < words.length) {
            const word = words[index] + ' ';
            controller.enqueue(encoder.encode(`0:"${word}"\n`));
            index++;
            setTimeout(sendWord, 50); // Small delay between words
          } else {
            controller.close();
          }
        };

        sendWord();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  }
}
