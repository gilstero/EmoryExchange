# **Emory Exchange**

**Emory Exchange** is a platform designed to foster connections among students across Emory University's campuses. By providing a centralized space for tutoring, marketplace exchanges, and service sharing, the platform enhances collaboration and resource accessibility, making campus life more efficient and community-focused.

---

## **Table of Contents**
1. [Features](#features)
2. [Goals and Mission](#goals-and-mission)
3. [How It Works](#how-it-works)
4. [Technologies Used](#technologies-used)
5. [Setup and Installation](#setup-and-installation)
6. [Future Development Plans](#future-development-plans)
7. [Contributing](#contributing)
8. [Contact](#contact)

---

## **Features**

1. **Tutoring Services**:
   - Students can sign up as tutors or seek tutoring help in specific subjects.
   - A scheduling system allows easy arrangement of one-on-one or group sessions.
   - Reviews and ratings help identify top tutors.

2. **Marketplace Exchange**:
   - Buy, sell, or trade items within the Emory community.
   - Categories include textbooks, furniture, electronics, and more.
   - Secure messaging and easy payment coordination.

3. **Service Sharing**:
   - Post and find services such as ridesharing, tech assistance, or event collaboration.
   - Students can share skills (e.g., photography, graphic design) or request help.

4. **Community Building**:
   - User profiles display interests and academic focuses, fostering meaningful connections.
   - A dedicated news feed highlights featured listings and active tutors/services.

---

## **Goals and Mission**

Emory Exchange strives to:
- **Foster collaboration** by making it easier for students to find and offer help.
- **Build trust** within the Emory community by ensuring safe and secure exchanges.
- **Encourage skill-sharing** to enrich students’ academic and personal lives.
- **Reduce waste** by promoting the reuse and resale of items.

---

## **How It Works**

1. **Account Creation**:
   - Sign up using your Emory University email to verify community membership.
   - Create a profile with optional fields like major, interests, and skills.

2. **Browsing and Posting**:
   - Search for tutoring services, items in the marketplace, or offered/requested services.
   - Post your own listings using an intuitive interface.

3. **Messaging and Coordination**:
   - Use the in-app messaging system to negotiate details, schedule meetings, or ask questions.
   - Notifications ensure you don’t miss any updates.

4. **Completion and Feedback**:
   - Confirm service completions or transactions.
   - Leave feedback to maintain a high standard of quality and reliability.

---

## **Technologies Used**

- **Frontend**: React.js (for responsive and dynamic user interfaces)
- **Backend**: Node.js with Express.js (API handling and server-side logic)
- **Database**: MongoDB (for user data, listings, and messages)
- **Authentication**: OAuth (using Emory University's email system)
- **Styling**: Tailwind CSS (for a modern and cohesive design)
- **Hosting**: AWS or Heroku (to ensure scalability and reliability)

---

## **Setup and Installation**

To set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/emory-exchange.git
   ```
2. **Install Dependencies**:
   Navigate to the project folder and run:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   OAUTH_CLIENT_ID=<client-id-for-oauth>
   OAUTH_CLIENT_SECRET=<client-secret-for-oauth>
   ```
4. **Run the Development Server**:
   ```bash
   npm start
   ```
5. **Access the Application**:
   Open your browser and go to `http://localhost:3000`.

---

## **Future Development Plans**

- **Mobile App**: Develop a native mobile app for easier access on the go.
- **Expanded Services**: Add features like event ticket trading and campus job postings.
- **Advanced Search**: Implement filters for location, price range, and availability.
- **Gamification**: Introduce badges and rewards for frequent users and top contributors.
- **AI Recommendations**: Use machine learning to recommend services or items based on user activity.

---

## **Contributing**

We welcome contributions to make Emory Exchange even better! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your branch:
   ```bash
   git commit -m "Add your message here"
   git push origin feature/your-feature-name
   ```
4. Open a pull request.

Please follow the [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed guidelines.

---

## **Contact**

If you have questions or suggestions, feel free to reach out:
- **Project Lead**: Olin Gilster
- **Email**: ogilste@emory.edu
- **GitHub**: [Your GitHub Profile](https://github.com/username)

---

Let me know if you'd like further refinements!
