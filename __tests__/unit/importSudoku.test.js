import { parseSudokuFromUrl} from '../../src/node_modules/@sudoku/game';

describe('Import Sudoku from URL', () => {
  test('应该正确解析SudokuWiki URL', () => {
    // SudokuWiki格式的URL
    const wikiUrl = "https://www.sudokuwiki.org/sudoku.htm?bd=300967001040302080020000070070000090000873000500010003004705100905000207800621004";
    
    const expected = [
      [3, 0, 0, 9, 6, 7, 0, 0, 1],
      [0, 4, 0, 3, 0, 2, 0, 8, 0],
      [0, 2, 0, 0, 0, 0, 0, 7, 0],
      [0, 7, 0, 0, 0, 0, 0, 9, 0],
      [0, 0, 0, 8, 7, 3, 0, 0, 0],
      [5, 0, 0, 0, 1, 0, 0, 0, 3],
      [0, 0, 4, 7, 0, 5, 1, 0, 0],
      [9, 0, 5, 0, 0, 0, 2, 0, 7],
      [8, 0, 0, 6, 2, 1, 0, 0, 4]
    ];
    
    const result = parseSudokuFromUrl(wikiUrl);
    expect(result).toEqual(expected);
  });
  
  test('应该处理不包含bd参数的URL', () => {
    const invalidUrl = "https://www.sudokuwiki.org/sudoku.htm";
    expect(() => {
        try {
            parseSudokuFromUrl(invalidUrl);
        } catch (err) {
            expect(err.message).toBe("Failed to construct 'URL': Invalid URL");
            throw err; 
        }
    }
        ).toThrow("Failed to construct 'URL': Invalid URL");
  });
  
  test('应该处理包含不完整bd参数的URL', () => {
    // bd参数不足81个字符
    const shortUrl = "https://www.sudokuwiki.org/sudoku.htm?bd=12345";
    expect(() => {
        try {
            parseSudokuFromUrl(invalidUrl);
        } catch (err) {
            
            expect(err.message).toBe("Failed to construct 'URL': Invalid URL");
            throw err; 
        }
    }
        ).toThrow("Failed to construct 'URL': Invalid URL");
  });
  
  test('应该处理包含无效字符的bd参数', () => {
    // bd参数包含字母
    const invalidUrl = "https://www.sudokuwiki.org/sudoku.htm?bd=30096700104030208002000007007000009000087300A500010003004705100905000207800621004";
    expect(() => {
        try {
            parseSudokuFromUrl(invalidUrl);
        } catch (err) {
            
            expect(err.message).toBe("Failed to construct 'URL': Invalid URL");
            throw err; 
        }
    }
        ).toThrow("Failed to construct 'URL': Invalid URL");
  });
  
  test('应该处理其他格式的URL', () => {
    // 考虑其他来源的URL格式
    const otherUrl = "https://example.com/sudoku?bd=300967001040302080020000070070000090000873000500010003004705100905000207800621004";
    
    const expected = [
      [3, 0, 0, 9, 6, 7, 0, 0, 1],
      [0, 4, 0, 3, 0, 2, 0, 8, 0],
      [0, 2, 0, 0, 0, 0, 0, 7, 0],
      [0, 7, 0, 0, 0, 0, 0, 9, 0],
      [0, 0, 0, 8, 7, 3, 0, 0, 0],
      [5, 0, 0, 0, 1, 0, 0, 0, 3],
      [0, 0, 4, 7, 0, 5, 1, 0, 0],
      [9, 0, 5, 0, 0, 0, 2, 0, 7],
      [8, 0, 0, 6, 2, 1, 0, 0, 4]
    ];
    
    const result = parseSudokuFromUrl(otherUrl);
    expect(result).toEqual(expected);
  });
  
  test('应该处理bd参数为0的情况', () => {
    const zeroUrl = "https://www.sudokuwiki.org/sudoku.htm?bd=000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    
    const expected = Array(9).fill().map(() => Array(9).fill(0));
    
    const result = parseSudokuFromUrl(zeroUrl);
    expect(result).toEqual(expected);
  });
});
