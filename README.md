# Pokedex

This is a final project for 2nd Module of Devstock Academy course.

This app allows you to browse pokemons served by API (https://pokeapi.co/). You can save your favorite pokemons, train them in arena, or add your own pokemons.

## How to use

First, clone the repository and go to proper directory:

```
git clone https://github.com/kozlofski/pokedex
cd pokedex
```

...and then run application

```
npm run server
```

It will be most likely served at http://localhost:5173/ . This script runs JSON-server in paralel at port 3000.

## Functionalities

### Homescreen

You are able to browse pokemons fetched from API. By default, only first 150 pokemons are fetched. You can change that by editing `constants.js` file in `src/` directory. You can click any pokemon, to see a modal. You can reach `home` page by clicking Pokemon logo, or clicking `Home` button in mobile menu.

You can search pokemon by name, by using input below the navbar.

If not logged in, there are only two options available, Sign-up and Log-In.

Currently, user interface is only in Polish

### Sign-Up (Rejestracja)

If you register, you will be able to do much more than browsing (see below). Fill in registration form. You must provide a unique username, and a password consisting of a big letter, special character, and a number (8 characters minimum).

### Log-In (Logowanie)

After providing proper login data, you will gain access to aditional subpages. Login is remembered in local storage, so you don't have to log-in after closing the web browser, or after page refreshing. Password is quite-securely hashed in local storage.

### Favorites (Ulubione)

This browser allows you to browse favorite pokemons. To match a pokemon as a favorite, click on a pokemon's card (on `home` browser) and after a modal is shown, click heart icon. Click it again to remove pokemon from favorites.

### Arena

You can arrange battles between pokemons. To pick a pokemon for a fight, click a pokemon's card on `home` or `favorites` browser and then click 'arena' icon. It will show how many pokemons are currently chosen for a fight (0/2, 1/2, 2/2). When arena is full, in order to choose another pokemon, you have to unpick one of the chosen pokemons, either by unclicking it's arena icon, or by clicking `X` on it's card on `arena` view. Click 'Fight' (Walcz) button to begin battle. After the battle, pokemons' statistics are updated, and a dark field showing wins and losses is shown on pokemon's card.

### Ranking and Edit (Edycja)

Those are similar subpages. You can browse pokemons and sort them by parameters and battle statistics by clicking desired parameter.

On `edit` view you can click `Stwórz własnego pokemona` (create your own pokemon) and create a pokemon with any name, ability and parameters. It's wins and losses will both be set to 0. You have to choose a picture (only unused pictures will be available - unavailable ones are greyed out). Parameters (weight, height, base experience) must be natural numbers.

Furthemore, on `edit` view, you have an option to edit every pokemon, by clicking `Edytuj` (edit) button on it's right.

### Log-out (wyloguj)

After logging out you will be returned to homescreen

### Theme changer

On top of the screen you have option to change between light and dark mode

Enjoy!

kozlofski
