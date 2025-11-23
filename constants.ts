import { Subject, Problem, Difficulty } from './types';

export const AKTU_SUBJECTS: Subject[] = [
  {
    id: 'os',
    name: 'Operating Systems',
    code: 'KCS-401',
    semester: 4,
    units: [
      { id: 1, title: 'Introduction to OS', description: 'Kernel, Shell, System Calls, Types of OS' },
      { id: 2, title: 'Process Management', description: 'Process States, Scheduling Algorithms, Threads' },
      { id: 3, title: 'Process Synchronization', description: 'Semaphores, Mutex, Deadlock Handling' },
      { id: 4, title: 'Memory Management', description: 'Paging, Segmentation, Virtual Memory' },
      { id: 5, title: 'File System & Disk', description: 'Disk Scheduling, File Allocation Methods' },
    ]
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    code: 'KCS-301',
    semester: 3,
    units: [
      { id: 1, title: 'Arrays & Linked Lists', description: 'Traversing, Insertion, Deletion, Doubly Linked Lists' },
      { id: 2, title: 'Stacks & Queues', description: 'Infix to Postfix, Circular Queue, Priority Queue' },
      { id: 3, title: 'Searching & Sorting', description: 'Binary Search, Quick Sort, Merge Sort, Hashing' },
      { id: 4, title: 'Graphs', description: 'BFS, DFS, Spanning Trees, Shortest Path Algorithms' },
      { id: 5, title: 'Trees', description: 'Binary Trees, BST, AVL Trees, B-Trees' },
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'KCS-501',
    semester: 5,
    units: [
      { id: 1, title: 'Intro & ER Model', description: 'Database Architecture, ER Diagrams' },
      { id: 2, title: 'Relational Model', description: 'SQL, Keys, Relational Algebra' },
      { id: 3, title: 'Normalization', description: '1NF, 2NF, 3NF, BCNF, Functional Dependency' },
      { id: 4, title: 'Transaction Processing', description: 'ACID Properties, Serializability' },
      { id: 5, title: 'Concurrency Control', description: 'Locking Protocols, Timestamp Ordering' },
    ]
  }
];

export const PLACEMENT_PROBLEMS: Problem[] = [
  { id: '1', title: 'Two Sum', difficulty: Difficulty.EASY, companies: ['Google', 'Amazon'], topic: 'Arrays', link: '#' },
  { id: '2', title: 'Reverse Linked List', difficulty: Difficulty.EASY, companies: ['Microsoft', 'Adobe'], topic: 'Linked List', link: '#' },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: Difficulty.MEDIUM, companies: ['Google', 'Meta'], topic: 'Strings', link: '#' },
  { id: '4', title: 'Binary Tree Level Order Traversal', difficulty: Difficulty.MEDIUM, companies: ['Amazon', 'Microsoft'], topic: 'Trees', link: '#' },
  { id: '5', title: 'LRU Cache', difficulty: Difficulty.HARD, companies: ['Google', 'Netflix'], topic: 'Design', link: '#' },
  { id: '6', title: 'Merge Intervals', difficulty: Difficulty.MEDIUM, companies: ['Google', 'Uber'], topic: 'Arrays', link: '#' },
  { id: '7', title: 'Valid Parentheses', difficulty: Difficulty.EASY, companies: ['Amazon', 'Salesforce'], topic: 'Stack', link: '#' },
  { id: '8', title: 'Best Time to Buy and Sell Stock', difficulty: Difficulty.EASY, companies: ['Goldman Sachs', 'Morgan Stanley'], topic: 'Arrays', link: '#' },
];

export const SYSTEM_INSTRUCTION = `You are the "Shiksha AI Tutor", a virtual teacher for the "Code of Shiksha" platform. 
Your goal is to help Computer Science students with their AKTU university exams and placement preparation (Coding & DSA).
- Explain concepts simply with real-life examples.
- When asked about coding, provide clean C++ or Java code (standard for placements).
- If asked about AKTU syllabus, focus on the core units like OS, DBMS, and DSA.
- Be encouraging and structured.
`;