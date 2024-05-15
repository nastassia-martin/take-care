# TakeCare Project

## Introduction

TakeCare is a web application designed to streamline and enhance communication between families and childcare providers. Developed with a personal touch for my sister, a childminder, this project not only addresses her specific needs but also serves as a foundational step in my professional development journey. It aims to provide a centralized, intuitive platform for managing childcare communications, distinguishing itself in its simplicity and user-focused design.

## Features

- **User Profile Management**: Allows both parents and childcare providers to create and manage their profiles, ensuring accurate and up-to-date information.

- **Authentication**: Secure login system using Firebase Auth to protect user data and ensure privacy.

- **Social Feed**: A specialized feed where childcare providers can post updates and parents can stay informed about their child's day, fostering a connected community.

## Tech stack

- React
- Typescript
- Firebase Auth
- Firebase Firestore
- Firebase Storage
- Tanstack Table
- ZOD
- React Hook Forms
- SASS

## Installation

1.  clone the repo
2.  run `npm install`
3.  configure a new project in firebase
4.  replace the `.env.example` file with an `.env` file with the relevant informaiton from the firebase config.
5.  Manually create a teachers email and password in firebase Auth.
6.  You will need to create the `teachers` collection, ensure that you use the `User UID` for the `documentID`. You will need the following information in this exact structure:

```
{
  _id: UUID,
  contact: {
    email: string, // authemail
    firstName: string,
    lastName: string,
  }
}
```

7. run `npm dev` to run a developement server
8. You can now create new users, and with the teacher's log in can approve the new users.
