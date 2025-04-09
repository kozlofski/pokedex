## Technical details

### Fetching pokemons data

There are two types of fetching strategy implied by the fact, that API serves pokemon's details in separate responses.

#### PokemonBrowser

There is an option to fetch all pokemons, but that response consists of names and links only (let's call it linksToPokemons). In pokemon browser we don't fetch all pokemons' detailed data instantly - to speed up the loading process. We fetch only those details, that are needed to display a few PokemonCards. In browser we fetch linksToPokemons. We could omit that and fetch separate pokemons in PokemonCard component (because links to them are known in API documentation), but we need to merge API data with user data - created pokemons and modified ones. It should be done before filtering and pagination, so merging those data is done at useFetchPokemons. The resulting data structure is an array of pokemons' objects, some of them (fetched from API) have name and url, the others (fetched from JSON server) have complete data (except url).That may seem like data inconsistency, but only a little. In pokemonCard we fetch pokemons from API if a pokemon has got url property. Otherwise, no fetch is done and pokemon details are ready because of merging done earlier.

#### PokemonRanking

Here we have to get all available data at once.
