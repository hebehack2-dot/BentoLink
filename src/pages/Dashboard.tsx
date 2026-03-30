import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import BentoGrid from '../components/BentoGrid';
import { Settings, Layout, Plus, Link as LinkIcon, Image as ImageIcon, Type, Share2, Copy, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Block, BlockType } from '../types';

export default function Dashboard() {
  const { profile, updateProfile, addBlock, updateBlock, removeBlock } = useProfile();
  const [activeTab, setActiveTab] = useState<'profile' | 'blocks' | 'theme'>('blocks');
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [copied, setCopied] = useState(false);

  const publicUrl = `${window.location.origin}/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      size: type === 'social' ? '1x1' : type === 'image' ? '2x2' : '2x1',
      title: `New ${type}`,
      bgColor: '#ffffff',
      textColor: '#000000',
    };
    addBlock(newBlock);
    setEditingBlock(newBlock);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar Editor */}
      <div className="w-full md:w-[480px] bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl">BentoLink</span>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-4 gap-6">
          <TabButton active={activeTab === 'blocks'} onClick={() => { setActiveTab('blocks'); setEditingBlock(null); }}>Blocks</TabButton>
          <TabButton active={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setEditingBlock(null); }}>Profile</TabButton>
          <TabButton active={activeTab === 'theme'} onClick={() => { setActiveTab('theme'); setEditingBlock(null); }}>Theme</TabButton>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {editingBlock ? (
            <BlockEditor 
              block={editingBlock} 
              onSave={(updates) => {
                updateBlock(editingBlock.id, updates);
                setEditingBlock(null);
              }}
              onCancel={() => setEditingBlock(null)}
              onDelete={() => {
                removeBlock(editingBlock.id);
                setEditingBlock(null);
              }}
            />
          ) : (
            <>
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Profile Details</h2>
                  <div className="space-y-4">
                    <Input label="Username" value={profile.username} onChange={(e) => updateProfile({ username: e.target.value })} />
                    <Input label="Display Name" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
                    <Input label="Bio" value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} multiline />
                    <Input label="Avatar URL" value={profile.avatarUrl} onChange={(e) => updateProfile({ avatarUrl: e.target.value })} />
                  </div>
                </div>
              )}

              {activeTab === 'theme' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Appearance</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <ThemeCard active={profile.theme === 'light'} onClick={() => updateProfile({ theme: 'light' })} name="Light" />
                    <ThemeCard active={profile.theme === 'dark'} onClick={() => updateProfile({ theme: 'dark' })} name="Dark" />
                    <ThemeCard active={profile.theme === 'glass'} onClick={() => updateProfile({ theme: 'glass' })} name="Glass" />
                  </div>
                </div>
              )}

              {activeTab === 'blocks' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Add Block</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <AddBlockButton icon={<LinkIcon />} label="Link" onClick={() => handleAddBlock('link')} />
                      <AddBlockButton icon={<Share2 />} label="Social" onClick={() => handleAddBlock('social')} />
                      <AddBlockButton icon={<Type />} label="Text" onClick={() => handleAddBlock('text')} />
                      <AddBlockButton icon={<ImageIcon />} label="Image" onClick={() => handleAddBlock('image')} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-4">Your Blocks</h2>
                    <div className="space-y-3">
                      {profile.blocks.map(block => (
                        <div 
                          key={block.id} 
                          onClick={() => setEditingBlock(block)}
                          className="p-4 rounded-xl border border-gray-200 bg-white hover:border-indigo-500 cursor-pointer flex items-center justify-between transition-colors shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                              {block.type === 'link' && <LinkIcon className="w-5 h-5" />}
                              {block.type === 'social' && <Share2 className="w-5 h-5" />}
                              {block.type === 'text' && <Type className="w-5 h-5" />}
                              {block.type === 'image' && <ImageIcon className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{block.title || 'Untitled'}</p>
                              <p className="text-xs text-gray-500 capitalize">{block.type} • {block.size}</p>
                            </div>
                          </div>
                          <Settings className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Live Preview Pane */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-[#f8f9fa] p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-3xl"></div>
        
        {/* Mobile Mockup */}
        <div className="w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden relative z-10 flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
            <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <BentoGrid profile={profile} isEditable />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-4 text-sm font-medium border-b-2 transition-colors ${active ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
    >
      {children}
    </button>
  );
}

function Input({ label, value, onChange, multiline }: { label: string, value: string, onChange: (e: any) => void, multiline?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {multiline ? (
        <textarea 
          value={value} 
          onChange={onChange} 
          rows={3}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
        />
      ) : (
        <input 
          type="text" 
          value={value} 
          onChange={onChange} 
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      )}
    </div>
  );
}

function AddBlockButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all group"
    >
      <div className="text-gray-400 group-hover:text-indigo-500 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">{label}</span>
    </button>
  );
}

function ThemeCard({ active, onClick, name }: { active: boolean, onClick: () => void, name: string }) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${active ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className={`w-full h-16 rounded-lg ${name === 'Light' ? 'bg-gray-100' : name === 'Dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-500 to-purple-500'}`}></div>
      <span className="text-sm font-medium">{name}</span>
    </button>
  );
}

function BlockEditor({ block, onSave, onCancel, onDelete }: { block: Block, onSave: (b: Partial<Block>) => void, onCancel: () => void, onDelete: () => void }) {
  const [edited, setEdited] = useState<Partial<Block>>(block);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold capitalize">Edit {block.type} Block</h2>
        <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-900">Cancel</button>
      </div>

      <div className="space-y-4">
        <Input label="Title" value={edited.title || ''} onChange={e => setEdited({ ...edited, title: e.target.value })} />
        
        {block.type !== 'text' && block.type !== 'image' && (
          <Input label="URL" value={edited.url || ''} onChange={e => setEdited({ ...edited, url: e.target.value })} />
        )}
        
        {block.type === 'social' && (
          <Input label="Icon Name (e.g. twitter, github, mail)" value={edited.icon || ''} onChange={e => setEdited({ ...edited, icon: e.target.value })} />
        )}

        {block.type === 'text' && (
          <Input label="Content" value={edited.content || ''} onChange={e => setEdited({ ...edited, content: e.target.value })} multiline />
        )}

        {block.type === 'image' && (
          <Input label="Image URL" value={edited.imageUrl || ''} onChange={e => setEdited({ ...edited, imageUrl: e.target.value })} />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
          <div className="flex gap-2">
            {['1x1', '2x1', '2x2'].map(size => (
              <button
                key={size}
                onClick={() => setEdited({ ...edited, size: size as any })}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${edited.size === size ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
            <input type="color" value={edited.bgColor || '#ffffff'} onChange={e => setEdited({ ...edited, bgColor: e.target.value })} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input type="color" value={edited.textColor || '#000000'} onChange={e => setEdited({ ...edited, textColor: e.target.value })} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button onClick={() => onSave(edited)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Save Changes
        </button>
        <button onClick={onDelete} className="px-6 bg-red-50 text-red-600 py-2.5 rounded-xl font-medium hover:bg-red-100 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}
