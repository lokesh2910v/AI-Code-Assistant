

import { GoogleGenerativeAI } from '@google/generative-ai';
const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey); // Check if it's loaded


// const genAI = new GoogleGenerativeAI("AIzaSyBIaJKI2mOYyUXHcgsPuL_LD2pNa3OdQhY");
const genAI = new GoogleGenerativeAI(apiKey);

interface CodeAnalysis {
  errors: string[];
  timeComplexity: string;
  spaceComplexity: string;
  cyclomaticComplexity: string;
  sustainability: string[];
  optimizations: string[];
  keyPoints: string[];
  code?: string;
}

export async function analyzeCode(code: string, language: string): Promise<CodeAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze this ${language} code and provide a detailed analysis. Format your response exactly like this example:

Code Explanation:
- Explain what the code does
- Break down the main components and logic
- Describe the algorithm or approach used

Time Complexity: O(n)

Space Complexity: O(1)

Cyclomatic Complexity: 3

Errors and Issues:
- List each error or potential issue here
- One item per line

Optimizations:
- If the current approach is brute force, provide an optimal solution
- List specific optimization suggestions
- Include code examples where relevant

Sustainability Improvements:
- List each improvement here
- One item per line

Code to analyze:
${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    const analysis: CodeAnalysis = {
      errors: extractSection(text, 'errors', 'issues'),
      timeComplexity: extractSingleValue(text, 'time complexity'),
      spaceComplexity: extractSingleValue(text, 'space complexity'),
      cyclomaticComplexity: extractSingleValue(text, 'cyclomatic complexity'),
      sustainability: extractSection(text, 'sustainability'),
      optimizations: extractSection(text, 'optimizations'),
      keyPoints: extractSection(text, 'code explanation'),
      code,
    };

    // Provide default values if sections are empty
    if (analysis.keyPoints.length === 0) analysis.keyPoints = ['No explanation available'];
    if (analysis.errors.length === 0) analysis.errors = ['No errors found'];
    if (!analysis.timeComplexity) analysis.timeComplexity = 'Not available';
    if (!analysis.spaceComplexity) analysis.spaceComplexity = 'Not available';
    if (!analysis.cyclomaticComplexity) analysis.cyclomaticComplexity = 'Not available';
    if (analysis.sustainability.length === 0) analysis.sustainability = ['No suggestions available'];
    if (analysis.optimizations.length === 0) analysis.optimizations = ['No optimizations suggested'];

    return analysis;
  } catch (error) {
    console.error('Error analyzing code:', error);
    return {
      errors: ['Failed to analyze code. Please try again.'],
      timeComplexity: 'Analysis failed',
      spaceComplexity: 'Analysis failed',
      cyclomaticComplexity: 'Analysis failed',
      sustainability: ['Analysis failed'],
      optimizations: ['Analysis failed'],
      keyPoints: ['Analysis failed'],
      code,
    };
  }
}

function extractSection(text: string, ...keywords: string[]): string[] {
  const lines = text.split('\n');
  const results: string[] = [];
  let capturing = false;

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Check if we've hit a new section
    if (keywords.some(keyword => lowerLine.includes(keyword))) {
      capturing = true;
      continue;
    }
    
    // Stop capturing if we hit another section (indicated by a colon)
    if (capturing && line.includes(':') && !line.startsWith('-')) {
      capturing = false;
    }
    
    // Capture items that start with a dash
    if (capturing && line.trim().startsWith('-')) {
      const item = line.trim().substring(1).trim();
      if (item && !results.includes(item)) {
        results.push(item);
      }
    }
  }

  return results;
}

function extractSingleValue(text: string, keyword: string): string {
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes(keyword.toLowerCase())) {
      const value = line.split(':')[1]?.trim();
      if (value) return value;
    }
  }
  return '';
}