
import React from 'react';

export interface User {
  $id: string;
  name: string;
  email: string;
  prefs?: Record<string, any>;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  pdfLink?: string; // Added for PDF support
}

// Extended for DB storage where units might be stored as JSON string
export interface Subject {
  $id?: string;
  id?: string;
  name: string;
  code: string; 
  semester: number;
  units: Unit[] | string; 
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface Problem {
  $id?: string;
  id?: string;
  title: string;
  difficulty: Difficulty;
  companies: string[];
  topic: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}
