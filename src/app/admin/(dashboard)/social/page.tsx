'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type Tab = 'verbindung' | 'erstellen' | 'entwuerfe';

interface SocialAccount {
  id: string;
  platform: string;
  username: string | null;
  status: string;
  tokenExpiresAt: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
}

interface CarouselSlide {
  headline: string;
  text: string;
}

interface StoryFrame {
  text: string;
  cta: string;
}

interface GeneratedContent {
  feedCaption: string;
  carouselSlides: CarouselSlide[];
  storyFrames: StoryFrame[];
  hashtags: string[];
  imagePrompt: string;
  cta: string;
}

interface SocialPost {
  id: string;
  platform: string;
  type: string;
  status: string;
  caption: string;
  createdAt: string;
  scheduledAt: string | null;
  publishedAt: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Entwurf',
  scheduled: 'Geplant',
  published: 'Veröffentlicht',
  failed: 'Fehlgeschlagen',
};

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  scheduled: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

export default function SocialMediaPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('verbindung');

  // Tab 1 state
  const [account, setAccount] = useState<SocialAccount | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);

  // Tab 2 state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [editedCaption, setEditedCaption] = useState('');
  const [editedHashtags, setEditedHashtags] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);
  const [contentSuccess, setContentSuccess] = useState<string | null>(null);

  // Tab 3 state
  const [drafts, setDrafts] = useState<SocialPost[]>([]);
  const [draftsLoading, setDraftsLoading] = useState(false);

  // Notifications from OAuth redirect
  const oauthError = searchParams.get('error');
  const oauthSuccess = searchParams.get('success');

  useEffect(() => {
    loadAccount();
    loadBlogPosts();
  }, []);

  useEffect(() => {
    if (activeTab === 'entwuerfe') loadDrafts();
  }, [activeTab]);

  const loadAccount = async () => {
    setAccountLoading(true);
    try {
      const res = await fetch('/api/admin/social/account');
      if (res.ok) {
        const data = await res.json();
        setAccount(data.account || null);
      }
    } catch {
      // ignore
    } finally {
      setAccountLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const res = await fetch('/api/admin/social/blog-posts');
      if (res.ok) {
        const data = await res.json();
        setBlogPosts(data.posts || []);
      }
    } catch {
      // ignore
    }
  };

  const loadDrafts = async () => {
    setDraftsLoading(true);
    try {
      const res = await fetch('/api/admin/social/drafts');
      if (res.ok) {
        const data = await res.json();
        setDrafts(data.posts || []);
      }
    } catch {
      // ignore
    } finally {
      setDraftsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Instagram-Verbindung wirklich trennen?')) return;
    try {
      await fetch('/api/admin/social/account', { method: 'DELETE' });
      setAccount(null);
    } catch {
      // ignore
    }
  };

  const handleGenerateContent = async () => {
    if (!selectedPostId) return;
    setGenerating(true);
    setContentError(null);
    setGeneratedContent(null);

    try {
      const res = await fetch('/api/admin/social/generate-from-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogPostId: selectedPostId }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setContentError(data.error || 'Fehler beim Generieren.');
        return;
      }

      setGeneratedContent(data.content);
      setEditedCaption(data.content.feedCaption || '');
      setEditedHashtags((data.content.hashtags || []).join(' '));
    } catch {
      setContentError('Netzwerkfehler. Bitte erneut versuchen.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!generatedContent) return;
    setSavingDraft(true);
    setContentError(null);

    try {
      const res = await fetch('/api/admin/social/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'instagram',
          type: 'feed',
          caption: editedCaption,
          hashtags: editedHashtags,
          blogPostId: selectedPostId || null,
          mediaUrls: JSON.stringify(generatedContent.carouselSlides),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setContentError(data.error || 'Fehler beim Speichern.');
        return;
      }

      setContentSuccess('Entwurf gespeichert!');
      setTimeout(() => setContentSuccess(null), 3000);
    } catch {
      setContentError('Netzwerkfehler.');
    } finally {
      setSavingDraft(false);
    }
  };

  const handlePublish = async (draftId?: string) => {
    const id = draftId;
    if (!id) return;
    setPublishing(true);
    setContentError(null);

    try {
      const res = await fetch('/api/admin/social/publish-instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setContentError(data.error || 'Fehler beim Veröffentlichen.');
        return;
      }

      setContentSuccess('Erfolgreich auf Instagram veröffentlicht!');
      loadDrafts();
    } catch {
      setContentError('Netzwerkfehler.');
    } finally {
      setPublishing(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'verbindung', label: 'Instagram-Verbindung' },
    { id: 'erstellen', label: 'Content erstellen' },
    { id: 'entwuerfe', label: 'Gespeicherte Entwürfe' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Social Media Center</h1>
        <p className="text-gray-500 text-sm mt-1">Instagram-Content verwalten und veröffentlichen.</p>
      </div>

      {oauthError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
          Verbindung fehlgeschlagen: {oauthError.replace(/_/g, ' ')}
        </div>
      )}
      {oauthSuccess === 'connected' && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-5 text-sm">
          Instagram erfolgreich verbunden!
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Verbindung */}
      {activeTab === 'verbindung' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Instagram-Verbindung</h2>

          {accountLoading ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="inline-block w-4 h-4 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
              Lade Verbindungsstatus…
            </div>
          ) : account ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                  📸
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">@{account.username || account.id}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Status: <span className={`font-medium ${account.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>{account.status === 'connected' ? 'Verbunden' : account.status}</span>
                    {account.tokenExpiresAt && (
                      <> &middot; Token läuft ab: {new Date(account.tokenExpiresAt).toLocaleDateString('de-DE')}</>
                    )}
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">Verbunden</span>
              </div>
              <button
                onClick={handleDisconnect}
                className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Verbindung trennen
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg">
                  📸
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-700">Instagram nicht verbunden</div>
                  <div className="text-xs text-gray-500 mt-0.5">Verbinde dein Instagram Business-Konto um direkt zu veröffentlichen.</div>
                </div>
                <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full font-medium">Nicht verbunden</span>
              </div>
              <a
                href="/api/admin/social/instagram/connect"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                📸 Instagram verbinden
              </a>
              <p className="text-xs text-gray-400">
                Du benötigst ein Instagram Business- oder Creator-Konto, das mit einer Facebook-Seite verbunden ist.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Content erstellen */}
      {activeTab === 'erstellen' && (
        <div className="space-y-5">
          {contentError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{contentError}</div>
          )}
          {contentSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">{contentSuccess}</div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Blogartikel auswählen</h2>
            <div className="flex gap-3">
              <select
                value={selectedPostId}
                onChange={e => setSelectedPostId(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={generating}
              >
                <option value="">— Blogartikel auswählen —</option>
                {blogPosts.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              <button
                onClick={handleGenerateContent}
                disabled={!selectedPostId || generating}
                className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
              >
                {generating ? (
                  <><span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Generiere…</>
                ) : (
                  <>🤖 Social Content generieren</>
                )}
              </button>
            </div>
          </div>

          {generatedContent && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Generierter Content</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Feed-Caption <span className="text-gray-400 font-normal">({editedCaption.length} Zeichen)</span>
                    </label>
                    <textarea
                      value={editedCaption}
                      onChange={e => setEditedCaption(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>

                  {generatedContent.carouselSlides?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Carousel-Folien</label>
                      <div className="space-y-2">
                        {generatedContent.carouselSlides.map((slide, i) => (
                          <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <div className="text-xs font-medium text-gray-500 mb-1">Folie {i + 1}</div>
                            <div className="font-medium text-gray-800 text-sm">{slide.headline}</div>
                            <div className="text-gray-600 text-sm mt-0.5">{slide.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedContent.storyFrames?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Story-Texte</label>
                      <div className="space-y-2">
                        {generatedContent.storyFrames.map((frame, i) => (
                          <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                            <div className="text-xs font-medium text-gray-500 mb-1">Story {i + 1}</div>
                            <div className="text-gray-800 text-sm">{frame.text}</div>
                            {frame.cta && <div className="text-primary text-xs mt-1 font-medium">{frame.cta}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Hashtags</label>
                    <textarea
                      value={editedHashtags}
                      onChange={e => setEditedHashtags(e.target.value)}
                      rows={2}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>

                  {generatedContent.imagePrompt && (
                    <div className="bg-gray-50 rounded-lg px-4 py-3">
                      <div className="text-xs font-medium text-gray-500 mb-1">Bild-Prompt (für KI-Bildgenerierung)</div>
                      <div className="text-sm text-gray-700 select-all">{generatedContent.imagePrompt}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleSaveDraft}
                  disabled={savingDraft || publishing}
                  className="border border-primary text-primary px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                  {savingDraft ? (
                    <><span className="inline-block w-3.5 h-3.5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />Speichern…</>
                  ) : '💾 Als Entwurf speichern'}
                </button>
                {account && account.status === 'connected' && (
                  <button
                    onClick={() => handlePublish()}
                    disabled={savingDraft || publishing}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {publishing ? 'Veröffentliche…' : '📸 Auf Instagram veröffentlichen'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab 3: Entwürfe */}
      {activeTab === 'entwuerfe' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Gespeicherte Entwürfe</h2>
            <button
              onClick={loadDrafts}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Aktualisieren
            </button>
          </div>

          {draftsLoading ? (
            <div className="p-8 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
              Lade Entwürfe…
            </div>
          ) : drafts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-3xl mb-3">📭</div>
              <p className="text-gray-500 text-sm">Noch keine Social-Posts gespeichert.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Plattform / Typ</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Caption</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Erstellt</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {drafts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-medium text-gray-700 capitalize">{post.platform}</span>
                        <span className="text-gray-400 ml-1">/ {post.type}</span>
                      </td>
                      <td className="px-5 py-3.5 max-w-xs">
                        <p className="line-clamp-1 text-gray-600">{post.caption}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[post.status] || 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABELS[post.status] || post.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">
                        {new Date(post.createdAt).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-5 py-3.5">
                        {post.status === 'draft' && account?.status === 'connected' && (
                          <button
                            onClick={() => handlePublish(post.id)}
                            disabled={publishing}
                            className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-60"
                          >
                            Veröffentlichen
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
