# SnapLingo

## Overview

SnapLearn revolutionizes language learning by integrating immersive experiences with active learning techniques to learn the language through our surrounding environment. It empowers users to effortlessly learn the target language through the lens of their surroundings. Whether you're exploring foreign lands, navigating daily life, or even teaching toddlers their first words, SnapLearn makes language acquisition an engaging and enjoyable journey.

### Problem

1. **Limited Time for Language Learning:** Many users face time constraints due to busy schedules, making it challenging to dedicate consistent time to language learning.

2. **Lack of Engagement:** Traditional language learning methods may feel dull and uninspiring, leading to low motivation and retention rates among learners.

3. **Difficulty in Applying Learning to Real Life:** Learners often struggle to apply the vocabulary they learn in real-life contexts, hindering their ability to communicate effectively in the target language.

4. **Overwhelmed by Complex Curriculum:** Some learners may feel overwhelmed by the complexity of language learning curriculums, especially if they are beginners or have limited prior exposure to the language.

5. **Challenges in Teaching Young Children:** Parents and caregivers may find it challenging to keep young children engaged and motivated during language learning activities, especially when using traditional teaching methods.


### User Profile

1. **Name:** Juju
   - **Age:** 23
   - **Background:** Juju is a travel enthusiast who works remotely as a digital nomad. She loves immersing herself in different cultures and exploring new destinations whenever she gets the chance. However, she often finds it challenging to learn the local language before her trips due to her busy schedule and limited time for formal language classes. Sarah is looking for a convenient and effective way to learn key phrases and vocabulary, which can be picked up quickly, to enhance her travel experiences.

2. **Name:** Tom
   - **Age:** 36
   - **Background:** Tom is a language learner who recently moved to a new country for work. Although he has been studying the local language for several months, he still struggles to communicate fluently in everyday situations. Tom finds traditional language learning methods tedious and less efficiency in daily usage, so he is looking for a more engaging and interactive approach to improve his language skills while balancing his demanding job and personal life.

3. **Name:** Emily
   - **Age:** 33
   - **Background:** Emily is a mother of two young children, aged 3 and 5. She wants to introduce her kids to a second language at an early age to give them a competitive edge in today's globalized world. However, Emily often feels overwhelmed by the prospect of teaching her children a new language, especially while managing household responsibilities and childcare duties. She is looking for fun and effective language learning activities to integrate into her children's daily lives, allowing them to become familiar with the language's usage environment. Emily wants to find a way to combine her children's interests with language learning, so they can effortlessly grasp new vocabulary and expressions while playing and learning, thus making language learning more efficient and practical.
   
### Features

1. **Immersive Learning Through Images:** SnapLearn allows users to learn vocabulary by snapping pictures of their surroundings. Simply take a photo of objects, scenes, or situations, and SnapLearn identifies relevant vocabulary for you to learn in the target language.

2. **Active Learning Anytime, Anywhere:** Whether you're traveling abroad, at home, or engaging in daily activities, SnapLearn provides an active learning environment whenever you want. Seamlessly integrate language learning into your life without interrupting your routines.

3. **Customized Learning Paths:** SnapLearn offers personalized learning paths tailored to your proficiency level and learning goals. Whether you're a beginner starting your language journey or an advanced learner looking to expand your vocabulary, SnapLearn adapts to your needs.

4. **Interactive Flashcards and Quizzes:** Reinforce your learning with interactive flashcards and quizzes. Test your knowledge, review vocabulary, and track your progress as you advance through the language curriculum.

5. **Child-Friendly Learning:** SnapLearn is perfect for young learners, providing a fun and interactive way for children to discover new words and concepts. Parents can guide their children's language development by capturing everyday moments and turning them into learning opportunities.


## Implementation

### Tech Stack

1. **Frontend:**
   - **React** 
2. **Backend:**
   - **Node.js**
   - **Express.js** 
   - **MongoDB**

3. **Authentication:**
   - **Authentication** 

4. **Image Recognition:**
   - **Google Cloud Vision API** 
   - **Open AI API** 
   
5. **Geo-socialization:**
   - **Google map API** 
   - **Open AI API** 
7. **Vocab Details:**
   - **Merriam-Webster Dictionary API** 
   
8. **Version Control and Collaboration**
   - **Git and GitHub**

### APIs
   - **Google Cloud Vision API** 
   - **Open AI API** 
   - **Google map API** 
   - **Open AI API** 
   - **Merriam-Webster Dictionary API** 

### Sitemap

Login/Signup: User sign up / login
Main: After User login, the most recent **pictures&vocabulaties** that were taken for learning will be shown
Upload: Click on **Learn**, or end of the recent pictures section on the main page, can help users to take a picture for vocabulary learning
Date: All the pictures used for learning sorted by dates
Category: All the pictures used for learning sorted by picture category, which is extracted by image classification algoritom.
Vocab Details: Show the pronunciation, explanation, pictures/generated flash cards of the vocab learnt already. 
Geo Social: Introduce map to show the location that user took the pics, and how many pics they took.

### Mockups
Mockups (only provided mobile):
![alt text](ui/mockup1.png)

![alt text](ui/mockup2.png)
### Data

