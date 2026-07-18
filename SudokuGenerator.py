import random
class SudokuGenerator():
    def __init__(self):
        self.grid = []
        for x in range(9):
            arr = []
            for y in range(9):
                arr.append(0)
            self.grid.append(arr)
    def isValid(self,board,row,col,num):
        for i in range(9):
            if board[row][i] == num or board[i][col] == num:
                return False
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(3):
            for j in range(3):
                if board[start_row + i][start_col + j] == num:
                    return False
        return True
    def fill_grid(self):
        for row in range(9):
            for col in range(9):
                if self.grid[row][col] == 0:
                    nums = list(range(1,10))
                    random.shuffle(nums)
                    for num in nums:
                        if self.isValid(self.grid,row,col,num):
                            self.grid[row][col] = num
                            if self.fill_grid():
                                return True
                            self.grid[row][col] = 0
                    return False
        return True
    def generate(self):
        self.fill_grid()
        clues = 81
        while clues > 17:
            row,col = random.randint(0,8),random.randint(0,8)
            if self.grid[row][col] != 0:
                self.grid[row][col] = 0
                clues -= 1
        self.visualize(self.grid)
        return self.grid
    def visualize(self,board):
        res = ''
        for x in range(len(board)):
            for y in range(len(board[x])):
                res += '  ' + str(board[x][y]) + '  '
            res += '\n'
        res += '--------------------------------------------'
        print(res)
a = SudokuGenerator()
a.generate()