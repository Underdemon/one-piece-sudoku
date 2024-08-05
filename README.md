<div align="center">

# One Piece Sudoku
![react_badge]
![python_badge]
![license]

A One Piece game inspired by [pokedoku]

Find it [here](https://one-piece-sudoku.vercel.app/)

## Table of Contents
### [Description](#description)
### [Requirements](#requirements)
### [Usage](#usage)
### [Roadmap](#roadmap)
### [License](#license)
### [Contact](#contact)

</div>

## Description
A sudoku-like game where you try to guess the most elusive character that satisfies a random pair of attributes

Also contains a scraper used to get information from this [list of canon characters]

## Requirements
- [Node]
- [npm] (normally comes with Node.js)
- [Python]
- [pip] (normally comes with Python)

## Usage
If you want to work on the code yourself, you can clone the repo:

```sh
git clone https://github.com/Underdemon/one-piece-sudoku
```

### React App
To run the react app, you can install the npm dependencies

```sh
npm i
```

and run the website locally

```sh
npm run dev
```

This will run the website on http://localhost:8000/

### Python Scraper
Enter the scraper directory

```sh
cd scraper
```

Create your virtual environment

```sh
python -m venv <environment_name>
```

Activate the virtual environment

Linux:
```sh
source venv/bin/activate
```

Windows:
```sh
venv\Scripts\activate
```

Install the dependencies in requirements.txt

```sh
pip install -r requirements.txt
```

Run the python file:

```sh
python main.py
```

_Tip: [follow this StackOverflow reply to find out how to automatically create a requirements.txt file](https://stackoverflow.com/a/69081814)_

## Roadmap
- [x] Scrape data from wiki
- [x] Get logic for grid generation working
- [ ] Give website a proper colour scheme
- [ ] Add point scoring system
- [ ] Add ID to grids to allow for users to share different puzzles
- [ ] Remove affiliations that only have a few characters associated to them
- [ ] Make it easier to see the characters after a correct guess

### Bugs
- [ ] Fix guessbar locking the grid on 9 guesses rather than 10
- [ ] Remove null attributes (eg: Origin: None)
- [ ] Clean bounty text in code (eg: look at attribs.json line 423)

## License

This project is licensed under [GPLv3].

Copyright &copy; 2024, Rayan Khan

## Contact
[![email]](mailto:rayanakhan05@gmail.com)
[![discord]](https://discordapp.com/users/764563876867604582)


[pokedoku]: https://pokedoku.com/
[list of canon characters]: https://onepiece.fandom.com/wiki/List_of_Canon_Characters

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[python]: https://www.python.org/
[pip]: https://pip.pypa.io/en/stable/installation/

[GPLv3]: https://www.gnu.org/licenses/gpl-3.0.en.html

[react_badge]: https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge

[python_badge]: https://img.shields.io/badge/-python-3776AB?logo=python&logoColor=white&style=for-the-badge

[license]: https://img.shields.io/github/license/underdemon/one-piece-sudoku?label=license&style=for-the-badge

[email]: https://img.shields.io/badge/-Email-EA4335?logo=gmail&logoColor=white&style=for-the-badge

[discord]: https://img.shields.io/badge/contact-me-blue?logo=discord&logoColor=white&style=for-the-badge&labelColor=45FFBF&color=78FFD0