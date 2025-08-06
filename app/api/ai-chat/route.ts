import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/lib/env';
import { sanitizeAIInput, AI_CONFIG } from '@/lib/ai-utils';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Check for CSRF protection header
    const requestedWith = request.headers.get('X-Requested-With');
    if (requestedWith !== 'XMLHttpRequest') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 403 });
    }

    const { message, context } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Sanitize input
    const sanitizedMessage = sanitizeAIInput(message);

    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create context for real estate assistant
    const systemPrompt = `You are Meridian AI, a helpful real estate assistant for Meridian República Dominicana, a luxury real estate platform. 

Your role is to help users with:
- Property investment questions in Dominican Republic
- Real estate market information
- Tax incentives and benefits for foreign investors
- Property types (luxury homes, commercial, hotels, apartments)
- Investment processes and requirements
- General guidance about Dominican Republic real estate

Key information about Meridian:
- Only 3% commission vs 6% from competitors
- 100% verified properties with JCE and Real Estate Jurisdiction validation
- Properties range from $300K to $500M
- 24-72 hour verification process
- Tax incentives available for foreign investors
- Specializes in luxury real estate

Guidelines:
- Be helpful, professional, and knowledgeable
- Focus on Dominican Republic real estate
- Provide accurate information about our services
- If you don't know something specific, suggest contacting our team
- Keep responses concise but informative
- Always maintain a friendly, professional tone
- Respond in Spanish if the user writes in Spanish, English if they write in English

User context: ${context || 'General inquiry'}

User message: ${sanitizedMessage}`;

    // Generate response
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });

    // Handle specific Gemini API errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'AI service configuration error',
            code: 'AI_CONFIG_ERROR'
          }, 
          { status: 503 }
        );
      }
      
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'AI service temporarily unavailable',
            code: 'AI_QUOTA_EXCEEDED'
          }, 
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'AI service temporarily unavailable',
        code: 'AI_SERVICE_ERROR'
      }, 
      { status: 500 }
    );
  }
}