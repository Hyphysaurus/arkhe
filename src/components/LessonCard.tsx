import { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Lightbulb, Play } from 'lucide-react';
import type { Lesson } from '../data/learningPath';

interface LessonCardProps {
  lesson: Lesson;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function LessonCard({ lesson, isExpanded, onToggle }: LessonCardProps) {
  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'try'>('concept');

  const difficultyColors = {
    beginner: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    intermediate: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    advanced: 'from-rose-500/20 to-pink-500/20 border-rose-500/30'
  };

  const difficultyText = {
    beginner: 'Ἀρχάριος',
    intermediate: 'Μέσος',
    advanced: 'Προχωρημένος'
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${difficultyColors[lesson.difficulty]} border`}>
            {difficultyText[lesson.difficulty]}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white">{lesson.title}</h3>
            <p className="text-sm text-white/50">{lesson.greekTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">{lesson.duration}</span>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-white/10 p-6 space-y-4">
          <p className="text-white/70">{lesson.description}</p>

          <div className="flex flex-wrap gap-2">
            {lesson.concepts.map((concept) => (
              <span
                key={concept}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60"
              >
                {concept}
              </span>
            ))}
          </div>

          <div className="flex gap-2 border-b border-white/10">
            <button
              onClick={() => setActiveTab('concept')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'concept'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Concept
              </div>
            </button>
            {lesson.codeExample && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Code
                </div>
              </button>
            )}
            {lesson.tryIt && (
              <button
                onClick={() => setActiveTab('try')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'try'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Try It
                </div>
              </button>
            )}
          </div>

          <div className="min-h-[120px]">
            {activeTab === 'concept' && lesson.vibePrompt && (
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-xs text-purple-300 mb-2 font-medium">Vibe Prompt Example</div>
                <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono">
                  {lesson.vibePrompt}
                </pre>
              </div>
            )}

            {activeTab === 'code' && lesson.codeExample && (
              <div className="p-4 bg-black/40 border border-white/10 rounded-lg overflow-x-auto">
                <pre className="text-sm text-white/80 font-mono whitespace-pre">
                  {lesson.codeExample}
                </pre>
              </div>
            )}

            {activeTab === 'try' && lesson.tryIt && (
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg">
                <div className="text-xs text-emerald-300 mb-2 font-medium">Challenge</div>
                <p className="text-white/80">{lesson.tryIt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
