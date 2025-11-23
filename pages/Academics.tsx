import React, { useState, useEffect } from 'react';
import { Subject, Unit } from '../types';
import { FileText, ChevronRight, ChevronDown, Loader2, AlertCircle, Folder, BookOpen } from 'lucide-react';
import { databases, storage, DATABASE_ID, COLLECTION_ID_ACADEMICS, BUCKET_ID } from '../lib/appwrite';

const Academics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_ACADEMICS
        );
        
        const mappedSubjects: Subject[] = response.documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          code: doc.code,
          semester: doc.semester,
          units: typeof doc.units === 'string' ? JSON.parse(doc.units) : doc.units || []
        }));

        setSubjects(mappedSubjects);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
        setError("Failed to load academic resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const toggleSubject = (id: string) => {
    setSelectedSubject(selectedSubject === id ? null : id);
  };

  const handleDownloadPdf = (unit: Unit) => {
    if (!unit.pdfFileId) {
      alert("No PDF file attached to this unit.");
      return;
    }

    try {
      const result = storage.getFileView(BUCKET_ID, unit.pdfFileId);
      window.open(result.toString(), '_blank');
    } catch (error) {
      console.error("Error accessing file:", error);
      alert("Could not access the file. It might have been deleted.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="animate-spin text-slate-900" size={32} />
           <p className="text-slate-500 text-sm animate-pulse">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Academic Resources</h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl">
            Streamlined access to unit-wise simplified notes and syllabus details tailored for your semester exams.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center shadow-sm">
             <AlertCircle className="mr-3 flex-shrink-0" size={20} /> {error}
          </div>
        )}

        {!error && subjects.length === 0 && (
          <div className="text-center text-slate-500 py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No subjects yet</p>
            <p>Check back later for updated content.</p>
          </div>
        )}

        <div className="space-y-4">
          {subjects.map((subject: Subject) => (
            <div 
              key={subject.id} 
              className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
                selectedSubject === subject.id ? 'border-indigo-200 ring-4 ring-indigo-50/50' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Subject Header */}
              <div 
                className="px-6 py-5 flex items-center justify-between cursor-pointer group"
                onClick={() => toggleSubject(subject.id)}
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-lg transition-colors duration-300 ${selectedSubject === subject.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'}`}>
                    <Folder size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 leading-snug">{subject.name}</h3>
                    <div className="flex items-center text-xs font-medium text-slate-500 space-x-2 mt-1">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">{subject.code}</span>
                        <span className="text-slate-300">•</span>
                        <span>Semester {subject.semester}</span>
                        <span className="text-slate-300">•</span>
                        <span>{subject.units.length} Units</span>
                    </div>
                  </div>
                </div>
                <div className={`text-slate-400 transition-transform duration-300 ${selectedSubject === subject.id ? 'rotate-180 text-indigo-600' : 'group-hover:text-slate-600'}`}>
                  <ChevronDown size={20} />
                </div>
              </div>

              {/* Units List */}
              <div 
                className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
                   selectedSubject === subject.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-slate-100 bg-slate-50/30">
                  <ul className="divide-y divide-slate-100">
                    {subject.units.map((unit: Unit, index: number) => (
                      <li key={index} className="px-6 py-5 flex flex-col sm:flex-row sm:items-start justify-between hover:bg-slate-50 transition-colors duration-200">
                        <div className="flex-1 pr-6">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Unit {index + 1}</span>
                            </div>
                            <h4 className="text-base font-medium text-slate-900 mb-1">{unit.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{unit.description}</p>
                        </div>
                        <div className="mt-4 sm:mt-1 flex-shrink-0">
                            {unit.pdfFileId ? (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDownloadPdf(unit); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <FileText size={16} /> 
                                    <span>Notes</span>
                                </button>
                            ) : (
                                <span className="text-xs text-slate-400 italic px-2 py-2 block">No PDF</span>
                            )}
                        </div>
                      </li>
                    ))}
                    {subject.units.length === 0 && (
                      <li className="px-6 py-8 text-center text-sm text-slate-500 italic bg-slate-50/50">
                        No units available for this subject yet.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academics;