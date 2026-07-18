# Sudoku Solver

A small Sudoku project with two main components:

- `python/` — a Python-based Sudoku solver and Sudoku puzzle generator
- `sudoku/` — a React + Vite frontend app for generating, solving, and validating Sudoku boards

## Repository Structure

- `python/Sudoku.py` - a backtracking Sudoku solver implementation
- `python/SudokuGenerator.py` - generates a full Sudoku board and removes clues to create a puzzle
- `sudoku/` - React + Vite Sudoku UI application

## Python scripts

### Run the solver

```bash
python python/Sudoku.py
```

This script uses a backtracking algorithm to solve the hard-coded Sudoku board and prints the solved board to the console.

### Run the generator

```bash
python python/SudokuGenerator.py
```

This script generates a full Sudoku solution board, removes clues until a minimal puzzle remains, and prints the board to the console.

## React app

The frontend app is located in `sudoku/` and uses React, Vite, Tailwind CSS, and a backtracking solver implemented in JavaScript.

### Install dependencies

```bash
cd sudoku
npm install
```

### Start development server

```bash
npm run dev
```

Open the local Vite URL shown in the terminal to view the Sudoku app.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Features

- Generate a valid Sudoku board
- Solve the current Sudoku board using backtracking
- Validate a full Sudoku board
- Edit cells directly in the grid

## Notes

- The frontend Sudoku implementation is self-contained inside `sudoku/src/App.jsx`.
- The Python scripts are standalone and require only a standard Python runtime.
- `sudoku/` is tracked as a normal directory in this repository, not as a git submodule.

## License

This repository does not include a license file. Add one if you want to share or open-source this project.
