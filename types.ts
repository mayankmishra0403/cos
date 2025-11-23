
import React from 'react';

export interface Unit {
  id: number | string;
  title: string;
  description: string;
  pdfFileId?: string; // ID of the file in Appwrite Storage
}

export interface Subject {
  id: string;
  name: string;
  code: string; // e.g., KCS-401
  semester: number;
  units: Unit[];
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  companies: string[];
  topic: string;
  link: string; // Mock link
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
