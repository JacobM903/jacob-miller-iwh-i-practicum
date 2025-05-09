const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
    const pokemon = 'https://api.hubspot.com/crm/v3/objects/2-43113054?properties=pokedex_number&properties=name&properties=region';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pokemon, { headers });
        const found_pokemon = resp.data.results;
        res.render('homepage', { title: 'Homepage | Custom Object APIs', pokemon: found_pokemon });
    } catch (error) {
        console.error(error);
    }
});

// ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req, res) => {

    try {
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
    } catch (error) {
        console.error(error);
    }
});

// ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {
    const create = {
        properties: {
            "pokedex_number": req.body.pokedex_number,
            "name": req.body.name,
            "region": req.body.region,
        }
    }

    const email = req.query.email;
    const createPokemon = `https://api.hubapi.com/crm/v3/objects/2-43113054`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(createPokemon, create, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));