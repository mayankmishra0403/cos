import React, { useState } from 'react';
import { AKTU_SUBJECTS } from '../constants';
import { Subject, Unit } from '../types';
import { FileText, Download, ChevronRight, ChevronDown } from 'lucide-react';

const Academics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const toggleSubject = (id: string) => {
    setSelectedSubject(selectedSubject === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">Academic Resources</h1>
          <p className="mt-4 text-lg text-slate-600">
            Curated notes and syllabus for AKTU Computer Science Engineering.
          </p>
        </div>

        <div className="grid gap-6">
          {AKTU_SUBJECTS.map((subject: Subject) => (
            <div 
              key={subject.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200"
            >
              {/* Subject Header */}
              <div 
                className="p-6 flex items-center justify-between cursor-pointer bg-white hover:bg-slate-50"
                onClick={() => toggleSubject(subject.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700 font-bold text-sm">
                    {subject.code}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">{subject.name}</h3>
                    <p className="text-sm text-slate-500">Semester {subject.semester} • {subject.units.length} Units</p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {selectedSubject === subject.id ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>

              {/* Units List (Accordion Body) */}
              {selectedSubject === subject.id && (
                <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-1">
                    {subject.units.map((unit: Unit) => (
                      <div key={unit.id} className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h4 className="font-semibold text-slate-800">Unit {unit.id}: {unit.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{unit.description}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition">
                            <FileText size={16} className="mr-2" /> Read
                          </button>
                          <button 
                            className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Downloading notes for ${subject.name} - Unit ${unit.id}`);
                            }}
                          >
                            <Download size={16} className="mr-2" /> PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academics;