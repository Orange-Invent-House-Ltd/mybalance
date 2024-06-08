# MyBalance
MyBalance offers escrow services for businesses, organizations and government parastatals with our highly secure payment method.

## Clone & Install MyBalance Application
* Clone the repository
```javascript
git clone https://github.com/Orange-Invent-House-Ltd/mybalance.git
```
* Change directory into the the project folder
```javascript
cd mybalance
```
* Install all the dependency
```javascript
pnpm install 
```
* You can go ahead to make changes to the main branch or checkout to your own branch before making changes.
```javascript
git checkout -b name_of_new_branch
```
* Start up the react application 
```react
pnpm run dev
```
* Copy and paste the the hosted local port from your terminal (e.g http://localhost:5173/) to your browser to view the home page.

## File Structure
Just like every other react app we have the node_modules, Public, and the src folders but the src folder is where all the works are been done. Hence, here is how the src folder is been structured.

## The src folder
The src folder contains the following folders.  


### 1. api
The api folder is where we define our base api url in the axios.ts file, the type definition in the types.ts file and the index.tsx for the api calls.
### 2. assets
We have three major folder here fonts for all variation of the Satoshi fonts, icons for all our icons in .svg format, and images the contains all our application images.
### 3. components
The component folder contails all reusable component. 
 - The blogs folder contain component related to the blog post. 
 - The home folder contain reusable components peculiar to the home and other pages aside the user dashbpard.
 - The buyer component contain reusable components peculiar to the buyer pages/dashboard.
 - The seleer folder contain reusable component peculiar to the seller pages/dashboard
 - The reusable component contain components that are reusables across the entire application. Components like button, form input etc.
 - The regex component contain regex logics
### 4. hooks
The folder contain custom hooks for api calls for but mutation and queries.
### 5. pages
This contain all the pages in the application and are divided into four parts
- auth - contains the the general authenticstion pages
- home - contains the home page, and other general pages like the not found pages and the terms and condition page.
- buyer - is divided in the two, the auth for buyer authentication pages and the dashboard for buyer dashboard pages. The index.tsx file is for buyer routing(Navigation)
- seller - is divided in the two, the auth for seller authentication pages and the dashboard for seller dashboard pages. The index.tsx file is for seller routing(Navigation)
### 6. store 
the store folder is for storing global state in zustand. Bassically the user state and the request loading state.
## 7. util
The folder contains utility datas

## The src files
The src folder also contains files like:
* App.tsx - The components where our application resides
* index.css - The css file where our styles are defined and is been used with tailwind css
* main.tsx - The root of our Appliction


