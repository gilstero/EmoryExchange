# **Emory Exchange**  
*Connecting Students, Empowering Community*  

---

## **About Emory Exchange**  

**Emory Exchange** is a dynamic platform designed to bring together students across Emory University's campuses. Whether you're looking for tutoring, a place to buy/sell items, or a way to share services, **Emory Exchange** provides a **centralized, secure, and community-focused space** to make campus life more efficient and connected.  

---

## **Table of Contents**  
- [Features](#features)  
- [Goals and Mission](#goals-and-mission)  
- [How It Works](#how-it-works)  
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies-and-dependency-management)
- [Future Development Plans](#future-development-plans)  
- [Contact](#contact)  

---

## **Features**  

### **Tutoring Services**  
- Students can sign up as tutors or seek tutoring help beyond what Emory University provides.  
- Verified tutors can offer their services, either paid or pro bono.  

### **Marketplace Exchange**  
- Buy, sell, or trade items exclusively within the Emory community.  
- Categories include textbooks, furniture, electronics, and more.  

### **Service Sharing**  
- Post and find services such as ridesharing, tech assistance, and more.  
- Students can share skills (e.g., photography, graphic design) or request help with tasks.  

---

## **Goals and Mission**  

Emory Exchange strives to:  
✅ **Foster collaboration** by making it easier for students to find and offer help.  
✅ **Build trust** within the Emory community through secure and verified exchanges.  
✅ **Encourage skill-sharing** to enrich students’ academic and personal lives.  
✅ **Reduce waste** by promoting the reuse and resale of items.  

---

## **How It Works**  

1. **Account Creation**  
   - Sign up using your Emory University email to verify community membership.  
   - Create a profile with an optional profile picture.  

2. **Browsing and Posting**  
   - Search for tutoring services, marketplace items, or offered/requested services.  
   - Post your own listings using an intuitive interface.  

3. **Messaging and Coordination**  
   - Use the in-app messaging system to negotiate details, schedule meetings, or ask questions.  

4. **Completion and Feedback**  
   - Confirm completed services or transactions.  
   - Leave feedback to maintain quality and reliability.  

---

## **Dependencies and Dependency Management**  

- **Required dependencies**: For the backend app, required dependencies can be found in the requirements.txt file.
- Creating a virtual environment to manage these dependencies is recommended. CD to the root directory of the project (cd EmoryExchange) and follow these instructions:
- Run python3 -m venv \<myenvpath\> in your terminal (example envpath: .venv)
- Make sure your working directory contains your venv file and then run one of the following:
- Mac: run source \<myenvpath\>/bin/activate
- Windows: run \<myenvpath\>\Scripts\activate
- Now, install all of the dependencies in the requirements.txt file by running pip install -r /path/to/requirements.txt
- Finally run python manage.py makemigrations -\> python manage.py migrate
- To run the server, python manage.py runserver

---

## **Frontend**

The frontend is a React and TypeScript application that is built out with Vite. It handles all features of the app related to accessibility. The src folder contains the majority creation of the frontend. In it exists a components folder with UI elements such as the navigation bar, footer, and individual listing cards. The pages folder holds full page views like Login, Signup, Account, and Marketplace, which show up based on the current URL. Routing is managed with React Router and stylistic design choices are handled with Tailwind CSS. Vite ensures fast development and optimized build performance.

If one desires to run the frontend and see the current state of the website, cd frontend in your terminal and install the following packages: 
'npm i --save @fortawesome/fontawesome-svg-core',
'npm install --save @fortawesome/free-solid-svg-icons',
'npm install --save @fortawesome/react-fontawesome'.
Then, run 'npm install', then 'npm run dev' in your terminal. Then navigate to the 'http://localhost:5173/' link and the UI interface should appear. The backend also needs to be running for the functionality of the frontend to work. From there, the function of the app is very self-explanatory, as users are able to register, log in, log out, navigate the marketplace, message with other users, and create and delete listings. 

---

## **Backend**

The backend is a Django REST framework application that creates and maintains the API with endpoints called by the frontend app. The backend is located in the cs370/ folder. It includes basic settings, routing, and deployment entry points (asgi.py, wsgi.py). The members/ app contains the core functionality of the backend. Within it is important files such as models.py which defines the database schema. The database holds user, listing, transaction, token, and message tables to store important imformation. views.py handles API logic to pull information from the database, serializer.py converts models to JSON form, and urls.py is used to route each page. It also includes migrations/ for database versioning, templates/ for HTML rendering, and static/ for files such as images, CSS, and JS. The backend connects to a local SQLite database (db.sqlite3). When someone interacting with the UI interacts with a feature such as sign up, log in, view profiles, and interact with listings, the data goes straight to the database where it is stored. 

If one desires to run the backend, cd cs370 and run 'python manage.py runserver' in your terminal. You may need to apply migrations if you've made changes to the database (python manage.py makemigrations -\> python manage.py migrate). Then navigate to the 'http://127.0.0.1:8000/' link to see the current state of the backend. You can also run the command, then input different URL's from url.py to test functionalities in Postman.

---

## **Technologies Used**  

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Python/Django  
- **Database**: Django SQLite Database 

---

## **Future Development Plans**  

- **Mobile App**: Develop a native mobile app for easier access on the go.  
- **Advanced Search**: Implement location, price range, and availability filters.  

---

## **Contact**  

If you have questions or suggestions, feel free to reach out to the team!  

---