```js
{
  "Users": [
    {
      "user_id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "password": "hashed_password",
      "pictures": [
        {
          "picture_id": 1,
          "image_url": "https://example.com/image1.jpg",
          "date_taken": "2024-04-16",
          "category": "Category1",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "vocabulary": {
            "vocab_id": 1,
            "pronunciation": "pronunciation1",
            "explanation": "explanation1",
            "flashcards_url": "https://example.com/flashcards1"
          },
          "geosocial": {
            "geosocial_id": 1,
            "latitude": 40.7128,
            "longitude": -74.0060,
            "location_name": "New York City",
          }
        }
      ]
    },
    {
      "user_id": 2,
      "username": "user2",
      "email": "user2@example.com",
      "password": "hashed_password",
      "pictures": [
        {
          "picture_id": 2,
          "image_url": "https://example.com/image2.jpg",
          "date_taken": "2024-04-15",
          "category": "Category2",
          "latitude": 34.0522,
          "longitude": -118.2437,
          "vocabulary": {
            "vocab_id": 2,
            "pronunciation": "pronunciation2",
            "explanation": "explanation2",
            "flashcards_url": "https://example.com/flashcards2"
          },
          "geosocial": {
            "geosocial_id": 2,
            "latitude": 40.7128,
            "longitude": -74.0060,
            "location_name": "Los Angeles",
          }
        }
      ]
    }
  ]
}

```

1. **User Profile:**
    - User ID
    - Username
    - Email
    - Password 
    - Picture 

2. **Language Content:**
    - Language ID
    - Language name
    - Language code
    - Vocabulary lists (array of objects)
        - Word
        - Explaination
        - Translation
        - Speech

3. **Picture Data:**
    - Picture_id
    - Picture_url
    - Date_taken
    - Category
    - vocabulary
    - Geosocial_id
        
4. **Vocab Data:**
    -  Vocab_id
    - pronunciation
    - Explanation
    - Flashcards_url
5. **Geosocial**
    - Geosocial_id
    - Location_name


### Endpoints

1. **User Authentication:**
   - **Endpoints:** `/signup`, `/login`, `/logout`, 
   - **Functionality:** Allows users to create accounts, log in, log out, and reset passwords.
   - **Authentication:** Uses Firebase Authentication or custom authentication middleware.

2. **Language:**
   - **Endpoints:** `/languages`
   - **Functionality:** Provides access to language data, including available languages, vocabulary lists, and lessons.
   - **Data Source:** Makes HTTP requests to the Google Translate API for Translation.

3. **Image Recognition:**
   - **Endpoint:** `/recognizeImage`
   - **Functionality:** Accepts user-uploaded images and performs image recognition using the Google Cloud Vision API to identify objects and extract relevant vocabulary.
   - **Integration:** Makes HTTP requests to the Google Cloud Vision API for image analysis.

4. **User Data Management:**
   - **Endpoints:** `/users/{userId}`, `/users/{userId}/{ImageId}`
   - **Functionality:** Manages user profiles and tracks user content, including completed words, mastered vocabulary, and learning vocabulary.
   - **Data Storage:** Stores user data in a database.

5.  **Content Management:**
   - **Endpoints:** `/content`, `/content/{contentId}`
   - **Functionality:** Provides CRUD operations for managing language content, including vocabulary lists, image recognition data, and related sentences/story data.
   - **Integration:** Supports administrative functions for managing content.


### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

**Duration:** 2 weeks

**Week 1: Planning and Setup**

1. **Preparation: Project Planning and Setup**
   - Define project requirements and goals
   - Create user stories and prioritize features
   - Set up version control (e.g., Git) and project repository

2. **Day 1-2: Frontend and Backend Setup**
   - Set up Google Cloud Platform (GCP) account
   - Enable Translation API and obtain API credentials
   - Set up backend environment (Node.js, Express.js)
   - Implement user authentication API endpoints (signup, login, logout)
   - Implement database schema for user profiles
   - Set up React js environment
   - Initialize project structure and dependencies
   - Implement basic navigation and layout components

4. **Day 3-4: Image Recognition Integration**
   - Integrate Google Cloud Vision API for image recognition
   - Implement API endpoint for analyzing user-uploaded images
   - Store image recognition data in the database
   
5. **Day 5: Language Content Management**
   - Design database schema for language content (languages, vocabulary)
   - Implement API endpoints for managing language content
   
6. **Day 6-7: set up cloud Database**
   
**Week 2: Development and Testing**

6. **Day 8: Testing and Bug Fixing**
   - Conduct unit tests for backend APIs
   - Perform integration testing for frontend and backend interactions
   - Identify and fix any bugs or issues
7. **Day 9-10: Agile for Image Recognition API**
    - Add the explaination of the target with dictionary API (like Merriam-Webster API)
    - Add the generated flesh card contents for the targets
    - Add the searching category (photo/word) of vocabulary list
8. **Day 11: Testing and Bug Fixing**

**Day 12-13: Deployment and Documentation**
   - Deploy backend to cloud hosting (e.g., AWS, Google Cloud)
   - Write documentation for setup, usage, and maintenance of the application

**Post-Sprint: Ongoing Maintenance and Iteration**

- Monitor application performance and user feedback
- Address any issues or feature requests that arise
- Plan for future sprints to implement additional features and improvements

## Nice-to-haves
1. Basic requirements:
- Login/out, Authentication
    - Errors
- Select target language
- Upload images
- Recognize images
- Save and retrieve images and vocabulary data
- Vocab details
- Images sort by dates

2. Further requirements:
- Flesh card generation
- Vocabs sort by ategory
- Geo info sharing
- Vocab "Like" list


