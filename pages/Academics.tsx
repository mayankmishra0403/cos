
import React, { useState, useEffect } from 'react';
import { databases, appwriteConfig } from '../lib/appwrite';
import { AKTU_SUBJECTS } from '../constants';
import { Subject, Unit } from '../types';
import { FileText, Download, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';

const Academics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.collectionIdAcademics
        );
        
        const dbSubjects = response.documents.map((doc: any) => ({
          ...doc,
          id: doc.$id,
          units: typeof doc.units === 'string' ? JSON.parse(doc.units) : doc.units
        }));

        if (dbSubjects.length > 0) {
          setSubjects(dbSubjects);
        } else {
          setSubjects(AKTU_SUBJECTS);
        }
      } catch (error) {
        console.error("Failed to fetch from DB, using fallback", error);
        setSubjects(AKTU_SUBJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const toggleSubject = (id: string) => {
    setSelectedSubject(selectedSubject === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Academic Resources</h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Comprehensive notes, syllabus breakdowns, and revision materials tailored for AKTU.
          </p>
        </div>

        <div className="grid gap-6">
          {subjects.map((subject) => {
            const subjectId = subject.id || subject.$id || 'unknown';
            const isExpanded = selectedSubject === subjectId;
            
            return (
              <div 
                key={subjectId} 
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${isExpanded ? 'border-indigo-200 ring-4 ring-indigo-50/50' : 'border-slate-200 hover:border-indigo-200'}`}
              >
                {/* Subject Header */}
                <div 
                  className="p-6 md:p-8 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSubject(subjectId)}
                >
                  <div className="flex items-center space-x-6">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors ${isExpanded ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-600'}`}>
                      {subject.code.split('-')[1] || 'SUB'}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold transition-colors ${isExpanded ? 'text-indigo-900' : 'text-slate-800'}`}>
                        {subject.name}
                      </h3>
                      <div className="flex items-center mt-1 space-x-3 text-sm font-medium text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{subject.code}</span>
                        <span>•</span>
                        <span>Semester {subject.semester}</span>
                        <span>•</span>
                        <span>{(subject.units as Unit[]).length} Units</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-indigo-500' : ''}`}>
                    <ChevronDown size={24} />
                  </div>
                </div>

                {/* Units List */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8 animate-in slide-in-from-top-4 duration-200">
                    <div className="grid gap-4">
                      {(subject.units as Unit[]).map((unit: Unit, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between group">
                          <div className="mb-4 md:mb-0">
                            <h4 className="font-bold text-slate-800 flex items-center">
                              <span className="text-indigo-500 mr-2">Unit {unit.id || idx + 1}:</span> 
                              {unit.title}
                            </h4>
                            <p className="text-sm text-slate-500 mt-1 max-w-2xl">{unit.description}</p>
                          </div>
                          <div className="flex space-x-3">
                            <button className="flex items-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                              <FileText size={16} className="mr-2" /> View Notes
                            </button>
                            {unit.pdfLink && (
                              <a 
                                href={unit.pdfLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm"
                              >
                                <Download size={16} className="mr-2" /> Download
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Academics;
