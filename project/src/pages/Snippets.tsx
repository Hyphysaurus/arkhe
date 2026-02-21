import { useState } from 'react';
import { Plus, Copy, Trash2, Edit2, Check, Tag, Search, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  tags: string[];
  createdAt: Date;
  color: string;
}

export function Snippets() {
  const { currentTheme } = useTheme();
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: '1',
      title: 'Supabase Client Setup',
      content: `import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);`,
      language: 'typescript',
      tags: ['supabase', 'setup'],
      createdAt: new Date(),
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '2',
      title: 'Custom Hook Pattern',
      content: `export function useCustomHook() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic
  }, []);

  return { state, setState };
}`,
      language: 'typescript',
      tags: ['react', 'hooks'],
      createdAt: new Date(),
      color: 'from-blue-500 to-cyan-500'
    }
  ]);

  const [showNewSnippet, setShowNewSnippet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    content: '',
    language: 'typescript',
    tags: '',
    color: 'from-cyan-500 to-teal-500'
  });

  const colors = [
    'from-cyan-500 to-teal-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-purple-500 to-pink-500',
    'from-yellow-500 to-orange-500'
  ];

  const handleCopy = (snippet: Snippet) => {
    navigator.clipboard.writeText(snippet.content);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setSnippets(snippets.filter(s => s.id !== id));
  };

  const handleAddSnippet = () => {
    if (!newSnippet.title || !newSnippet.content) return;

    const snippet: Snippet = {
      id: Date.now().toString(),
      title: newSnippet.title,
      content: newSnippet.content,
      language: newSnippet.language,
      tags: newSnippet.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date(),
      color: newSnippet.color
    };

    setSnippets([snippet, ...snippets]);
    setNewSnippet({
      title: '',
      content: '',
      language: 'typescript',
      tags: '',
      color: 'from-cyan-500 to-teal-500'
    });
    setShowNewSnippet(false);
  };

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-mono">Code Snippets</h1>
            <p className="text-slate-400">
              Quick access to your most used code patterns and configurations
            </p>
          </div>
          <button
            onClick={() => setShowNewSnippet(true)}
            className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentTheme.gradient} text-white font-semibold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <Plus className="w-5 h-5 relative z-10" />
            <span className="relative z-10">New Snippet</span>
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search snippets by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
            style={{ '--tw-ring-color': currentTheme.primary } as any}
          />
        </div>
      </div>

      {showNewSnippet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">Create New Snippet</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                <input
                  type="text"
                  value={newSnippet.title}
                  onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
                  placeholder="e.g., API Client Setup"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': currentTheme.primary } as any}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Language</label>
                <select
                  value={newSnippet.language}
                  onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': currentTheme.primary } as any}
                >
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="rust">Rust</option>
                  <option value="go">Go</option>
                  <option value="sql">SQL</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="bash">Bash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Code</label>
                <textarea
                  value={newSnippet.content}
                  onChange={(e) => setNewSnippet({ ...newSnippet, content: e.target.value })}
                  placeholder="Paste your code here..."
                  rows={12}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 font-mono text-sm"
                  style={{ '--tw-ring-color': currentTheme.primary } as any}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newSnippet.tags}
                  onChange={(e) => setNewSnippet({ ...newSnippet, tags: e.target.value })}
                  placeholder="e.g., react, hooks, custom"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': currentTheme.primary } as any}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Color Theme</label>
                <div className="grid grid-cols-6 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewSnippet({ ...newSnippet, color })}
                      className={`h-12 rounded-lg bg-gradient-to-br ${color} transition-transform hover:scale-110 ${
                        newSnippet.color === color ? 'ring-2 ring-white scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddSnippet}
                className={`flex-1 px-6 py-3 bg-gradient-to-r ${currentTheme.gradient} text-white font-semibold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition`}
              >
                Create Snippet
              </button>
              <button
                onClick={() => setShowNewSnippet(false)}
                className="px-6 py-3 bg-slate-800 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSnippets.map((snippet) => (
          <div
            key={snippet.id}
            className="group relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition"
          >
            <div className={`h-2 bg-gradient-to-r ${snippet.color}`} />

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{snippet.title}</h3>
                  <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
                    {snippet.language}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(snippet)}
                    className={`p-2 rounded-lg transition ${
                      copiedId === snippet.id
                        ? `bg-green-500/20 text-green-400`
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Copy to clipboard"
                  >
                    {copiedId === snippet.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(snippet.id)}
                    className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-red-400 transition"
                    title="Delete snippet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <pre className="text-xs text-slate-300 bg-slate-950/50 rounded-lg p-4 mb-4 overflow-x-auto font-mono leading-relaxed border border-slate-800">
                {snippet.content}
              </pre>

              {snippet.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-slate-800/50 text-slate-400 rounded"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Copy className="w-10 h-10 text-slate-600" />
          </div>
          <p className="text-slate-400 mb-4">No snippets found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
