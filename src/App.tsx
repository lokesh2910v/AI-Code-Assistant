import React, { useState } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeCode } from './lib/gemini';
import { Code2, Loader2, Brain, Zap } from 'lucide-react';

const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'typescript'];

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    try {
      const result = await analyzeCode(code, language);
      setAnalysis(result);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold">AI Code Assistant</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAnalyze}
                disabled={loading || !code.trim()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 
                         disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                Analyze Code
              </button>
            </div>

            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <CodeEditor
                code={code}
                language={language}
                onChange={(value) => setCode(value || '')}
              />
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 overflow-auto max-h-[calc(100vh-12rem)]">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold">Analysis Results</h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              </div>
            ) : analysis ? (
              <AnalysisResults analysis={analysis} />
            ) : (
              <p className="text-gray-400 text-center">
                Enter your code and click "Analyze Code" to get started
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;