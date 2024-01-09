# React - frontend application

## About the project:

The original idea was:

 - Reusing the same component for modal windows.
 - My implementation of the shopping cart (frontend).
 - Everything is based on functional components.

Used the following approaches:

 - Dynamic import using asynchronous functions 
 (allows you to defer rendering of elements while the page is loading) - 
 `CardProduct.js` and `ImageGallery.js` files. 

 - Lightbox images.
 
 - Demonstration of the `useMemo` hook using the example of a price filter - file `Yachts.js`:
 When you click the `useMemo Test` button, the state of the component changes. 
 But, according to the message in the console (*'Calculating filteredYachts...'*), 
 you can see that the filter will be recalculated only when its value changes. 
 This will avoid unnecessary calculations when changing component states.

Work on the project continues.


## Beginning of work: 

Clone the repository by running the command:
 
 $ `git clone https://github.com/ViacheslavJs/modals-react.git`

go to the `modals-react` directory:

 $ `cd modals-react`

installing packages:
 
 ~/modals-react$ `npm install`

launch of the project:

 ~/modals-react$ `npm start`
 
The project will open in a browser tab at [http://localhost:3000/modals-react/](http://localhost:3000/modals-react/)


## Fullstack

Fragment of an online store - `Fullstack.js` file. Works with the Express server!

Main functionality:
 - Product cards
 - Admin panel
 - API: Product information, price, description, preview, exchange rate changes, etc.
 - Database: `JSON`.

Next task:
 - `TODO` - add editing for each user;
 - `TODO` - add data entry validation
 - `TODO` - confirmation when deleting a user
 - `TODO` - implement authorization

Clone the Express repository next to the `modals-react` folder and start the server
[https://github.com/ViacheslavJs/express](https://github.com/ViacheslavJs/express):

 $ `git clone https://github.com/ViacheslavJs/express.git`

 $ `cd express`

 ~/express$ `npm install`

 ~/express$ `npm start`

Also run the React client side in a separate tab - [http://localhost:3000/modals-react/](http://localhost:3000/modals-react/)

Management via admin panel - after starting the server, open in a separate tab [http://localhost:3001/api/admin](http://localhost:3001/api/admin)

Changed data can be seen
after reloading the tab with the client side.
 
### Deployment
(client side)

To deploy this application on **GitHub Pages**, follow the instructions at the link:

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

If you want to create your own repository with this project, don't forget to reinitialize it:
delete the hidden `.git` folder and then do `git init`:

 ~/modals-react$ `git init`
 
Please note that this project already has the `gh-pages` package installed and the commands required 
for deployment are already in the `package.json` file. 
Remember to change the URL in the `package.json` file to match your GitHub Pages page:

 *package.json*:
 
 `"homepage": "https://<yourwebsite>.github.io/<projectname>/"`

 
 
 
