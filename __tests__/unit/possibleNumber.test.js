const { getPossibleNumber, getOnePossibleNumber } = require('../../src/node_modules/@sudoku/solver'); // 将 import 改为 require
const { SUDOKU_SIZE } = require('../../src/node_modules/@sudoku/constants');

describe('Possible Number Functionality', () => {
  test('应该返回正确的可能数字', () => {
    // 假设一个简单的数独布局
    const sudokuGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    // 检查特定单元格的可能值
    const row = 0, col = 2;
    const cellIndex = row * SUDOKU_SIZE + col;
    const possibleForEmptyCell = getOnePossibleNumber(sudokuGrid, cellIndex); // 第1行第3列的空单元格
    expect(possibleForEmptyCell).toEqual([1, 2, 4]);
    
    // 检查已填充单元格
    const row0 = 0, col0 = 0;
    const cellIndex0 = row0 * SUDOKU_SIZE + col0;
    const possibleForFilledCell = getOnePossibleNumber(sudokuGrid, cellIndex0); // 第1行第1列已有数字5
    expect(possibleForFilledCell).toEqual([]);
  });

  test('当所有数字都已使用时应该返回空数组', () => {
    // 假设一行中只剩一个空格
    const sudokuGrid = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 0, 0, 0, 0, 0, 0, 0, 0], // 其他行不重要
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    
    // 测试完整的 grid 上已填充位置是否返回空数组
    const possibleNumbers = getPossibleNumber(sudokuGrid);
    
    // 第一行第一个位置(5)，索引是 0
    expect(possibleNumbers[0]).toEqual([]);
    
    // 第一行最后一个位置(2)，索引是 8
    expect(possibleNumbers[8]).toEqual([]);
  });
  
  test('应该为整个网格返回可能的数字', () => {
    const sudokuGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    const possibleNumbers = getPossibleNumber(sudokuGrid);
    
    // 验证函数返回了正确长度的数组
    expect(possibleNumbers.length).toBe(81);
  });
});