// src/utils/dataGenerator.ts

import { DataRow } from '@/types';

export const generateSampleData = (): DataRow[] => {
  const data: DataRow[] = [];
  const baseNumbers = [34, 888, 446, 6, 23, 5664, 12, 45, 78, 91, 234, 567, 890, 123, 456, 789];
  
  // Generate more data for testing
  for (let i = 0; i < 500; i++) {
    const num = baseNumbers[i % baseNumbers.length] + i;
    data.push({
      number: num,
      mod3: num % 3,
      mod4: num % 4,
      mod5: num % 5,
      mod6: num % 6,
    });
  }
  
  return data;
};
