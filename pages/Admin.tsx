import React, { useState, useEffect, useRef } from 'react';
import { databases, storage, DATABASE_ID, COLLECTION_ID_ACADEMICS, COLLECTION_ID_PLACEMENTS, BUCKET_ID } from '../lib/appwrite';
import { ID, Permission, Role } from 'appwrite';
import { Loader2, Plus, Trash2, BookOpen, Briefcase, FileText, Upload, Folder, ShieldCheck, Link as LinkIcon, AlertCircle, X } from 'lucide-react';
import { Subject, Unit, Difficulty } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'academics' | 'placements'>('academics');
  
  // Data State
  const [subjects, setSubjects] = useState<any[]>([]);
  const [placements, setPlacements] = useState<any[]>([]);
  
  // --- Academics Form States ---
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [semester, setSemester] = useState('');
  
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [unitTitle, setUnitTitle] = useState('');
  const [unitDesc, setUnitDesc] = useState('');
  const [unitFile, setUnitFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Placements Form States ---
  const [probTitle, setProbTitle] = useState('');
  const [probTopic, setProbTopic] = useState('');
  const [probDiff, setProbDiff] = useState<Difficulty>(Difficulty.EASY);
  const [probCompanies, setProbCompanies] = useState('');
  const [probLink, setProbLink] = useState('');

  useEffect(() => {
    if (isAdmin) {
        fetchAcademics();
        fetchPlacements();
    } else {
        setLoading(false); 
    }
  }, [isAdmin]);

  const fetchAcademics = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_ACADEMICS);
      setSubjects(response.documents.map(doc => ({
          ...doc,
          units: typeof doc.units === 'string' ? JSON.parse(doc.units) : doc.units || []
      })));
    } catch (error) {
      console.error("Failed to fetch academics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlacements = async () => {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_PLACEMENTS);
        setPlacements(response.documents);
    } catch (error) {
        console.error("Failed to fetch placements", error);
    }
  }

  // --- Academics Handlers ---

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !subjectCode || !semester || !user) return;

    try {
      // Create document with permissions: Any can Read, Admin can Write
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_ACADEMICS,
        ID.unique(),
        {
          name: subjectName,
          code: subjectCode,
          semester: parseInt(semester),
          units: JSON.stringify([]) 
        },
        [
            Permission.read(Role.any()),
            Permission.write(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id))
        ]
      );
      setSubjectName('');
      setSubjectCode('');
      setSemester('');
      fetchAcademics();
      alert("Subject created successfully");
    } catch (error) {
      console.error("Error creating subject:", error);
      alert("Failed to create subject. Check Appwrite permissions.");
    }
  };

  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId || !unitTitle || !unitDesc || !user) {
        alert("Please fill in all unit details.");
        return;
    }

    if (!unitFile) {
        alert("Please upload a PDF file for the notes.");
        return;
    }

    setIsUploading(true);
    try {
      const subject = subjects.find(s => s.$id === selectedSubjectId);
      if (!subject) throw new Error("Subject not found");

      // Upload to Storage with public read permissions
      const uploadResponse = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          unitFile,
          [
            Permission.read(Role.any()),
            Permission.write(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id))
          ]
      );
      const pdfFileId = uploadResponse.$id;

      const newUnit: Unit = {
        id: Date.now(),
        title: unitTitle,
        description: unitDesc,
        pdfFileId: pdfFileId
      };

      const currentUnits = subject.units || [];
      const updatedUnits = [...currentUnits, newUnit];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_ACADEMICS,
        selectedSubjectId,
        {
          units: JSON.stringify(updatedUnits)
        }
      );

      setUnitTitle('');
      setUnitDesc('');
      setUnitFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      fetchAcademics();
      alert("Unit notes uploaded and added successfully!");
    } catch (error) {
      console.error("Error adding unit:", error);
      alert("Failed to add unit. Ensure you are logged in as admin.");
    } finally {
        setIsUploading(false);
    }
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (!window.confirm("Are you sure? This will delete the subject and ALL attached PDF notes.")) return;
    
    try {
      // 1. Find the subject to get its units
      const subject = subjects.find(s => s.$id === subjectId);
      if (subject && subject.units && subject.units.length > 0) {
          // 2. Delete all associated files from storage
          const deleteFilePromises = subject.units
              .filter((u: Unit) => u.pdfFileId)
              .map((u: Unit) => storage.deleteFile(BUCKET_ID, u.pdfFileId!));
          
          await Promise.allSettled(deleteFilePromises);
      }

      // 3. Delete the database document
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_ACADEMICS, subjectId);
      
      if (selectedSubjectId === subjectId) setSelectedSubjectId('');
      fetchAcademics();
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Failed to delete subject completely. Some files might remain.");
    }
  };

  // --- Placement Handlers ---
  
  const handleAddPlacement = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;
      try {
          const companiesArray = probCompanies.split(',').map(c => c.trim()).filter(c => c !== '');
          
          await databases.createDocument(
              DATABASE_ID,
              COLLECTION_ID_PLACEMENTS,
              ID.unique(),
              {
                  title: probTitle,
                  topic: probTopic,
                  difficulty: probDiff,
                  companies: companiesArray,
                  link: probLink
              },
              [
                Permission.read(Role.any()),
                Permission.write(Role.user(user.$id)),
                Permission.update(Role.user(user.$id)),
                Permission.delete(Role.user(user.$id))
              ]
          );

          setProbTitle('');
          setProbTopic('');
          setProbCompanies('');
          setProbLink('');
          fetchPlacements();
          alert("Problem added successfully!");
      } catch (error) {
          console.error("Error adding placement problem:", error);
          alert("Failed to add problem.");
      }
  };

  const handleDeletePlacement = async (id: string) => {
    if(!window.confirm("Delete this problem?")) return;
    try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_PLACEMENTS, id);
        fetchPlacements();
    } catch (error) {
        console.error(error);
        alert("Failed to delete problem.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-white"><Loader2 className="animate-spin text-slate-900" /></div>;
  }

  if (!isAdmin) {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="text-center">
                <ShieldCheck size={48} className="text-slate-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-900">Access Denied</h2>
                <p className="text-slate-500">You do not have permission to view this page.</p>
                <p className="text-xs text-slate-400 mt-2">Required: admin@gmail.com</p>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Manage content for Code of Shiksha</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">{user?.email}</span>
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8 px-2">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('academics')}
              className={`${
                activeTab === 'academics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              } whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium flex items-center gap-2`}
            >
              <BookOpen size={16}/> Academics
            </button>
            <button
              onClick={() => setActiveTab('placements')}
              className={`${
                activeTab === 'placements'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              } whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium flex items-center gap-2`}
            >
              <Briefcase size={16} /> Placements
            </button>
          </nav>
        </div>

        {activeTab === 'academics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Forms */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* 1. Create Subject Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                    <Folder size={18} /> New Subject
                </h3>
                <form onSubmit={handleCreateSubject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Subject Name</label>
                    <input
                      type="text"
                      required
                      value={subjectName}
                      onChange={e => setSubjectName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                      placeholder="e.g. Operating Systems"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Code</label>
                        <input
                        type="text"
                        required
                        value={subjectCode}
                        onChange={e => setSubjectCode(e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                        placeholder="KCS-401"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Semester</label>
                        <input
                        type="number"
                        required
                        value={semester}
                        onChange={e => setSemester(e.target.value)}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                        placeholder="4"
                        />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800"
                  >
                    Create Subject
                  </button>
                </form>
              </div>

              {/* 2. Add Unit Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                    <FileText size={18} /> Add Unit Notes
                </h3>
                <form onSubmit={handleAddUnit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Select Subject</label>
                        <select
                            value={selectedSubjectId}
                            onChange={(e) => setSelectedSubjectId(e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                            required
                        >
                            <option value="">-- Choose Subject --</option>
                            {subjects.map(s => (
                                <option key={s.$id} value={s.$id}>{s.name} ({s.code})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Unit Title</label>
                        <input
                            type="text"
                            required
                            value={unitTitle}
                            onChange={e => setUnitTitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                            placeholder="Unit 1: Introduction"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            required
                            rows={2}
                            value={unitDesc}
                            onChange={e => setUnitDesc(e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                            placeholder="Brief summary of the unit..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Upload PDF</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md bg-slate-50">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                <div className="flex text-sm text-slate-600 justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-slate-50 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                    >
                                        <span>Upload a file</span>
                                        <input 
                                            id="file-upload" 
                                            name="file-upload" 
                                            type="file" 
                                            className="sr-only" 
                                            ref={fileInputRef}
                                            accept=".pdf"
                                            onChange={(e) => setUnitFile(e.target.files ? e.target.files[0] : null)}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-slate-500">
                                    {unitFile ? unitFile.name : "PDF up to 10MB"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isUploading ? <Loader2 className="animate-spin" size={20} /> : 'Upload & Add Unit'}
                    </button>
                </form>
              </div>
            </div>

            {/* Right Column: List */}
            <div className="lg:col-span-7">
               <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                   <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                       <h3 className="font-semibold text-slate-900">Current Subjects</h3>
                       <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">{subjects.length} Total</span>
                   </div>
                   <div className="divide-y divide-slate-100 max-h-[800px] overflow-y-auto">
                       {subjects.length === 0 ? (
                           <div className="p-8 text-center text-slate-500 italic">No subjects added yet.</div>
                       ) : (
                           subjects.map((subject) => (
                               <div key={subject.$id} className="p-6 hover:bg-slate-50 transition-colors">
                                   <div className="flex justify-between items-start mb-4">
                                       <div>
                                           <h4 className="text-base font-medium text-slate-900">{subject.name}</h4>
                                           <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">{subject.code}</span>
                                                <span className="text-xs text-slate-500">Sem {subject.semester}</span>
                                           </div>
                                       </div>
                                       <button 
                                          onClick={() => handleDeleteSubject(subject.$id)}
                                          className="text-slate-400 hover:text-red-600 p-1"
                                          title="Delete Subject"
                                       >
                                           <Trash2 size={16} />
                                       </button>
                                   </div>
                                   
                                   {/* Units List Mini */}
                                   <div className="bg-slate-50 rounded-md border border-slate-100 p-3">
                                       <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                            <Folder size={12}/> Units ({subject.units.length})
                                       </div>
                                       {subject.units.length === 0 ? (
                                           <p className="text-xs text-slate-400 italic">No units uploaded.</p>
                                       ) : (
                                           <ul className="space-y-1.5">
                                               {subject.units.map((u: Unit, i: number) => (
                                                   <li key={i} className="text-xs flex items-center gap-2 text-slate-700 bg-white p-1.5 rounded border border-slate-100">
                                                       <FileText size={12} className="text-indigo-500" />
                                                       <span className="truncate flex-1">{u.title}</span>
                                                   </li>
                                               ))}
                                           </ul>
                                       )}
                                   </div>
                               </div>
                           ))
                       )}
                   </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Left Column: Form */}
             <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                        <Plus size={18} /> Add Problem
                    </h3>
                    <form onSubmit={handleAddPlacement} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Problem Title</label>
                            <input
                                type="text"
                                required
                                value={probTitle}
                                onChange={e => setProbTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Topic</label>
                            <input
                                type="text"
                                required
                                value={probTopic}
                                onChange={e => setProbTopic(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                                placeholder="e.g. Arrays, DP"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Difficulty</label>
                            <select
                                value={probDiff}
                                onChange={(e) => setProbDiff(e.target.value as Difficulty)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                            >
                                <option value={Difficulty.EASY}>Easy</option>
                                <option value={Difficulty.MEDIUM}>Medium</option>
                                <option value={Difficulty.HARD}>Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Companies (comma separated)</label>
                            <input
                                type="text"
                                required
                                value={probCompanies}
                                onChange={e => setProbCompanies(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                                placeholder="Google, Amazon, TCS"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Problem Link</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-gray-500 sm:text-sm">
                                    <LinkIcon size={14} />
                                </span>
                                <input
                                    type="url"
                                    required
                                    value={probLink}
                                    onChange={e => setProbLink(e.target.value)}
                                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm"
                                    placeholder="https://leetcode.com/..."
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800"
                        >
                            Add Problem
                        </button>
                    </form>
                 </div>
             </div>

             {/* Right Column: List */}
             <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                   <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                       <h3 className="font-semibold text-slate-900">Problem Database</h3>
                   </div>
                   <div className="overflow-x-auto">
                       <table className="min-w-full divide-y divide-slate-200">
                           <thead className="bg-slate-50">
                               <tr>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Topic</th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Diff</th>
                                   <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                               </tr>
                           </thead>
                           <tbody className="bg-white divide-y divide-slate-200">
                               {placements.length === 0 ? (
                                   <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 italic">No problems found.</td></tr>
                               ) : (
                                   placements.map((p) => (
                                       <tr key={p.$id} className="hover:bg-slate-50">
                                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{p.title}</td>
                                           <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{p.topic}</td>
                                           <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                   ${p.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                                                     p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                                     'bg-red-100 text-red-800'}`}>
                                                   {p.difficulty}
                                               </span>
                                           </td>
                                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                               <button 
                                                   onClick={() => handleDeletePlacement(p.$id)}
                                                   className="text-red-600 hover:text-red-900"
                                               >
                                                   <Trash2 size={16} />
                                               </button>
                                           </td>
                                       </tr>
                                   ))
                               )}
                           </tbody>
                       </table>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;