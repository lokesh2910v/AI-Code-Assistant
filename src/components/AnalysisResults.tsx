import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Clock, HardDrive, GitFork, Leaf, Zap, ListChecks, FileText, BarChart2, Code2 } from 'lucide-react';

interface AnalysisResultsProps {
  analysis: {
    errors: string[];
    timeComplexity: string;
    spaceComplexity: string;
    cyclomaticComplexity: string;
    sustainability: string[];
    optimizations: string[];
    keyPoints: string[];
    code: string;
  };
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  content: string | string[];
  defaultOpen?: boolean;
  className?: string;
}

function Section({ title, icon, content, defaultOpen = false, className = '' }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const items = Array.isArray(content) ? content : [content];

  return (
    <div className={`border border-gray-700 rounded-lg ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
      >
        <span className="text-blue-400">{icon}</span>
        <span className="font-medium flex-1 text-left">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && items.length > 0 && (
        <div className="p-4 bg-gray-850 overflow-visible">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MetricsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-6 max-h-[900px] overflow-visible pr-2">
      <Section
        title="Code Explanation"
        icon={<FileText className="w-5 h-5" />}
        content={analysis.keyPoints}
        defaultOpen={true}
      />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold">Metrics and Complexity</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MetricsCard title="Time Complexity" value={analysis.timeComplexity} />
          <MetricsCard title="Space Complexity" value={analysis.spaceComplexity} />
          <MetricsCard title="Cyclomatic Complexity" value={analysis.cyclomaticComplexity} />
          <MetricsCard title="Lines of Code" value={analysis.code?.split('\n').length.toString() || 'N/A'} />
        </div>
      </div>

      <Section
        title="Errors and Issues"
        icon={<AlertTriangle className="w-5 h-5" />}
        content={analysis.errors}
      />

      <Section
        title="Optimizations"
        icon={<Zap className="w-5 h-5" />}
        content={analysis.optimizations}
      />

      <Section
        title="Sustainability Improvements"
        icon={<Leaf className="w-5 h-5" />}
        content={analysis.sustainability}
      />
    </div>
  );
}